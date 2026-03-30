// ============================================================
// TIPOS COMPARTILHADOS - FRONTEND E BACKEND
// ============================================================

// ============================================================
// ORGANIZAÇÕES E UNIDADES
// ============================================================
export interface Organization {
  id: string;
  name: string;
  cnpj?: string;
  logo_url?: string;
  theme_config: ThemeConfig;
  created_at: string;
  updated_at: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
}

export type UnitType = 'secretaria' | 'escola' | 'posto_saude' | 'setor' | 'outro';

export interface Unit {
  id: string;
  organization_id: string;
  name: string;
  type: UnitType;
  address?: string;
  phone?: string;
  email?: string;
  manager_name?: string;
  is_active: boolean;
  form_config: FormConfig;
  created_at: string;
  updated_at: string;
}

export interface FormConfig {
  enabled: boolean;
  customFields: CustomField[];
}

// ============================================================
// USUÁRIOS E PERFIS
// ============================================================
export type UserRole = 'super_admin' | 'admin' | 'coordenador' | 'tecnico' | 'solicitante';

export interface Profile {
  id: string;
  organization_id?: string;
  unit_id?: string;
  full_name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  role: UserRole;
  specialty?: string;
  avatar_url?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
  
  // Campos relacionados (populados via join)
  unit?: Unit;
  organization?: Organization;
}

// ============================================================
// PARÂMETROS DE CHAMADOS
// ============================================================
export interface TicketStatus {
  id: string;
  organization_id?: string;
  name: string;
  slug: string;
  color: string;
  icon?: string;
  is_default: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface TicketPriority {
  id: string;
  organization_id?: string;
  name: string;
  slug: string;
  color: string;
  icon?: string;
  sla_hours?: number;
  is_default: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface TicketCategory {
  id: string;
  organization_id?: string;
  name: string;
  slug: string;
  parent_id?: string;
  icon?: string;
  color?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  
  // Campo relacionado
  parent?: TicketCategory;
  children?: TicketCategory[];
}

// ============================================================
// CHAMADOS (TICKETS)
// ============================================================
export type RequesterType = 'internal' | 'external' | 'anonymous';

export interface Ticket {
  id: string;
  ticket_number: string;
  organization_id: string;
  unit_id: string;
  category_id?: string;
  status_id: string;
  priority_id: string;
  
  // Solicitante
  requester_id?: string;
  requester_name: string;
  requester_contact?: string;
  requester_type: RequesterType;
  
  // Atribuição
  assigned_to?: string;
  assigned_at?: string;
  assigned_by?: string;
  
  // Conteúdo
  title: string;
  description: string;
  resolution?: string;
  
  // Controle
  access_code: string;
  is_viewed: boolean;
  viewed_at?: string;
  viewed_by?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  sla_deadline?: string;
  
  // Metadados
  metadata: Record<string, any>;
  
  // Campos relacionados (populados via join)
  unit?: Unit;
  category?: TicketCategory;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignee?: Profile;
  requester?: Profile;
  attachments?: Attachment[];
  messages?: TicketMessage[];
}

export interface TicketFilters {
  status_id?: string;
  priority_id?: string;
  category_id?: string;
  unit_id?: string;
  assigned_to?: string;
  requester_id?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
}

// ============================================================
// ANEXOS E MENSAGENS
// ============================================================
export interface Attachment {
  id: string;
  ticket_id: string;
  uploaded_by?: string;
  file_name: string;
  file_url: string;
  file_type?: string;
  file_size?: number;
  created_at: string;
  
  // Campo relacionado
  uploader?: Profile;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  message: string;
  is_internal: boolean;
  created_at: string;
  updated_at: string;
  
  // Campo relacionado
  sender?: Profile;
}

// ============================================================
// FORMULÁRIOS DINÂMICOS
// ============================================================
export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'radio' | 'checkbox' | 'date' | 'file' | 'email' | 'phone';

export interface CustomField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  placeholder?: string;
  validation?: string;
}

export interface DynamicForm {
  id: string;
  unit_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  fields_config: CustomField[];
  created_at: string;
  updated_at: string;
  
  // Campo relacionado
  unit?: Unit;
}

export interface FormSubmission {
  id: string;
  form_id: string;
  unit_id: string;
  ticket_id?: string;
  submitted_data: Record<string, any>;
  submitted_at: string;
  ip_address?: string;
  user_agent?: string;
  
  // Campos relacionados
  form?: DynamicForm;
  ticket?: Ticket;
}

// ============================================================
// AUDITORIA
// ============================================================
export type AuditAction = 'login' | 'logout' | 'create' | 'update' | 'delete' | 'view';
export type AuditEntityType = 'ticket' | 'user' | 'unit' | 'status' | 'priority' | 'category' | 'form' | 'organization';

export interface DeviceInfo {
  browser: string;
  os: string;
  device: string;
}

export interface LocationInfo {
  city?: string;
  region?: string;
  country?: string;
  ip?: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: AuditAction;
  entity_type: AuditEntityType;
  entity_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  description: string;
  ip_address?: string;
  user_agent?: string;
  device_info?: DeviceInfo;
  location_info?: LocationInfo;
  created_at: string;
  
  // Campo relacionado
  user?: Profile;
}

// ============================================================
// SESSÕES ATIVAS
// ============================================================
export interface ActiveSession {
  id: string;
  user_id: string;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  device_info?: DeviceInfo;
  last_activity: string;
  created_at: string;
  expires_at: string;
  
  // Campos relacionados
  user?: Profile;
}

// ============================================================
// PERMISSÕES
// ============================================================
export interface UnitPermissions {
  id: string;
  unit_id: string;
  role: UserRole;
  allowed_statuses: string[];
  allowed_priorities: string[];
  can_create_tickets: boolean;
  can_view_all_tickets: boolean;
  can_assign_tickets: boolean;
  can_delete_tickets: boolean;
  created_at: string;
}

// ============================================================
// NOTIFICAÇÕES
// ============================================================
export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  related_entity_type?: string;
  related_entity_id?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

// ============================================================
// DASHBOARD E MÉTRICAS
// ============================================================
export interface DashboardMetrics {
  organization_id: string;
  organization_name: string;
  total_tickets: number;
  open_tickets: number;
  in_progress_tickets: number;
  resolved_tickets: number;
  total_units: number;
  total_users: number;
}

export interface TicketMetrics {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byCategory: Record<string, number>;
  byUnit: Record<string, number>;
  byTechnician: Record<string, number>;
  byPeriod: Record<string, number>;
  averageResolutionTime: number;
  slaCompliance: number;
}

// ============================================================
// AUTENTICAÇÃO
// ============================================================
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Profile;
  session: Session;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
}

export interface AuthState {
  user: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ============================================================
// RESPOSTAS DE API
// ============================================================
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ============================================================
// UTILITÁRIOS
// ============================================================
export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  color?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
