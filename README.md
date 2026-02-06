# Form SEAF - Monorepo

Sistema de formulários SEAF com backend e frontend integrados.

## 📁 Estrutura

```
Form-seaf/
├── backend/          # API em Node.js + Express + Prisma
├── frontend/         # Interface em React + Vite
├── docker-compose.yml
└── .env              # Variáveis de ambiente (não commitado)
```

## 🚀 Configuração Inicial

### 1. Copiar arquivo de ambiente

```bash
cp .env.example .env
```

### 2. Configurar variáveis no arquivo `.env`

```env
# Database (não exposto externamente)
POSTGRES_USER=seaf
POSTGRES_PASSWORD=sua_senha_aqui
POSTGRES_DB=seaf

# Backend
BACKEND_PORT=3000
NODE_ENV=development
CORS_ORIGIN=*

# Frontend
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:3000
VITE_ACCESS_PASSWORD=sua_senha_de_acesso
```

### 3. Subir os containers

```bash
docker compose up -d
```

### 4. Acessar a aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Database**: Interno (não exposto, backend conecta via rede Docker)

## 🛠️ Comandos Úteis

```bash
# Subir containers
docker compose up -d

# Ver logs
docker compose logs -f

# Parar containers
docker compose down

# Rebuild após mudanças
docker compose up -d --build

# Acessar container do backend
docker compose exec backend sh

# Rodar migrations
docker compose exec backend npm run prisma:migrate

# Prisma Studio (visualizar dados)
docker compose exec backend npm run prisma:studio
```

## 📦 Tecnologias

### Backend
- Node.js 20
- Express
- Prisma ORM
- PostgreSQL 16
- TypeScript

### Frontend
- React 19
- Vite
- TypeScript
- Bootstrap 5

## 🗄️ Database

O banco de dados PostgreSQL roda em container Docker com volume persistente.

### Migrations
```bash
docker compose exec backend npm run prisma:migrate
```

### Seed
```bash
docker compose exec backend npm run seed
```

## 🔐 Segurança

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env` com credenciais reais!

- O `.env` está no `.gitignore`
- Use `.env.example` como template
- Em produção, use senhas fortes

## 📝 Desenvolvimento

O ambiente de desenvolvimento usa volumes Docker para hot-reload:
- Mudanças no código são refletidas automaticamente
- Não precisa rebuildar após cada alteração

## 🚀 Próximos Passos

- [ ] Configurar CI/CD
- [ ] Adicionar testes
- [ ] Setup de produção
- [ ] Documentação da API
