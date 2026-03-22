import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type ILoginForm = z.infer<typeof loginFormSchema>;

export const registerFromSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  planId: z.string(),
});

export type IRegisterForm = z.infer<typeof registerFromSchema>;
