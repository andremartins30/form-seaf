# 🚀 Guia de Deploy - Servidor Ubuntu

## 📋 Comandos para executar no servidor

### 1. Configurar o projeto

```bash
# Entrar na pasta
cd /var/www/form-seaf

# Copiar e editar variáveis de ambiente
cp .env.example .env
nano .env
```

**Configure no `.env`:**
```env
# Database (não exposto externamente)
POSTGRES_USER=seaf
POSTGRES_PASSWORD=TROQUE_PARA_SENHA_FORTE
POSTGRES_DB=seaf

# Backend
BACKEND_PORT=3000
NODE_ENV=production
CORS_ORIGIN=http://64.23.178.251

# Frontend
FRONTEND_PORT=5173
VITE_API_URL=http://64.23.178.251:3000
VITE_ACCESS_PASSWORD=seaf2026
```

### 2. Subir os containers

```bash
docker compose up -d
```

### 3. Verificar status

```bash
# Ver containers rodando
docker compose ps

# Ver logs em tempo real
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

### 4. Rodar migrations do Prisma (primeira vez)

```bash
docker compose exec backend npx prisma migrate deploy
```

### 5. Seed do banco (opcional)

```bash
docker compose exec backend npm run seed
```

## 🔧 Resolução de Problemas

### Porta 5432 já em uso
✅ **Resolvido!** O banco não é mais exposto externamente, apenas o backend acessa via rede Docker interna.

### Porta 3000 ou 5173 já em uso
Edite o `.env` e troque `BACKEND_PORT` ou `FRONTEND_PORT` para outras portas disponíveis.

### Container não inicia
```bash
# Ver logs detalhados
docker compose logs

# Forçar rebuild
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Erro de conexão com banco
```bash
# Verificar se o banco está healthy
docker compose ps

# Ver logs do banco
docker compose logs db

# Reiniciar serviços
docker compose restart
```

## 🔄 Atualizar a aplicação

```bash
cd /var/www/form-seaf

# Baixar atualizações
git pull

# Rebuildar e reiniciar
docker compose down
docker compose build
docker compose up -d

# Rodar migrations se houver
docker compose exec backend npx prisma migrate deploy
```

## 🗑️ Limpar tudo

```bash
# Parar e remover containers (dados do volume são preservados)
docker compose down

# Parar e remover TUDO incluindo volumes (⚠️ APAGA DADOS DO BANCO!)
docker compose down -v
```

## 🌐 Acessar a aplicação

- **Frontend**: http://64.23.178.251:5173
- **Backend API**: http://64.23.178.251:3000

## 📊 Monitoramento

```bash
# Ver uso de recursos
docker stats

# Ver processos dentro do container
docker compose exec backend ps aux

# Entrar no container
docker compose exec backend sh
docker compose exec db sh
```

## ✅ Checklist Pós-Deploy

- [ ] Containers rodando: `docker compose ps`
- [ ] Backend respondendo: `curl http://localhost:3000`
- [ ] Frontend carregando: `curl http://localhost:5173`
- [ ] Migrations aplicadas: logs do backend
- [ ] Sem erros nos logs: `docker compose logs`

## 🔐 Segurança

- ✅ Banco de dados **NÃO** exposto externamente
- ✅ Senha forte no `.env`
- ✅ Arquivo `.env` não commitado no git
- ⚠️ Considere adicionar HTTPS (Nginx reverso + Certbot)
- ⚠️ Firewall configurado corretamente
