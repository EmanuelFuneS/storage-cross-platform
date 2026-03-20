import {z} from "zod";

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
    NEXT_PUBLIC_API_URL: z.string(),
    AUTH_SECRET: z.string(),
    
    DATABASE_URL: z.string(),
})


const globalEnv = schemaEnv.parse(process.env) 
export default globalEnv;