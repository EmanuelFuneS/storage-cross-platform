import * as z from "zod";

export const folderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  parentId: z.string(),
});
