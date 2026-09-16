# Rimvio (Agent + Hub)

Monorepo for Rimvio Agent · Hub · Capability · Execution. One product, shared contracts, PR-gated merge.

```text
rimvio/
├── frontend/     # Next.js app (Hub UI)
├── backend/      # Agent / Capability / Execution services
├── infra/        # Supabase migrations & ops notes
├── shared/       # Cross-team contracts (types + gates)
├── .github/      # CI + PR template
└── README.md
```

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | **22** (see `.nvmrc`) |
| Package manager | **npm** ≥ 10 (`packageManager` in root `package.json`) |

```bash
# nvm / fnm
nvm use   # or: fnm use
node -v   # should be v22.x
npm -v    # should be 10.x+
```

## 1. Clone

```bash
git clone https://github.com/paulop9504-commits/rimvio-agent-and-hub.git
cd rimvio-agent-and-hub
```

## 2. Install

```bash
npm install
```

Workspaces: `@rimvio/frontend` · `@rimvio/backend` · `@rimvio/shared`.

## 3. Environment variables

Secrets must **never** be committed. Copy examples, then fill locally:

```bash
cp .env.example .env.local                 # optional root notes
cp frontend/.env.example frontend/.env.local
```

Typical keys:

| Variable | Where | Notes |
|----------|--------|--------|
| `OPENAI_API_KEY` | server / backend | never `NEXT_PUBLIC_` |
| `DATABASE_URL` | server / backend | Postgres connection |
| `NEXT_PUBLIC_SUPABASE_URL` | frontend | publishable |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | frontend | publishable |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | never expose to browser |

`.env`, `.env.*` are gitignored; `.env.example` files are safe templates.

**Production later:** GitHub Actions Secrets / hosting env vars — not this repo.

## 4. Develop

```bash
# Hub UI (http://localhost:3000)
npm run dev

# Build shared contracts (needed after editing shared/)
npm run build -w @rimvio/shared

# Quality gates (same as CI)
npm run lint
npm run typecheck
npm test
```

## 5. Branch strategy

```text
main
 └── develop
      ├── feature/frontend
      ├── feature/agent-router
      ├── feature/capability
      ├── feature/execution
      └── feature/infra
```

| Branch | Role |
|--------|------|
| `main` | Integration / release — **no direct push** |
| `develop` | Day-to-day integration — **no direct push** |
| `feature/*` | Individual work |

```bash
git fetch origin
git checkout develop
git pull origin develop
git checkout -b feature/<your-area>
```

Examples: `feature/frontend`, `feature/agent-router`, `feature/capability`, `feature/execution`, `feature/infra`.

## 6. Pull Request flow

```text
feature/*  →  Pull Request  →  CI  →  Code Review  →  develop
develop    →  Pull Request  →  CI  →  Code Review  →  main
```

1. Push your branch: `git push -u origin HEAD`
2. Open a PR **into `develop`** (not `main`, unless releasing)
3. Wait for GitHub Actions **CI** (Install → Lint → Typecheck → Test → Frontend build)
4. Get at least one review approval
5. Merge only after CI is green

CI failure blocks merge on protected branches.

### Shared contracts (`shared/`)

Cross-team glue lives here — edit carefully and call out in the PR:

```text
shared/
├── capability.ts
├── execution.ts
├── verification.ts
└── agent.ts
```

Agent (건수) and Capability/Execution (희승) should depend on these types so work merges cleanly.

## Team commands cheat sheet

```bash
npm run dev              # frontend
npm run build            # shared → backend → frontend
npm run lint
npm run typecheck
npm test
npm run format           # Prettier
```

## Infra

See [`infra/README.md`](./infra/README.md) for Supabase migrations.
