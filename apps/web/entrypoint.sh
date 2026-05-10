#!/bin/sh
set -e

export DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require"

echo "DATABASE_URL: postgresql://${DB_USER}:****@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require"

echo "Run Drizzle Migrations"
cd apps/web
NODE_TLS_REJECT_UNAUTHORIZED=0 drizzle-kit migrate --config=./drizzle.config.ts
echo "Migrations OK"
cd /app

echo "Run APP"
exec "$@"
