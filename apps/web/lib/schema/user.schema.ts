import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type ILoginForm = z.infer<typeof loginFormSchema>;

export const registerFromSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),
  planId: z.string().nonempty(),
});

export type IRegisterForm = z.infer<typeof registerFromSchema>;
