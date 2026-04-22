import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const schemaEnv = z.object({
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
}).transform((data)=>{
  if(!data.DATABASE_URL && data.DB_USER){
    return {
      ...data,
      DATABASE_URL: `postgress://${data.DB_USER}:${data.DB_PASSWORD}@${data.DB_HOST}:${data.DB_PORT}/${data.DB_NAME}`
    }
  }
});

const globalEnv = schemaEnv.parse(process.env);
export default globalEnv;
