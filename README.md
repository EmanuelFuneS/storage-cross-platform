# Storage

Cloud storage application — Google Drive–style file management with S3 backend, CDN, and PostgreSQL.

## Architecture

```
apps/
  cdk-app/   AWS CDK infrastructure (VPC, S3, CloudFront, ECS, RDS, Lambda)
  web/       Next.js web application (App Router, NextAuth, Drizzle ORM)

packages/
  ui/        Shared React design system (Tailwind v4, lucide-react)
  env/       Zod-validated environment variables
  eslint-config/  Shared ESLint config
  typescript-config/  Shared TypeScript config
```

## Docs

| Package | Description |
|---------|-------------|
| [`apps/cdk-app`](./apps/cdk-app/README.md) | Infrastructure as Code — 4 stacks: Network, Storage, DB, App |
| [`apps/web`](./apps/web/README.md) | Next.js frontend — marketing, auth, dashboard, file management |
| [`packages/ui`](./packages/ui/README.md) | Design system — Button, Card, Modal, Input, Typography, etc. |
| [`packages/env`](./packages/env/README.md) | Environment variables — validated with Zod |
