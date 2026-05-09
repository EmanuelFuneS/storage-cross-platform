# `@repo/env` — Environment Variables

Centralized Zod-validated environment variable loader for the Storage monorepo. Loads `.env` from the monorepo root and exports a typed `globalEnv` object.

## Tech Stack

- **Zod** — schema validation
- **dotenv** — `.env` file loading
- **TypeScript** (CommonJS target)

## Variables

| Variable | Type | Description |
|----------|------|-------------|
| `NODE_ENV` | `string` | Runtime environment (default: `development`) |
| `DB_HOST` | `string` | PostgreSQL host |
| `DB_PORT` | `string` | PostgreSQL port |
| `DB_PASSWORD` | `string` | PostgreSQL password |
| `DB_USER` | `string` | PostgreSQL user |
| `DB_NAME` | `string` | PostgreSQL database name |
| `NEXT_PUBLIC_CLOUDFRONT_DOMAIN` | `string` | CloudFront CDN domain for file previews |
| `PRESIGNED_LAMBDA_URL` | `string` | Lambda function URL for S3 presigned URLs |
| `AUTH_SECRET` | `string` | NextAuth.js secret |
| `DATABASE_URL` | `string` | Full PostgreSQL connection string |

## Usage

```ts
import { globalEnv } from "@repo/env";

console.log(globalEnv.DB_HOST);
```

In non-production environments, validation errors log a warning. In production, it falls back to raw `process.env`.

## Setup

Create a `.env` file at the monorepo root with all required variables.
