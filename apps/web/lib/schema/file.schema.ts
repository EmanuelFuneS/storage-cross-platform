import * as z from "zod";

export const fileSchema = z.object({
  id: z.string(),
  userStorageId: z.string(),
  folderId: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  s3_key: z.string(),
  is_deleted: z.boolean().default(false),
});
