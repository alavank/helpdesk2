import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layouts
import { AdminLayout } from './components/layout/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Páginas Públicas
import { LoginPage } from './pages/auth/LoginPage';
import { RecoverPasswordPage } from './pages/auth/RecoverPasswordPage';
import { PublicFormPage } from './pages/public/PublicFormPage';
import { TrackTicketPage } from './pages/public/TrackTicketPage';

// Páginas Admin
import { DashboardPage } from './pages/admin/DashboardPage';
import { TicketsPage } from './pages/admin/TicketsPage';
import { TicketDetailPage } from './pages/admin/TicketDetailPage';
import { UnitsPage } from './pages/admin/UnitsPage';
import { UsersPage } from './pages/admin/UsersPage';
import { ParametersPage } from './pages/admin/ParametersPage';
import { FormsPage } from './pages/admin/FormsPage';
import { AuditPage } from './pages/admin/AuditPage';
import { SettingsPage } from './pages/admin/SettingsPage';

// Componente de Proteção de Rotas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = true; // TODO: Implementar verificação real
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/recuperar-senha" element={<RecoverPasswordPage />} />
              <Route path="/formulario/:unitId" element={<PublicFormPage />} />
              <Route path="/acompanhar/:accessCode" element={<TrackTicketPage />} />
            </Route>

            {/* Rotas Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="chamados" element={<TicketsPage />} />
              <Route path="chamados/:id" element={<TicketDetailPage />} />
              <Route path="unidades" element={<UnitsPage />} />
              <Route path="usuarios" element={<UsersPage />} />
              <Route path="parametros" element={<ParametersPage />} />
              <Route path="formularios" element={<FormsPage />} />
              <Route path="auditoria" element={<AuditPage />} />
              <Route path="configuracoes" element={<SettingsPage />} />
            </Route>

            {/* Redirecionamento padrão */}
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                backdropFilter: 'blur(8px)',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
