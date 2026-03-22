import * as z from "zod";

export const userStorageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  capacity: z.number(),
  used: z.number(),
});
