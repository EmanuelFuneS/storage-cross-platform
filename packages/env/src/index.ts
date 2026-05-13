import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const schemaEnv = z.object({
  //environment
  NODE_ENV: z.string().default("development"),
  //db local credentials
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_PASSWORD: z.string(),
  DB_USER: z.string(),
  DB_NAME: z.string(),

  DATABASE_URL: z.string(),
  //DB NEON
  PGUSER: z.string(),
  PGPASSWORD: z.string(),
  PGHOST: z.string(),
  PGDATABASE: z.string(),
  PGSSLMODE: z.string(),

  NEON_DATABASE_URL: z.string(),
  //web
  AUTH_SECRET: z.string(),
  //AWS
  NEXT_PUBLIC_CLOUDFRONT_DOMAIN: z.string(),
  PRESIGNED_LAMBDA_URL: z.string(),
});

const result = schemaEnv.safeParse(process.env);

if (!result.success && process.env.NODE_ENV !== "production") {
  console.error("❌ Invalid environment variables:", result.error.format());
}

export const globalEnv = result.success
  ? result.data
  : (process.env as unknown as z.infer<typeof schemaEnv>);

export default globalEnv;
