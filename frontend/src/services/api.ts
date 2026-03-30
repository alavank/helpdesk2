import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from '@shared/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api/v1';

// Criar instância do axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('@helpdesk:token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse>) => {
    if (error.response?.status === 401) {
      // Token expirado - fazer logout
      localStorage.removeItem('@helpdesk:token');
      localStorage.removeItem('@helpdesk:user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================================
// SERVIÇOS DE API
// ============================================================

export const apiService = {
  // Autenticação
  auth: {
    login: (email: string, password: string) => 
      api.post<ApiResponse<{ user: any; session: any }>>('/auth/login', { email, password }),
    register: (data: any) => 
      api.post<ApiResponse>('/auth/register', data),
    recoverPassword: (email: string) => 
      api.post<ApiResponse>('/auth/recover-password', { email }),
    logout: () => 
      api.post<ApiResponse>('/auth/logout'),
    getCurrentUser: () => 
      api.get<ApiResponse<{ user: any }>>('/auth/me'),
    refreshToken: () => 
      api.post<ApiResponse<{ session: any }>>('/auth/refresh'),
  },

  // Organizações
  organizations: {
    getAll: () => 
      api.get<ApiResponse<any[]>>('/organizations'),
    getById: (id: string) => 
      api.get<ApiResponse<any>>(`/organizations/${id}`),
    create: (data: any) => 
      api.post<ApiResponse>('/organizations', data),
    update: (id: string, data: any) => 
      api.put<ApiResponse>(`/organizations/${id}`, data),
    delete: (id: string) => 
      api.delete<ApiResponse>(`/organizations/${id}`),
  },

  // Unidades
  units: {
    getAll: (organizationId?: string) => 
      api.get<ApiResponse<any[]>>('/units', { params: { organization_id: organizationId } }),
    getById: (id: string) => 
      api.get<ApiResponse<any>>(`/units/${id}`),
    create: (data: any) => 
      api.post<ApiResponse>('/units', data),
    update: (id: string, data: any) => 
      api.put<ApiResponse>(`/units/${id}`, data),
    delete: (id: string) => 
      api.delete<ApiResponse>(`/units/${id}`),
    getForm: (unitId: string) => 
      api.get<ApiResponse<any>>(`/units/${unitId}/form`),
    submitForm: (unitId: string, data: any) => 
      api.post<ApiResponse>(`/units/${unitId}/form/submit`, data),
  },

  // Usuários/Perfis
  users: {
    getAll: (params?: any) => 
      api.get<ApiResponse<any[]>>('/users', { params }),
    getById: (id: string) => 
      api.get<ApiResponse<any>>(`/users/${id}`),
    create: (data: any) => 
      api.post<ApiResponse>('/users', data),
    update: (id: string, data: any) => 
      api.put<ApiResponse>(`/users/${id}`, data),
    delete: (id: string) => 
      api.delete<ApiResponse>(`/users/${id}`),
    getByUnit: (unitId: string) => 
      api.get<ApiResponse<any[]>>(`/users/by-unit/${unitId}`),
  },

  // Chamados
  tickets: {
    getAll: (params?: any) => 
      api.get<ApiResponse<any[]>>('/tickets', { params }),
    getById: (id: string) => 
      api.get<ApiResponse<any>>(`/tickets/${id}`),
    getByNumber: (number: string) => 
      api.get<ApiResponse<any>>(`/tickets/number/${number}`),
    getByAccessCode: (code: string) => 
      api.get<ApiResponse<any>>(`/tickets/access-code/${code}`),
    create: (data: any) => 
      api.post<ApiResponse>('/tickets', data),
    update: (id: string, data: any) => 
      api.put<ApiResponse>(`/tickets/${id}`, data),
    delete: (id: string) => 
      api.delete<ApiResponse>(`/tickets/${id}`),
    assign: (id: string, technicianId: string) => 
      api.patch<ApiResponse>(`/tickets/${id}/assign`, { technician_id: technicianId }),
    updateStatus: (id: string, statusId: string) => 
      api.patch<ApiResponse>(`/tickets/${id}/status`, { status_id: statusId }),
    addMessage: (id: string, message: string, isInternal?: boolean) => 
      api.post<ApiResponse>(`/tickets/${id}/messages`, { message, is_internal: isInternal }),
    uploadAttachment: (id: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post<ApiResponse>(`/tickets/${id}/attachments`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
    markAsViewed: (id: string) => 
      api.patch<ApiResponse>(`/tickets/${id}/view`),
    resolve: (id: string, resolution: string) => 
      api.patch<ApiResponse>(`/tickets/${id}/resolve`, { resolution }),
  },

  // Parâmetros
  parameters: {
    getStatuses: () => 
      api.get<ApiResponse<any[]>>('/parameters/statuses'),
    createStatus: (data: any) => 
      api.post<ApiResponse>('/parameters/statuses', data),
    updateStatus: (id: string, data: any) => 
      api.put<ApiResponse>(`/parameters/statuses/${id}`, data),
    deleteStatus: (id: string) => 
      api.delete<ApiResponse>(`/parameters/statuses/${id}`),
    
    getPriorities: () => 
      api.get<ApiResponse<any[]>>('/parameters/priorities'),
    createPriority: (data: any) => 
      api.post<ApiResponse>('/parameters/priorities', data),
    updatePriority: (id: string, data: any) => 
      api.put<ApiResponse>(`/parameters/priorities/${id}`, data),
    deletePriority: (id: string) => 
      api.delete<ApiResponse>(`/parameters/priorities/${id}`),
    
    getCategories: () => 
      api.get<ApiResponse<any[]>>('/parameters/categories'),
    createCategory: (data: any) => 
      api.post<ApiResponse>('/parameters/categories', data),
    updateCategory: (id: string, data: any) => 
      api.put<ApiResponse>(`/parameters/categories/${id}`, data),
    deleteCategory: (id: string) => 
      api.delete<ApiResponse>(`/parameters/categories/${id}`),
  },

  // Formulários Dinâmicos
  forms: {
    getByUnit: (unitId: string) => 
      api.get<ApiResponse<any[]>>(`/forms/unit/${unitId}`),
    getById: (id: string) => 
      api.get<ApiResponse<any>>(`/forms/${id}`),
    create: (data: any) => 
      api.post<ApiResponse>('/forms', data),
    update: (id: string, data: any) => 
      api.put<ApiResponse>(`/forms/${id}`, data),
    delete: (id: string) => 
      api.delete<ApiResponse>(`/forms/${id}`),
    getSubmissions: (formId: string) => 
      api.get<ApiResponse<any[]>>(`/forms/${formId}/submissions`),
  },

  // Auditoria
  audit: {
    getAll: (params?: any) => 
      api.get<ApiResponse<any[]>>('/audit', { params }),
    getById: (id: string) => 
      api.get<ApiResponse<any>>(`/audit/${id}`),
    getByUser: (userId: string, params?: any) => 
      api.get<ApiResponse<any[]>>(`/audit/user/${userId}`, { params }),
    getByEntity: (entityType: string, entityId: string) => 
      api.get<ApiResponse<any[]>>(`/audit/${entityType}/${entityId}`),
    getActiveSessions: () => 
      api.get<ApiResponse<any[]>>('/audit/sessions'),
  },

  // Dashboard
  dashboard: {
    getMetrics: () => 
      api.get<ApiResponse<any>>('/dashboard/metrics'),
    getTicketMetrics: (params?: any) => 
      api.get<ApiResponse<any>>('/dashboard/tickets', { params }),
    getCharts: (params?: any) => 
      api.get<ApiResponse<any>>('/dashboard/charts', { params }),
  },

  // Notificações
  notifications: {
    getAll: () => 
      api.get<ApiResponse<any[]>>('/notifications'),
    getUnread: () => 
      api.get<ApiResponse<any[]>>('/notifications/unread'),
    markAsRead: (id: string) => 
      api.patch<ApiResponse>(`/notifications/${id}/read`),
    markAllAsRead: () => 
      api.patch<ApiResponse>('/notifications/read-all'),
    delete: (id: string) => 
      api.delete<ApiResponse>(`/notifications/${id}`),
  },
};

export default api;
