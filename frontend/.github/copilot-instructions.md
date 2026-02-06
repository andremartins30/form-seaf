# Copilot Instructions - Form Plano & Form API

## Visão Geral da Arquitetura

Este workspace contém dois projetos independentes mas integrados:

- **form-plano** (frontend): SPA React 19 + TypeScript + Vite + Bootstrap para formulários dinâmicos
- **form-api** (backend): REST API Node.js + Express + TypeScript + PostgreSQL + Prisma ORM

O frontend consome a API para obter dados dinâmicos (categorias, itens, tipos de comunidades) e submeter formulários preenchidos.

## Backend (form-api)

### Arquitetura em Camadas

Fluxo: `Routes → Controllers → Services → Repositories → Database`

**Padrão obrigatório para novos endpoints:**
1. Criar repository em `src/repositories/` - acessa Prisma diretamente
2. Criar service em `src/services/` - valida com Zod, chama repository
3. Criar controller em `src/controllers/` - trata req/res HTTP, método por endpoint
4. Criar routes em `src/routes/` - define Express routes, instancia controller
5. Registrar em `src/app.ts` - adiciona route com `app.use()`

**Exemplo completo:** Compare [category.repository.ts](form-api/src/repositories/category.repository.ts), [category.service.ts](form-api/src/services/category.service.ts), [category.controller.ts](form-api/src/controllers/category.controller.ts), [category.routes.ts](form-api/src/routes/category.routes.ts)

### Padrões de Código

- **Controllers:** Use arrow functions para preservar `this`, retorno `Promise<void>`, handlers com try/catch
- **Services:** Validação Zod obrigatória antes de persistir dados
- **Repositories:** Use métodos `async`, retorne tipos Prisma diretamente
- **Respostas:** Sempre `{ success: true, data: ... }` ou `{ success: false, error: ... }`
- **Prisma Client:** Use singleton de `src/db/prisma.ts`, nunca instancie direto

### Comandos Essenciais

```bash
cd form-api
npm run dev              # Desenvolvimento com hot reload (ts-node-dev)
npm run prisma:migrate   # Criar/aplicar migração após alterar schema.prisma
npm run prisma:studio    # Interface visual do banco
npm run seed             # Popular banco com dados iniciais
```

**IMPORTANTE:** Após modificar `prisma/schema.prisma`, sempre rode `npm run prisma:migrate` com nome descritivo da mudança.

### Banco de Dados

- **Postgres via Prisma ORM** - não usar SQL raw exceto em migrations manuais
- Modelos principais: `FormSubmission` (JSON payload flexível), `Category` (1:N) `Item`, `CommunityType`
- Relações: `Category.items` (cascade delete), usar `include` em queries para popular
- IDs: `Int @default(autoincrement())` para Category/Item/CommunityType, `String @default(uuid())` para FormSubmission

## Frontend (form-plano)

### Arquitetura de Componentes

- **DynamicForm** (único componente): Renderiza formulário completo baseado em `questions.ts`
- **questions.ts**: Array de configuração de perguntas com dependências (`showIf`) e agrupamento
- **useCategories hook**: Busca dados da API em paralelo, mescla com questions estáticas

**Pattern de Questions:**
```typescript
{
  id: "campo",
  label: "Rótulo",
  type: "text|select|radio|checkbox-group|textarea|number",
  group: number,              // Agrupa visualmente
  showIf: (answers) => bool,  // Renderização condicional
  options: [{ value, label }] // Para select/radio/checkbox
}
```

### Integração com API

- **Base URL:** `VITE_API_URL` (.env) ou fallback `http://localhost:3000`
- **Endpoints usados:**
  - `GET /api/categories/form-data` - categorias + itemsMap
  - `GET /api/community-types` - tipos de comunidades
  - `POST /api/forms/submissions` - enviar formulário preenchido
- **Fetch paralelo:** useCategories usa `Promise.all` - mantenha pattern

### Comandos Essenciais

```bash
cd form-plano
npm run dev    # Vite dev server (porta padrão 5173)
npm run build  # Build de produção (tsc + vite build)
```

## Convenções Cross-Project

- **TypeScript strict:** Sempre tipar explicitamente parâmetros e retornos de funções
- **Error Handling:** Backend retorna Zod validation errors detalhados, frontend deve exibir
- **Naming:** camelCase para variáveis/funções, PascalCase para classes/componentes/types
- **Imports:** Use paths absolutos no frontend (configurado no tsconfig), relativos no backend

## Debugging Comum

- **"Prisma Client not generated"**: Execute `npm run prisma:generate` no form-api
- **CORS errors**: Verificar `cors()` em `app.ts` e VITE_API_URL no .env do frontend
- **Types desatualizados**: Após mudar schema, regenerar Prisma Client antes de ajustar código
- **Express 5.x**: Aceita arrays em params - use `Array.isArray(req.params.x) ? x[0] : x`

## Referências de Arquivo

- Backend layering: [app.ts](form-api/src/app.ts) registra todas as rotas
- DB singleton: [prisma.ts](form-api/src/db/prisma.ts) evita múltiplas instâncias
- Form schema: [questions.ts](form-plano/src/data/questions.ts) define estrutura do formulário
- API integration: [useCategories.ts](form-plano/src/hooks/useCategories.ts) mostra padrão fetch
