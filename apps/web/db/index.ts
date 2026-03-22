import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);
console.log("DB_PASSWORD value:", process.env.DB_PASSWORD);
console.log("DB_URL:", process.env.DATABASE_URL);
