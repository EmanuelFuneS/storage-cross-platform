import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import globalEnv from "@repo/env";


const connectionString = `postgresql://${globalEnv.DB_USER}:${globalEnv.DB_PASSWORD}@${globalEnv.DB_HOST}:${globalEnv.DB_PORT}/${globalEnv.DB_NAME}`;

const pool = new Pool({
  connectionString: `${connectionString}?sslmode=require`,
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });
