# 📊 Instruções para Executar o Schema no Supabase

## Passo a Passo

1. **Acesse o Supabase**
   - Vá para https://supabase.com
   - Faça login ou crie uma conta
   - Clique em "New Project"

2. **Crie o Projeto**
   - Name: `helpdesk-prefeitura`
   - Database Password: Escolha uma senha forte (guarde bem!)
   - Region: Escolha a mais próxima (us-east-1 recomendado)
   - Aguarde a criação (2-3 minutos)

3. **Execute o Schema SQL**
   - No dashboard do projeto, clique em **SQL Editor** no menu lateral
   - Clique em **New Query**
   - Copie TODO o conteúdo do arquivo `backend/src/database/schema.sql`
   - Cole no editor
   - Clique em **Run** ou pressione Ctrl+Enter

4. **Verifique as Tabelas**
   - Vá em **Table Editor** no menu lateral
   - Você deve ver todas as tabelas criadas:
     - organizations
     - units
     - profiles
     - ticket_statuses
     - ticket_priorities
     - ticket_categories
     - tickets
     - attachments
     - ticket_messages
     - dynamic_forms
     - form_submissions
     - audit_logs
     - active_sessions
     - unit_permissions
     - notifications

5. **Copie as Credenciais**
   - Vá em **Settings** (engrenagem) > **API**
   - Copie:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon/public key**: `eyJhbGc...` (chave longa)
     - **service_role key**: `eyJhbGc...` (chave ainda mais longa)

6. **Configure as Variáveis de Ambiente**

   **Frontend** (`frontend/.env`):
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   ```

   **Backend** (`backend/.env`):
   ```env
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```

7. **Crie o Primeiro Usuário (Opcional)**
   
   No **SQL Editor**, execute:
   ```sql
   -- Criar usuário de teste
   INSERT INTO auth.users (
     email, 
     encrypted_password, 
     email_confirmed_at,
     created_at,
     updated_at
   ) VALUES (
     'admin@prefeitura.gov.br',
     crypt('admin123', gen_salt('bf')),
     NOW(),
     NOW(),
     NOW()
   );
   ```
   
   Depois copie o ID gerado e crie o perfil:
   ```sql
   INSERT INTO profiles (id, full_name, email, role, is_active)
   VALUES (
     'COPIE_O_ID_DO_USUARIO_ACIMA',
     'Administrador do Sistema',
     'admin@prefeitura.gov.br',
     'super_admin',
     true
   );
   ```

## ✅ Pronto!

Agora você pode:
1. Rodar o backend: `cd backend && npm run dev`
2. Rodar o frontend: `cd frontend && npm run dev`
3. Acessar: http://localhost:5173

## 📝 Observações

- O schema já inclui dados iniciais (status, prioridades, categorias)
- Row Level Security (RLS) está habilitado em todas as tabelas
- Triggers de auditoria estão configurados
- A view `dashboard_metrics` já está pronta para uso

---

**Dúvidas? Consulte o README.md ou PROXIMOS_PASSOS.md**
