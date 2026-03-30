# 📋 Próximos Passos - Guia de Implementação

## ✅ O que já foi criado

### Estrutura Completa do Projeto
- [x] Pastas e organização do código (frontend, backend, shared)
- [x] Schema SQL completo para Supabase (20+ tabelas)
- [x] Configuração TypeScript (frontend e backend)
- [x] Tailwind CSS com tema futurista personalizado
- [x] Vite configurado com aliases e otimizações
- [x] Railway e GitHub configurados

### Frontend
- [x] Contextos (Auth, Theme)
- [x] Serviços (Supabase, API)
- [x] Tipos compartilhados
- [x] Layouts (Admin, Public)
- [x] Página de Login com design futurista
- [x] Dashboard com cards e métricas
- [x] Páginas stub para todas as rotas
- [x] Estilos globais com glassmorphism

### Backend
- [x] Servidor Express configurado
- [x] Rotas stub para todos os módulos
- [x] Middleware de segurança (Helmet, CORS, Rate Limit)
- [x] Configuração de ambiente

---

## 🔧 PASSO 1: Configurar Supabase (Obrigatório)

### 1.1 Criar Projeto
1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha:
   - Name: `helpdesk-prefeitura`
   - Database Password: (guarde bem!)
   - Region: Escolha a mais próxima (us-east-1 recomendado)

### 1.2 Executar Schema SQL
1. No dashboard do projeto, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie TODO o conteúdo de `backend/src/database/schema.sql`
4. Cole no editor e clique em **Run**

### 1.3 Obter Credenciais
1. Vá em **Settings** (engrenagem na lateral)
2. Clique em **API**
3. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (backend)

### 1.4 Configurar Auth (Opcional mas recomendado)
1. Vá em **Authentication** > **Providers**
2. Enable **Email** provider
3. Em **Email Auth**, desabilite "Confirm email" para desenvolvimento

---

## 🔧 PASSO 2: Configurar Variáveis de Ambiente

### Frontend (.env)
Edite `frontend/.env`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... (sua chave)
VITE_API_URL=http://localhost:3333/api/v1
```

### Backend (.env)
Crie `backend/.env`:
```env
PORT=3333
NODE_ENV=development

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc... (mesma do frontend)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (chave service_role)

JWT_SECRET=meu_segredo_super_secreto_123
JWT_EXPIRES_IN=24h

FRONTEND_URL=http://localhost:5173
```

---

## 🔧 PASSO 3: Instalar Dependências

```bash
# No diretório raiz do projeto

# Backend
cd backend
npm install

# Frontend (outro terminal)
cd frontend
npm install
```

---

## 🔧 PASSO 4: Rodar em Desenvolvimento

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Acesse: **http://localhost:5173**

---

## 🔧 PASSO 5: Criar Primeiro Usuário (Super Admin)

Como o sistema ainda não tem UI de cadastro, crie manualmente no Supabase:

### 5.1 Criar usuário no Auth
1. No Supabase, vá em **Authentication** > **Users**
2. Clique em **Add User**
3. Preencha:
   - Email: `admin@prefeitura.gov.br`
   - Password: `admin123`
   - Auto Confirm User: **Marcado**

### 5.2 Criar perfil no banco
Execute no SQL Editor:
```sql
-- Substitua o UUID pelo ID do usuário criado (veja em Authentication > Users)
INSERT INTO profiles (id, organization_id, full_name, email, role, is_active)
VALUES (
  'UUID_DO_USUARIO_CRIADO',  -- Copie de Authentication > Users > User ID
  NULL,  -- Será preenchido depois
  'Administrador do Sistema',
  'admin@prefeitura.gov.br',
  'super_admin',
  true
);
```

---

## 📊 Módulo de Parâmetros (Próxima Implementação)

O que será implementado:

### Status de Chamados
- Criar, editar, excluir status
- Definir cores e ícones
- Ordenação personalizada
- Ativar/desativar por organização

### Prioridades
- Definir nomes (Baixa, Média, Alta, Crítica)
- Configurar SLA em horas
- Cores e ícones personalizados

### Categorias
- Hierarquia de categorias
- Ícones e cores
- Ativação por tipo de unidade

---

## 🚀 Deploy no Railway

### Backend
1. Instale a CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. No diretório `backend`: `railway init`
4. Adicione variáveis de ambiente: `railway variables set SUPABASE_URL=...`
5. Deploy: `railway up`

### Frontend
1. No diretório `frontend`: `railway init`
2. Adicione variáveis: `railway variables set VITE_SUPABASE_URL=...`
3. Deploy: `railway up`

---

## 📝 Tarefas Pendentes

### Backend (Implementar controllers)
- [ ] Auth controller (login, register, logout)
- [ ] Organizations controller
- [ ] Units controller
- [ ] Users controller
- [ ] Tickets controller
- [ ] Parameters controller
- [ ] Audit controller
- [ ] Dashboard controller

### Frontend (Implementar páginas)
- [ ] Lista de chamados com filtros
- [ ] Detalhe do chamado
- [ ] CRUD de unidades
- [ ] CRUD de usuários
- [ ] CRUD de parâmetros
- [ ] Gerador de formulários
- [ ] Painel de auditoria
- [ ] Gráficos do dashboard

### Funcionalidades Avançadas
- [ ] Upload de arquivos (Storage do Supabase)
- [ ] Websockets para tempo real
- [ ] Notificações push
- [ ] Exportação de relatórios (PDF, Excel)
- [ ] Dashboard com gráficos Recharts

---

## 🎯 Prioridade Atual

1. **Auth** - Permitir login real
2. **Parameters** - CRUD de status/prioridades/categorias
3. **Tickets** - Criar e listar chamados
4. **Dashboard** - Métricas reais do banco

---

**Dúvidas? Consulte o README.md ou o schema.sql para referência!**
