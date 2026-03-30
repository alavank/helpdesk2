// ============================================================
// TIPOS DO BANCO DE DADOS SUPABASE
// Gerado automaticamente - atualize conforme o schema
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          cnpj: string | null;
          logo_url: string | null;
          theme_config: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          cnpj?: string | null;
          logo_url?: string | null;
          theme_config?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          cnpj?: string | null;
          logo_url?: string | null;
          theme_config?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      units: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          type: string;
          address: string | null;
          phone: string | null;
          email: string | null;
          manager_name: string | null;
          is_active: boolean;
          form_config: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          type: string;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          manager_name?: string | null;
          is_active?: boolean;
          form_config?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          type?: string;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          manager_name?: string | null;
          is_active?: boolean;
          form_config?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          organization_id: string | null;
          unit_id: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          whatsapp: string | null;
          role: string;
          specialty: string | null;
          avatar_url: string | null;
          is_active: boolean;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          organization_id?: string | null;
          unit_id?: string | null;
          full_name: string;
          email: string;
          phone?: string | null;
          whatsapp?: string | null;
          role: string;
          specialty?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string | null;
          unit_id?: string | null;
          full_name?: string;
          email?: string;
          phone?: string | null;
          whatsapp?: string | null;
          role?: string;
          specialty?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ticket_statuses: {
        Row: {
          id: string;
          organization_id: string | null;
          name: string;
          slug: string;
          color: string;
          icon: string | null;
          is_default: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id?: string | null;
          name: string;
          slug: string;
          color?: string;
          icon?: string | null;
          is_default?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string | null;
          name?: string;
          slug?: string;
          color?: string;
          icon?: string | null;
          is_default?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      ticket_priorities: {
        Row: {
          id: string;
          organization_id: string | null;
          name: string;
          slug: string;
          color: string;
          icon: string | null;
          sla_hours: number | null;
          is_default: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id?: string | null;
          name: string;
          slug: string;
          color?: string;
          icon?: string | null;
          sla_hours?: number | null;
          is_default?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string | null;
          name?: string;
          slug?: string;
          color?: string;
          icon?: string | null;
          sla_hours?: number | null;
          is_default?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      ticket_categories: {
        Row: {
          id: string;
          organization_id: string | null;
          name: string;
          slug: string;
          parent_id: string | null;
          icon: string | null;
          color: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id?: string | null;
          name: string;
          slug: string;
          parent_id?: string | null;
          icon?: string | null;
          color?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string | null;
          name?: string;
          slug?: string;
          parent_id?: string | null;
          icon?: string | null;
          color?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          ticket_number: string;
          organization_id: string;
          unit_id: string;
          category_id: string | null;
          status_id: string;
          priority_id: string;
          requester_id: string | null;
          requester_name: string;
          requester_contact: string | null;
          requester_type: string;
          assigned_to: string | null;
          assigned_at: string | null;
          assigned_by: string | null;
          title: string;
          description: string;
          resolution: string | null;
          access_code: string;
          is_viewed: boolean;
          viewed_at: string | null;
          viewed_by: string | null;
          created_at: string;
          updated_at: string;
          resolved_at: string | null;
          sla_deadline: string | null;
          metadata: Json;
        };
        Insert: {
          id?: string;
          ticket_number?: string;
          organization_id: string;
          unit_id: string;
          category_id?: string | null;
          status_id: string;
          priority_id: string;
          requester_id?: string | null;
          requester_name: string;
          requester_contact?: string | null;
          requester_type?: string;
          assigned_to?: string | null;
          assigned_at?: string | null;
          assigned_by?: string | null;
          title: string;
          description: string;
          resolution?: string | null;
          access_code?: string;
          is_viewed?: boolean;
          viewed_at?: string | null;
          viewed_by?: string | null;
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
          sla_deadline?: string | null;
          metadata?: Json;
        };
        Update: {
          id?: string;
          ticket_number?: string;
          organization_id?: string;
          unit_id?: string;
          category_id?: string | null;
          status_id?: string;
          priority_id?: string;
          requester_id?: string | null;
          requester_name?: string;
          requester_contact?: string | null;
          requester_type?: string;
          assigned_to?: string | null;
          assigned_at?: string | null;
          assigned_by?: string | null;
          title?: string;
          description?: string;
          resolution?: string | null;
          access_code?: string;
          is_viewed?: boolean;
          viewed_at?: string | null;
          viewed_by?: string | null;
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
          sla_deadline?: string | null;
          metadata?: Json;
        };
      };
      attachments: {
        Row: {
          id: string;
          ticket_id: string;
          uploaded_by: string | null;
          file_name: string;
          file_url: string;
          file_type: string | null;
          file_size: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ticket_id: string;
          uploaded_by?: string | null;
          file_name: string;
          file_url: string;
          file_type?: string | null;
          file_size?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          ticket_id?: string;
          uploaded_by?: string | null;
          file_name?: string;
          file_url?: string;
          file_type?: string | null;
          file_size?: number | null;
          created_at?: string;
        };
      };
      ticket_messages: {
        Row: {
          id: string;
          ticket_id: string;
          sender_id: string;
          message: string;
          is_internal: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          ticket_id: string;
          sender_id: string;
          message: string;
          is_internal?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          ticket_id?: string;
          sender_id?: string;
          message?: string;
          is_internal?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      dynamic_forms: {
        Row: {
          id: string;
          unit_id: string;
          name: string;
          description: string | null;
          is_active: boolean;
          fields_config: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          unit_id: string;
          name: string;
          description?: string | null;
          is_active?: boolean;
          fields_config?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          unit_id?: string;
          name?: string;
          description?: string | null;
          is_active?: boolean;
          fields_config?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      form_submissions: {
        Row: {
          id: string;
          form_id: string;
          unit_id: string;
          ticket_id: string | null;
          submitted_data: Json;
          submitted_at: string;
          ip_address: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          form_id: string;
          unit_id: string;
          ticket_id?: string | null;
          submitted_data: Json;
          submitted_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          form_id?: string;
          unit_id?: string;
          ticket_id?: string | null;
          submitted_data?: Json;
          submitted_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          old_values: Json | null;
          new_values: Json | null;
          description: string;
          ip_address: string | null;
          user_agent: string | null;
          device_info: Json | null;
          location_info: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          description: string;
          ip_address?: string | null;
          user_agent?: string | null;
          device_info?: Json | null;
          location_info?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          description?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          device_info?: Json | null;
          location_info?: Json | null;
          created_at?: string;
        };
      };
      active_sessions: {
        Row: {
          id: string;
          user_id: string;
          session_token: string;
          ip_address: string | null;
          user_agent: string | null;
          device_info: Json | null;
          last_activity: string;
          created_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_token: string;
          ip_address?: string | null;
          user_agent?: string | null;
          device_info?: Json | null;
          last_activity?: string;
          created_at?: string;
          expires_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_token?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          device_info?: Json | null;
          last_activity?: string;
          created_at?: string;
          expires_at?: string;
        };
      };
      unit_permissions: {
        Row: {
          id: string;
          unit_id: string;
          role: string;
          allowed_statuses: string[];
          allowed_priorities: string[];
          can_create_tickets: boolean;
          can_view_all_tickets: boolean;
          can_assign_tickets: boolean;
          can_delete_tickets: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          unit_id: string;
          role: string;
          allowed_statuses?: string[];
          allowed_priorities?: string[];
          can_create_tickets?: boolean;
          can_view_all_tickets?: boolean;
          can_assign_tickets?: boolean;
          can_delete_tickets?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          unit_id?: string;
          role?: string;
          allowed_statuses?: string[];
          allowed_priorities?: string[];
          can_create_tickets?: boolean;
          can_view_all_tickets?: boolean;
          can_assign_tickets?: boolean;
          can_delete_tickets?: boolean;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          related_entity_type: string | null;
          related_entity_id: string | null;
          is_read: boolean;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: string;
          related_entity_type?: string | null;
          related_entity_id?: string | null;
          is_read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          related_entity_type?: string | null;
          related_entity_id?: string | null;
          is_read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      dashboard_metrics: {
        Row: {
          organization_id: string;
          organization_name: string;
          total_tickets: number;
          open_tickets: number;
          in_progress_tickets: number;
          resolved_tickets: number;
          total_units: number;
          total_users: number;
        };
      };
    };
    Functions: {
      register_login: {
        Args: {
          p_user_id: string;
          p_ip_address: string;
          p_user_agent: string;
          p_device_info: Json;
          p_location_info: Json;
        };
        Returns: string;
      };
      get_active_sessions_with_details: {
        Args: Record<string, never>;
        Returns: {
          user_id: string;
          full_name: string;
          email: string;
          role: string;
          ip_address: string;
          device_info: Json;
          last_activity: string;
          session_duration: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
