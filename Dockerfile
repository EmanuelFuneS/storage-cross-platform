FROM --platform=linux/amd64 node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ui ./packages/ui
COPY packages/env ./packages/env
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config

# 1. Copiamos la app (que ya incluye la carpeta 'db')
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/web
# Placeholders para el build
ENV DB_HOST=localhost DB_PORT=5432 DB_PASSWORD=password DB_USER=user DB_NAME=db \
    PRESIGNED_LAMBDA_URL=http://placeholder AUTH_SECRET=placeholder_secret_123 \
    DATABASE_URL=postgresql://user:pass@localhost:5432/db

RUN pnpm build

FROM --platform=linux/amd64 node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g drizzle-kit drizzle-orm pg

COPY apps/web/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

# 2. Ajuste de rutas para Drizzle (usando tu carpeta 'db')
COPY --from=builder /app/apps/web/db ./db
COPY --from=builder /app/apps/web/drizzle.config.ts ./


ENTRYPOINT [ "/entrypoint.sh" ]
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
