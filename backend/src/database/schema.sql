-- ============================================================
-- SISTEMA DE HELPDESKE - PREFEITURA
-- Schema Completo para Supabase (PostgreSQL)
-- ============================================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. TABELA DE ORGANIZAÇÕES (Prefeituras)
-- ============================================================
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18),
    logo_url TEXT,
    theme_config JSONB DEFAULT '{"primaryColor": "#6366f1", "secondaryColor": "#8b5cf6"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 2. TABELA DE UNIDADES (Secretarias, Escolas, Postos, etc.)
-- ============================================================
CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'secretaria', 'escola', 'posto_saude', 'setor', 'outro'
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    manager_name VARCHAR(255), -- Nome do responsável
    is_active BOOLEAN DEFAULT true,
    form_config JSONB DEFAULT '{"enabled": true, "customFields": []}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 3. TABELA DE USUÁRIOS (Perfis do Supabase + Dados extras)
-- ============================================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id),
    unit_id UUID REFERENCES units(id),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    whatsapp VARCHAR(20),
    role VARCHAR(50) NOT NULL, -- 'super_admin', 'admin', 'coordenador', 'tecnico', 'solicitante'
    specialty VARCHAR(100), -- Para técnicos (ex: 'elétrica', 'pintura', 'TI')
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 4. TABELA DE PARÂMETROS - STATUS
-- ============================================================
CREATE TABLE ticket_statuses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#6b7280', -- Cor em HEX
    icon VARCHAR(50),
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 5. TABELA DE PARÂMETROS - PRIORIDADES
-- ============================================================
CREATE TABLE ticket_priorities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#6b7280',
    icon VARCHAR(50),
    sla_hours INTEGER, -- Tempo máximo de atendimento em horas
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 6. TABELA DE CATEGORIAS DE CHAMADOS
-- ============================================================
CREATE TABLE ticket_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) NOT NULL,
    parent_id UUID REFERENCES ticket_categories(id) ON DELETE CASCADE,
    icon VARCHAR(50),
    color VARCHAR(7),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 7. TABELA DE CHAMADOS (TICKETS)
-- ============================================================
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number VARCHAR(20) NOT NULL UNIQUE, -- Ex: CHM-2024-00001
    organization_id UUID NOT NULL REFERENCES organizations(id),
    unit_id UUID NOT NULL REFERENCES units(id),
    category_id UUID REFERENCES ticket_categories(id),
    status_id UUID NOT NULL REFERENCES ticket_statuses(id),
    priority_id UUID NOT NULL REFERENCES ticket_priorities(id),
    
    -- Solicitante
    requester_id UUID REFERENCES profiles(id),
    requester_name VARCHAR(255) NOT NULL,
    requester_contact VARCHAR(100),
    requester_type VARCHAR(20) DEFAULT 'internal', -- 'internal', 'external', 'anonymous'
    
    -- Atribuição
    assigned_to UUID REFERENCES profiles(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    assigned_by UUID REFERENCES profiles(id),
    
    -- Conteúdo
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    resolution TEXT,
    
    -- Controle
    access_code VARCHAR(8) NOT NULL UNIQUE, -- Para acompanhamento sem login
    is_viewed BOOLEAN DEFAULT false,
    viewed_at TIMESTAMP WITH TIME ZONE,
    viewed_by UUID REFERENCES profiles(id),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    sla_deadline TIMESTAMP WITH TIME ZONE,
    
    -- Metadados
    metadata JSONB DEFAULT '{}'
);

-- ============================================================
-- 8. TABELA DE ANEXOS (FOTOS, DOCUMENTOS)
-- ============================================================
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES profiles(id),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 9. TABELA DE MENSAGENS/COMENTÁRIOS DO CHAMADO
-- ============================================================
CREATE TABLE ticket_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id),
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false, -- Mensagem interna (não visível ao solicitante)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 10. TABELA DE FORMULÁRIOS DINÂMICOS
-- ============================================================
CREATE TABLE dynamic_forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    fields_config JSONB NOT NULL DEFAULT '[]', -- Configuração dos campos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 11. TABELA DE SUBMISSÕES DE FORMULÁRIOS
-- ============================================================
CREATE TABLE form_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_id UUID NOT NULL REFERENCES dynamic_forms(id) ON DELETE CASCADE,
    unit_id UUID NOT NULL REFERENCES units(id),
    ticket_id UUID REFERENCES tickets(id),
    submitted_data JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- ============================================================
-- 12. TABELA DE AUDITORIA (LOGS DO SISTEMA)
-- ============================================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    action VARCHAR(100) NOT NULL, -- 'login', 'logout', 'create', 'update', 'delete', 'view'
    entity_type VARCHAR(50) NOT NULL, -- 'ticket', 'user', 'unit', 'status', etc.
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    description TEXT NOT NULL, -- Descrição legível para humanos
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_info JSONB, -- {browser: 'Chrome', os: 'Windows', device: 'Desktop'}
    location_info JSONB, -- {city: 'São Paulo', region: 'SP', country: 'BR'}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 13. TABELA DE SESSÕES ATIVAS (MONITORAMENTO EM TEMPO REAL)
-- ============================================================
CREATE TABLE active_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_info JSONB,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================
-- 14. TABELA DE PERMISSÕES POR UNIDADE/SETOR
-- ============================================================
CREATE TABLE unit_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    allowed_statuses UUID[] DEFAULT '{}', -- Status permitidos para esta unidade
    allowed_priorities UUID[] DEFAULT '{}',
    can_create_tickets BOOLEAN DEFAULT true,
    can_view_all_tickets BOOLEAN DEFAULT false,
    can_assign_tickets BOOLEAN DEFAULT false,
    can_delete_tickets BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 15. TABELA DE NOTIFICAÇÕES
-- ============================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- 'info', 'warning', 'error', 'success'
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================================
CREATE INDEX idx_tickets_organization ON tickets(organization_id);
CREATE INDEX idx_tickets_unit ON tickets(unit_id);
CREATE INDEX idx_tickets_status ON tickets(status_id);
CREATE INDEX idx_tickets_priority ON tickets(priority_id);
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_tickets_requester ON tickets(requester_id);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_tickets_number ON tickets(ticket_number);
CREATE INDEX idx_tickets_access_code ON tickets(access_code);

CREATE INDEX idx_profiles_organization ON profiles(organization_id);
CREATE INDEX idx_profiles_unit ON profiles(unit_id);
CREATE INDEX idx_profiles_role ON profiles(role);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

CREATE INDEX idx_units_organization ON units(organization_id);
CREATE INDEX idx_units_type ON units(type);

CREATE INDEX idx_ticket_messages_ticket ON ticket_messages(ticket_id);
CREATE INDEX idx_ticket_messages_created ON ticket_messages(created_at);

CREATE INDEX idx_attachments_ticket ON attachments(ticket_id);

CREATE INDEX idx_active_sessions_user ON active_sessions(user_id);
CREATE INDEX idx_active_sessions_expires ON active_sessions(expires_at);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- ============================================================
-- TRIGGERS PARA UPDATED_AT
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dynamic_forms_updated_at BEFORE UPDATE ON dynamic_forms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ticket_messages_updated_at BEFORE UPDATE ON ticket_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TRIGGER PARA AUDITORIA AUTOMÁTICA
-- ============================================================
CREATE OR REPLACE FUNCTION log_ticket_changes()
RETURNS TRIGGER AS $$
DECLARE
    v_description TEXT;
    v_user_id UUID;
BEGIN
    -- Determinar o usuário atual (deve ser passado via contexto)
    v_user_id := COALESCE(
        NULLIF(current_setting('app.current_user_id', true), '')::UUID,
        '00000000-0000-0000-0000-000000000000'::UUID
    );

    IF TG_OP = 'INSERT' THEN
        v_description := 'Chamado ' || NEW.ticket_number || ' criado por ' || NEW.requester_name;
        INSERT INTO audit_logs (user_id, action, entity_type, entity_id, description, new_values)
        VALUES (v_user_id, 'create', 'ticket', NEW.id, v_description, row_to_json(NEW));
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status_id IS DISTINCT FROM NEW.status_id THEN
            v_description := 'Status do chamado ' || NEW.ticket_number || ' alterado';
            INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, description)
            VALUES (v_user_id, 'update', 'ticket', NEW.id, row_to_json(OLD), row_to_json(NEW), v_description);
        END IF;
        IF OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
            v_description := 'Chamado ' || NEW.ticket_number || ' atribuído a novo técnico';
            INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, description)
            VALUES (v_user_id, 'update', 'ticket', NEW.id, row_to_json(OLD), row_to_json(NEW), v_description);
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER ticket_audit_trigger
    AFTER INSERT OR UPDATE ON tickets
    FOR EACH ROW EXECUTE FUNCTION log_ticket_changes();

-- ============================================================
-- FUNÇÃO PARA GERAR NÚMERO DO CHAMADO
-- ============================================================
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
DECLARE
    v_year INTEGER;
    v_sequence INTEGER;
    v_number VARCHAR(20);
BEGIN
    v_year := EXTRACT(YEAR FROM NEW.created_at);
    
    SELECT COUNT(*) + 1 INTO v_sequence
    FROM tickets
    WHERE EXTRACT(YEAR FROM created_at) = v_year;
    
    v_number := 'CHM-' || v_year || '-' || LPAD(v_sequence::TEXT, 5, '0');
    NEW.ticket_number := v_number;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_ticket_insert
    BEFORE INSERT ON tickets
    FOR EACH ROW EXECUTE FUNCTION generate_ticket_number();

-- ============================================================
-- FUNÇÃO PARA GERAR CÓDIGO DE ACESSO
-- ============================================================
CREATE OR REPLACE FUNCTION generate_access_code()
RETURNS TEXT AS $$
DECLARE
    v_code TEXT;
BEGIN
    v_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
    RETURN v_code;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- DADOS INICIAIS (SEED)
-- ============================================================

-- Status padrão
INSERT INTO ticket_statuses (id, name, slug, color, icon, is_default, sort_order) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Aberto', 'aberto', '#3b82f6', 'circle', true, 1),
    ('00000000-0000-0000-0000-000000000002', 'Em Andamento', 'em_andamento', '#eab308', 'clock', true, 2),
    ('00000000-0000-0000-0000-000000000003', 'Aguardando Terceiros', 'aguardando_terceiros', '#f97316', 'pause', true, 3),
    ('00000000-0000-0000-0000-000000000004', 'Concluído', 'concluido', '#22c55e', 'check-circle', true, 4),
    ('00000000-0000-0000-0000-000000000005', 'Cancelado', 'cancelado', '#ef4444', 'x-circle', true, 5);

-- Prioridades padrão
INSERT INTO ticket_priorities (id, name, slug, color, icon, sla_hours, is_default, sort_order) VALUES
    ('00000000-0000-0000-0000-000000000011', 'Baixa', 'baixa', '#6b7280', 'arrow-down', 72, true, 1),
    ('00000000-0000-0000-0000-000000000012', 'Média', 'media', '#3b82f6', 'minus', 48, true, 2),
    ('00000000-0000-0000-0000-000000000013', 'Alta', 'alta', '#f59e0b', 'arrow-up', 24, true, 3),
    ('00000000-0000-0000-0000-000000000014', 'Crítica', 'critica', '#ef4444', 'alert-triangle', 4, true, 4);

-- Categorias padrão
INSERT INTO ticket_categories (id, name, slug, icon, color, is_active, sort_order) VALUES
    ('00000000-0000-0000-0000-000000000021', 'Tecnologia', 'tecnologia', 'monitor', '#6366f1', true, 1),
    ('00000000-0000-0000-0000-000000000022', 'Elétrica', 'eletrica', 'zap', '#fbbf24', true, 2),
    ('00000000-0000-0000-0000-000000000023', 'Hidráulica', 'hidraulica', 'droplet', '#3b82f6', true, 3),
    ('00000000-0000-0000-0000-000000000024', 'Pintura', 'pintura', 'palette', '#ec4899', true, 4),
    ('00000000-0000-0000-0000-000000000025', 'Refrigeração', 'refrigeracao', 'snowflake', '#06b6d4', true, 5),
    ('00000000-0000-0000-0000-000000000026', 'Mobiliário', 'mobiliario', 'chair', '#8b5cf6', true, 6),
    ('00000000-0000-0000-0000-000000000027', 'Outros', 'outros', 'more-horizontal', '#6b7280', true, 7);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - SEGURANÇA DO SUPABASE
-- ============================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_priorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles (usuários podem ver seu próprio perfil)
CREATE POLICY "Usuários podem ver seu próprio perfil"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis da organização"
    ON profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = auth.uid()
            AND p.role IN ('super_admin', 'admin', 'coordenador')
            AND p.organization_id = profiles.organization_id
        )
    );

-- Políticas para tickets
CREATE POLICY "Usuários podem ver tickets de sua unidade"
    ON tickets FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = auth.uid()
            AND (p.unit_id = tickets.unit_id OR p.role IN ('super_admin', 'admin', 'coordenador'))
        )
    );

CREATE POLICY "Técnicos podem atualizar tickets atribuídos"
    ON tickets FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = auth.uid()
            AND (p.id = tickets.assigned_to OR p.role IN ('super_admin', 'admin', 'coordenador'))
        )
    );

-- ============================================================
-- FUNÇÕES DO SUPABASE (RPC)
-- ============================================================

-- Função para registrar login
CREATE OR REPLACE FUNCTION register_login(
    p_user_id UUID,
    p_ip_address TEXT,
    p_user_agent TEXT,
    p_device_info JSONB,
    p_location_info JSONB
)
RETURNS UUID AS $$
DECLARE
    v_session_id UUID;
BEGIN
    -- Criar sessão ativa
    INSERT INTO active_sessions (user_id, session_token, ip_address, user_agent, device_info, expires_at)
    VALUES (
        p_user_id,
        MD5(RANDOM()::TEXT || NOW()::TEXT),
        p_ip_address,
        p_user_agent,
        p_device_info,
        NOW() + INTERVAL '24 hours'
    )
    RETURNING id INTO v_session_id;

    -- Atualizar último login
    UPDATE profiles SET last_login = NOW() WHERE id = p_user_id;

    -- Registrar log de auditoria
    INSERT INTO audit_logs (user_id, action, entity_type, description, ip_address, user_agent, device_info, location_info)
    VALUES (
        p_user_id,
        'login',
        'user',
        'Usuário realizou login',
        p_ip_address,
        p_user_agent,
        p_device_info,
        p_location_info
    );

    RETURN v_session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter sessões ativas com detalhes
CREATE OR REPLACE FUNCTION get_active_sessions_with_details()
RETURNS TABLE (
    user_id UUID,
    full_name TEXT,
    email TEXT,
    role TEXT,
    ip_address TEXT,
    device_info JSONB,
    last_activity TIMESTAMP WITH TIME ZONE,
    session_duration INTERVAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.user_id,
        p.full_name::TEXT,
        p.email::TEXT,
        p.role::TEXT,
        s.ip_address,
        s.device_info,
        s.last_activity,
        (NOW() - s.created_at) AS session_duration
    FROM active_sessions s
    JOIN profiles p ON s.user_id = p.id
    WHERE s.expires_at > NOW()
    ORDER BY s.last_activity DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- VIEW PARA DASHBOARD
-- ============================================================
CREATE OR REPLACE VIEW dashboard_metrics AS
SELECT
    o.id AS organization_id,
    o.name AS organization_name,
    COUNT(DISTINCT t.id) AS total_tickets,
    COUNT(DISTINCT CASE WHEN t.status_id = '00000000-0000-0000-0000-000000000001' THEN t.id END) AS open_tickets,
    COUNT(DISTINCT CASE WHEN t.status_id = '00000000-0000-0000-0000-000000000002' THEN t.id END) AS in_progress_tickets,
    COUNT(DISTINCT CASE WHEN t.status_id = '00000000-0000-0000-0000-000000000004' THEN t.id END) AS resolved_tickets,
    COUNT(DISTINCT u.id) AS total_units,
    COUNT(DISTINCT p.id) AS total_users
FROM organizations o
LEFT JOIN tickets t ON o.id = t.organization_id
LEFT JOIN units u ON o.id = u.organization_id
LEFT JOIN profiles p ON o.id = p.organization_id
GROUP BY o.id, o.name;
