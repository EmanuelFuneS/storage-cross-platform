import * as z from "zod";

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  capacity: z.number(),
});
