# 🏛️ Helpdesk Prefeitura

Sistema completo de gestão de chamados para prefeituras, com design futurista e funcionalidades avançadas de auditoria e parametrização.

**🚀 Monorepo**: Frontend + Backend em um único projeto Railway

## 🚀 Stack Tecnológica

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + TypeScript
- **Banco de Dados**: Supabase (PostgreSQL)
- **Infraestrutura**: Railway (1 projeto único)
- **Auth**: Supabase Auth

## 📁 Estrutura do Projeto

```
helpdesk-prefeitura/
├── package.json              # Root - scripts unificados
├── railway.json              # Config Railway (1 projeto)
├── nixpacks.toml             # Build config
│
├── backend/
│   ├── src/
│   │   ├── server.ts         # Express (serve frontend em prod)
│   │   ├── database/
│   │   │   └── schema.sql    # ⭐ SQL Supabase
│   │   └── routes/           # Rotas da API
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── components/
    │   ├── pages/
    │   └── ...
    └── package.json
```

## 🛠️ Configuração Inicial

### 1. Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. No SQL Editor, execute o arquivo `backend/src/database/schema.sql`
4. Copie as credenciais em Settings > API

### 2. Variáveis de Ambiente

**Root (.env)**:
```env
# Node
NODE_ENV=development

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# JWT
JWT_SECRET=meu_segredo_super_secreto
JWT_EXPIRES_IN=24h

# Frontend
FRONTEND_URL=http://localhost:5173
```

**Frontend (frontend/.env)**:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_API_URL=http://localhost:3333/api/v1
```

### 3. Instalação

```bash
# Instalar tudo de uma vez
npm run install:all

# Ou individualmente
cd backend && npm install
cd ../frontend && npm install
```

### 4. Rodar em Desenvolvimento

```bash
# Roda frontend e backend juntos
npm run dev
```

Acesse:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3333
- Health: http://localhost:3333/health

## 📊 Funcionalidades

### Módulo Super-Admin
- [x] Cadastro de Organização e Unidades
- [x] Gestão de Usuários com permissões granulares
- [x] Módulo de Parâmetros (Status, Prioridades, Categorias)

### Auditoria e Logs
- [x] Registro de login e acessos
- [x] Logs de todas as mutações de dados (CRUD)
- [x] Visualização amigável dos logs
- [ ] Monitoramento em tempo real de sessões ativas

### Formulários Dinâmicos
- [x] Estrutura para gerador de formulários
- [ ] Links únicos por unidade

### Gestão de Chamados
- [x] Estrutura de chamados
- [ ] Acompanhamento por código de acesso
- [ ] Sistema de mensagens interno

### Dashboard BI
- [x] Estrutura do dashboard
- [ ] Gráficos em tempo real

## 🎨 Design System

O sistema utiliza um design futurista com:
- **Glassmorphism**: Efeitos de vidro fosco
- **Cores**: Gradientes em roxo/azul profundo
- **Animações**: Transições fluidas com Framer Motion
- **Tipografia**: Inter (corpo) + Space Grotesk (títulos)

## 🚀 Deploy (GitHub + Railway)

### 1. GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/helpdesk-prefeitura.git
git push -u origin main
```

### 2. Railway
1. Acesse https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Selecione seu repositório
4. Configure as variáveis de ambiente
5. Deploy automático!

📖 **Guia completo**: Veja `DEPLOY_GITHUB_RAILWAY.md`

## 📝 Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run install:all` | Instala dependências de tudo |
| `npm run dev` | Roda frontend + backend juntos |
| `npm run build` | Build de produção de tudo |
| `npm run start` | Roda servidor em produção |

## 📄 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `backend/src/database/schema.sql` | ⭐ SQL completo para Supabase |
| `DEPLOY_GITHUB_RAILWAY.md` | Guia de deploy passo a passo |
| `PROXIMOS_PASSOS.md` | Próximas implementações |
| `railway.json` | Configuração do deploy |

## 🔐 Segurança

- Row Level Security (RLS) habilitado
- Autenticação via Supabase Auth
- JWT para sessões de API
- Rate limiting nas rotas
- Helmet para headers de segurança

## 📦 Principais Tabelas

- `organizations` - Prefeituras
- `units` - Secretarias, escolas, postos
- `profiles` - Usuários
- `tickets` - Chamados
- `ticket_statuses` - Status parametrizáveis
- `ticket_priorities` - Prioridades com SLA
- `audit_logs` - Logs de auditoria
- `active_sessions` - Sessões ativas

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ para Prefeituras Brasileiras**
