import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in env vars");
}

export default {
  dialect: "postgresql",
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
