set -e

export DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"


echo "Run Drizzle Migrations"

npx drizzle-kit migrate

echo "Run APP"
exec "$@"