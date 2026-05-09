# Web — Storage Application (`web`)

Full-stack cloud storage web application (Google Drive–like) built with Next.js 16 (App Router).

## Tech Stack

- **Next.js 16.1** (standalone output, App Router)
- **React 19.2** + TypeScript
- **NextAuth.js v4** (Credentials provider, JWT sessions)
- **Drizzle ORM** + **node-postgres** (PostgreSQL)
- **@tanstack/react-query** (server state)
- **Zustand** (client state)
- **Tailwind CSS v4** (design system from `@repo/ui`)
- **react-hook-form** + **Zod** (form validation)
- **react-dropzone** (file upload)
- **lucide-react** (icons)
- **next-themes** (dark mode)
- **react-pdf** + **@monaco-editor/react** (file previews)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing (Hero, Features, Pricing) |
| `/auth/sign-in` | Login (NextAuth credentials) |
| `/auth/sign-up?plan=X` | Registration |
| `/dashboard` | File browser (folders, files, breadcrumbs) |
| `/dashboard/recent` | Recently accessed files |
| `/dashboard/starred` | Starred/favorited files |
| `/dashboard/shared` | Shared files (placeholder) |
| `/dashboard/storage` | Storage usage by file type |

## API Endpoints

16 endpoints under `/api/` covering auth, files, folders, storage, S3 presigned proxy, and health checks. See `app/api/` for the full list.

## Database

PostgreSQL with 8 tables: `users`, `plans`, `usersStorage`, `folders`, `files`, `types`, `recentsFile`. Managed via Drizzle ORM with migrations in `db/migrations/`.

## Getting Started

```bash
# Install dependencies (from monorepo root)
pnpm install

# Start dev server
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Requires all variables defined in `@repo/env` (see `packages/env/`). Create a `.env` at the monorepo root.
