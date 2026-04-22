import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const schemaEnv = z
  .object({
    //environment
    NODE_ENV: z.string().default("development"),
    //db credentials
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_PASSWORD: z.string(),
    DB_USER: z.string(),
    DB_NAME: z.string(),
    //web
    PRESIGNED_LAMBDA_URL: z.string(),
    AUTH_SECRET: z.string(),

    DATABASE_URL: z.string(),
  })
  .transform((data) => {
    if (!data.DATABASE_URL && data.DB_USER) {
      return {
        ...data,
        DATABASE_URL: `postgress://${data.DB_USER}:${data.DB_PASSWORD}@${data.DB_HOST}:${data.DB_PORT}/${data.DB_NAME}`,
      };
    }
  });

const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.CI === "true";

const parsed = isBuildTime
  ? schemaEnv.safeParse(process.env)
  : { success: true, data: schemaEnv.parse(process.env) };

export const globalEnv = parsed.success
  ? parsed.data
  : (process.env as unknown as z.infer<typeof schemaEnv>);

export default globalEnv;
