# ⚡ Instruções Rápidas - Deploy em 5 Minutos

## 📋 Resumo

Você tem **1 monorepo** com frontend + backend. Vai subir **1 projeto no Railway** que serve ambos.

---

## 🚀 Passo a Passo Rápido

### 1️⃣ GitHub (2 min)

```bash
cd c:\projetos\regulacao

# Inicializar git
git init

# Criar repositório em: https://github.com/new
# Nome: helpdesk-prefeitura
# NÃO marque "Initialize with README"

# Adicionar remote (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/helpdesk-prefeitura.git

# Commit e push
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

---

### 2️⃣ Supabase (3 min)

1. https://supabase.com → New Project
2. Aguarde criar (2 min)
3. **SQL Editor** → New Query
4. Copie `backend/src/database/schema.sql` inteiro
5. Cole e clique **Run**
6. **Settings** → **API** → Copie:
   - Project URL
   - anon key
   - service_role key

---

### 3️⃣ Railway (5 min)

1. https://railway.app → **New Project**
2. **Deploy from GitHub repo**
3. Selecione: `SEU_USUARIO/helpdesk-prefeitura`
4. **Variables** → Adicione:

```
NODE_ENV=production
PORT=10000

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

JWT_SECRET=mude_isso_aqui_123
FRONTEND_URL=https://seu-projeto.up.railway.app
```

5. Aguarde deploy automático (3-5 min)

---

### 4️⃣ Acessar

- **Frontend**: `https://seu-projeto.up.railway.app`
- **API**: `https://seu-projeto.up.railway.app/api/v1/...`
- **Health**: `https://seu-projeto.up.railway.app/health`

---

## ✅ Checklist

- [ ] Git init e push feito
- [ ] Schema SQL executado no Supabase
- [ ] Projeto Railway criado
- [ ] Variáveis configuradas no Railway
- [ ] Deploy completou com sucesso
- [ ] Frontend carrega
- [ ] `/health` retorna OK

---

## 🐛 Problemas Comuns

| Erro | Solução |
|------|---------|
| Build falhou | Rode `npm run build` local pra testar |
| Frontend não carrega | Veja logs no Railway |
| Erro CORS | Atualize FRONTEND_URL no Railway |
| DB não conecta | Confira variáveis do Supabase |

---

## 📚 Documentação Completa

- **README.md** - Visão geral
- **DEPLOY_GITHUB_RAILWAY.md** - Guia detalhado
- **PROXIMOS_PASSOS.md** - Próximos passos
- **INSTRUCOES_SUPABASE.md** - Supabase detalhado

---

**Dúvidas? Abra o DEPLOY_GITHUB_RAILWAY.md!**
