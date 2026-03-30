# 🚀 Deploy no GitHub e Railway - Guia Completo

## 📋 Visão Geral

Este é um **monorepo** com frontend e backend juntos. Você vai subir **1 único projeto no Railway** que contém ambos.

---

## 🔧 PASSO 1: GitHub

### 1.1 Inicializar Git (se ainda não fez)
```bash
cd c:\projetos\regulacao
git init
```

### 1.2 Criar repositório no GitHub
1. Acesse https://github.com/new
2. Nome: `helpdesk-prefeitura` (ou outro nome)
3. **NÃO** marque "Initialize this repository with a README"
4. Clique em "Create repository"

### 1.3 Adicionar remote e fazer push
```bash
# Adicionar remote (substitua SEU_USUARIO pelo seu usuário GitHub)
git remote add origin https://github.com/SEU_USUARIO/helpdesk-prefeitura.git

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Initial commit - Helpdesk Prefeitura"

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

---

## 🔧 PASSO 2: Railway

### 2.1 Criar conta no Railway
1. Acesse https://railway.app
2. Clique em "Start a new project"
3. Faça login com GitHub

### 2.2 Criar Projeto
1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Encontre seu repositório: `SEU_USUARIO/helpdesk-prefeitura`
4. Clique em **"Connect"**

### 2.3 Configurar Variáveis de Ambiente

No painel do Railway, clique em **"Variables"** e adicione:

```env
# Node
NODE_ENV=production
PORT=10000

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# JWT
JWT_SECRET=meu_segredo_super_secreto_123_mude_isso
JWT_EXPIRES_IN=24h

# Frontend (URL do próprio Railway)
FRONTEND_URL=https://seu-projeto.up.railway.app
```

### 2.4 Deploy
1. Após configurar as variáveis, o Railway já vai iniciar o build automaticamente
2. Clique em **"Deploy"** se não iniciar
3. Aguarde o build (3-5 minutos)

### 2.5 Acessar
- Após o deploy, seu app estará em: `https://seu-projeto.up.railway.app`
- A API estará em: `https://seu-projeto.up.railway.app/api/v1/...`

---

## 🔧 PASSO 3: Supabase

### 3.1 Executar Schema
1. Acesse https://supabase.com
2. Crie um novo projeto (ou use um existente)
3. Vá em **SQL Editor** > **New Query**
4. Copie o conteúdo de `backend/src/database/schema.sql`
5. Cole e execute

### 3.2 Obter Credenciais
1. Vá em **Settings** > **API**
2. Copie:
   - **Project URL**
   - **anon/public key**
   - **service_role key**

### 3.3 Atualizar Railway
1. Volte no Railway
2. Atualize as variáveis `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
3. O Railway vai redeployar automaticamente

---

## 📁 Estrutura do Monorepo

```
helpdesk-prefeitura/
├── package.json              # Root - scripts para tudo
├── railway.json              # Configuração Railway (1 projeto só)
├── nixpacks.toml             # Build config
│
├── backend/
│   ├── src/
│   │   ├── server.ts         # Servidor Express (serve frontend em prod)
│   │   ├── database/
│   │   │   └── schema.sql    # ⭐ SQL do Supabase
│   │   └── routes/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   └── ...
    └── package.json
```

---

## 🔁 Como Fazer Updates

### Desenvolvimento Local
```bash
# Instalar tudo
npm run install:all

# Rodar em desenvolvimento
npm run dev
```

### Deploy de Atualizações
```bash
# Fazer alterações no código...

# Commit e push
git add .
git commit -m "Descrição das mudanças"
git push

# O Railway detecta automaticamente e faz deploy!
```

---

## 🎯 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run install:all` | Instala dependências de tudo |
| `npm run dev` | Roda frontend + backend juntos |
| `npm run build` | Build de produção de tudo |
| `npm run start` | Roda servidor em produção |

---

## ⚠️ Importante

### 1. Porta no Railway
O Railway define a porta automaticamente via variável `PORT`. O servidor usa:
```typescript
const PORT = process.env.PORT || 3333;
```

### 2. Frontend em Produção
Em produção, o backend serve os arquivos estáticos do frontend. Não precisa de 2 serviços!

### 3. CORS
A variável `FRONTEND_URL` deve ser a URL do seu projeto no Railway.

### 4. Build
O Railway executa:
1. `npm run install:all` - instala dependências
2. `npm run build` - build do frontend e backend
3. `npm run start` - inicia o servidor

---

## 🐛 Troubleshooting

### Build falhou
- Verifique os logs no Railway
- Teste o build localmente: `npm run build`

### Frontend não carrega
- Verifique se o build do frontend foi feito
- Olhe os logs: `Frontend build não encontrado`

### Erro de CORS
- Atualize `FRONTEND_URL` nas variáveis do Railway
- Use a URL correta: `https://xxx.up.railway.app`

### Banco de dados não conecta
- Verifique as variáveis do Supabase
- Teste no SQL Editor do Supabase

---

## 📊 Monitoramento

No Railway você pode ver:
- **Logs**: Em tempo real
- **Metrics**: CPU, memória, requests
- **Deployments**: Histórico de deploys

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código enviado (push)
- [ ] Projeto criado no Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Schema SQL executado no Supabase
- [ ] Deploy realizado com sucesso
- [ ] Frontend acessível
- [ ] API respondendo (`/health`)

---

**Dúvidas? Consulte o README.md ou abra uma issue!**
