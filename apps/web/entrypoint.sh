#!/bin/sh
set -e

export DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "DATABASE_URL: postgresql://${DB_USER}:****@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "Run Drizzle Migrations"
cd apps/web
drizzle-kit migrate --config=./drizzle.config.ts
cd /app

echo "Run APP"
exec "$@"
