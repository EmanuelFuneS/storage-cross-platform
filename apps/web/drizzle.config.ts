import type { Config } from "drizzle-kit";
import globalEnv from "@repo/env";

if (!globalEnv.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in env vars");
}

export default {
  dialect: "postgresql",
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: globalEnv.DATABASE_URL,
  },
} satisfies Config;
