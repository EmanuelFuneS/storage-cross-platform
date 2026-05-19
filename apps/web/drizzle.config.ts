import type { Config } from "drizzle-kit";

if (!process.env.NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL is not defined in env vars");
}

export default {
  dialect: "postgresql",
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL,
  },
} satisfies Config;
