# ticktock — Timesheet management

A Next.js timesheet app: weekly timesheet list with filters + pagination, week detail with grouped daily tasks, and add / edit / delete entries via modals. Auth and data are backed by an in-memory mock store.

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- next-auth (JWT session, Credentials provider)
- TanStack Query + TanStack Table
- React Hook Form + Zod
- Vitest + Testing Library

## Getting started

```bash
npm install
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" > .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're redirected to `/login`.

### Environment variables

| Variable          | Purpose                                            |
| ----------------- | --------------------------------------------------- |
| `NEXTAUTH_SECRET` | Signing secret for JWT session cookies (required)    |
| `NEXTAUTH_URL`    | Canonical site URL, e.g. `http://localhost:3000`     |

On Vercel, set `NEXTAUTH_SECRET` in Project Settings → Environment Variables for Production and Preview; `NEXTAUTH_URL` falls back to `https://$VERCEL_URL` if omitted.

### Demo login

| Email                  | Password  |
| ---------------------- | --------- |
| `mohsin@tentwenty.com` | `abc1234` |

## Scripts

| Command             | Description                |
| -------------------- | --------------------------- |
| `npm run dev`         | Dev server                  |
| `npm run build`       | Production build            |
| `npm run start`       | Start production server     |
| `npm run lint`        | ESLint                       |
| `npm run test`        | Vitest (watch)               |
| `npm run test:run`    | Vitest once (CI-friendly)    |

## Project structure

```
src/
├─ app/                    # Routes, layouts, providers, API route handlers
├─ components/             # Shared layout shell + shadcn/ui primitives
├─ features/
│  ├─ auth/                # Login form
│  └─ timesheets/          # Components, API client, hooks, utils
├─ lib/                    # Shared utils, Zod schemas, constants
├─ server/                 # Auth config, mock store, server-side services
├─ types/                  # Shared TypeScript types
└─ middleware.ts           # Protects /dashboard routes
```

## Behaviour

- **Auth** — Credentials checked against an in-memory mock user; sessions use next-auth JWT.
- **Data** — Weeks/entries live in a process-global in-memory store; resets on server restart.
- **Status badges** — `0h → Missing`, `<40h → Incomplete`, `≥40h → Completed`.
- **Mutations** — Create/update/delete go through `/api/timesheets/...`; forms reuse the API's Zod schema.

## Testing

```bash
npm run test:run
```

Covers core domain helpers (`timesheetUtils`) and a status badge smoke test.
