import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import globalEnv from "@repo/env";

//DevLocal
//const connectionString = `postgresql://${globalEnv.DB_USER}:${globalEnv.DB_PASSWORD}@${globalEnv.DB_HOST}:${globalEnv.DB_PORT}/${globalEnv.DB_NAME}`;


//Dev Neon
const connectionString = `postgresql://${globalEnv.PGUSER}:${globalEnv.PGPASSWORD}@${globalEnv.PGHOST}/${globalEnv.PGDATABASE}?sslmode=${globalEnv.PGSSLMODE}`;

const pool = new Pool({
  connectionString: `${connectionString}`,
});

export const db = drizzle(pool, { schema });
