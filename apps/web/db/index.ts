import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import globalEnv from "@repo/env";

console.log("repo/env", globalEnv.DATABASE_URL)

const pool = new Pool({
  connectionString: globalEnv.DATABASE_URL,
});

export const db = drizzle(pool, { schema });