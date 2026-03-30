import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase, signOut } from '../services/supabase';
import { apiService } from '../services/api';
import type { Profile, AuthState } from '@shared/types';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@helpdesk:auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Carregar sessão inicial
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Tentar recuperar do Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Buscar perfil do usuário
          const { data: userData } = await apiService.auth.getCurrentUser();
          
          if (userData?.data) {
            setState({
              user: userData.data.user,
              session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                expires_in: session.expires_in,
                expires_at: session.expires_at ?? 0,
              },
              isLoading: false,
              isAuthenticated: true,
            });
            return;
          }
        }

        // Se não houver sessão, verificar storage local (fallback)
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.user && parsed.session) {
            setState({
              user: parsed.user,
              session: parsed.session,
              isLoading: false,
              isAuthenticated: true,
            });
            return;
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar auth:', error);
      } finally {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();

    // Listener para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
          const { data: userData } = await apiService.auth.getCurrentUser();
          if (userData?.data) {
            const authData = {
              user: userData.data.user,
              session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                expires_in: session.expires_in,
                expires_at: session.expires_at ?? 0,
              },
            };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
            setState({
              user: authData.user,
              session: authData.session,
              isLoading: false,
              isAuthenticated: true,
            });
          }
        }

        if (event === 'SIGNED_OUT') {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Login via Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Buscar perfil completo via API
      const { data: userData } = await apiService.auth.getCurrentUser();
      
      if (!userData?.data) {
        throw new Error('Erro ao obter dados do usuário');
      }

      const authData = {
        user: userData.data.user,
        session: {
          access_token: data.session!.access_token,
          refresh_token: data.session!.refresh_token,
          expires_in: data.session!.expires_in,
          expires_at: data.session!.expires_at ?? 0,
        },
      };

      // Salvar na storage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

      setState({
        user: authData.user,
        session: authData.session,
        isLoading: false,
        isAuthenticated: true,
      });

      toast.success(`Bem-vindo de volta, ${authData.user.full_name}!`);
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      toast.error(error.message || 'Erro ao fazer login');
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setState({
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false,
      });
      toast.success('Logout realizado com sucesso');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer logout');
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (data: Partial<Profile>) => {
    try {
      if (!state.user) throw new Error('Usuário não autenticado');

      const { data: updated } = await apiService.users.update(state.user.id, data);
      
      if (updated?.data) {
        const newState = {
          ...state,
          user: { ...state.user, ...updated.data },
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          user: newState.user,
          session: newState.session,
        }));
        setState(newState);
        toast.success('Perfil atualizado com sucesso');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil');
      throw error;
    }
  }, [state.user]);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
