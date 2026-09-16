# rimvio-agent-and-hub

림비오 **Agent & Hub** MVP. Loop · Capability · Action · Execution을 다루는 새 SSOT입니다.

## Legacy

예전 Globe / PC / Reality OS 실험은 **건드리지 않습니다**.

- GitHub: [`paulop9504-commits/rimvio`](https://github.com/paulop9504-commits/rimvio)
- 로컬: 옆 폴더 `rimvio`

이 레포만 Agent+Hub 그린필드입니다.

## Stack

- Next.js App Router (SSR) + TypeScript + Tailwind
- Supabase Auth + PostgreSQL
- 경계: UI(`app/`) → API(`app/api/*`) → server domain(`lib/server/*`) → Supabase

## Setup

```bash
cp .env.example .env.local
# fill NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
npm install
npm run dev
```

Apply schema in Supabase SQL editor or CLI:

`supabase/migrations/001_core.sql`

## Core tables

`profiles` · `capabilities` · `actions` · `loops` · `executions` · `execution_logs` · `permissions`

## Product nouns

| Surface | Means |
|---------|--------|
| Hub | Loop 목록 · 진행 |
| Agent | Capability / Action 실행 |
| Log | Execution Log |

## Health

`GET /api/health` — process + env check  
`GET /api/loops` — own loops (auth + RLS)
