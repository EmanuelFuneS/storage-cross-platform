import * as z from "zod";

export const fileSchema = z.object({
  folderId: z.string(),
  typeId: z.string(),
  name: z.string(),
  size: z.number(),
  s3_key: z.string(),
});

export type ICreateFileForm = z.infer<typeof fileSchema>;

export type IUpdateFileForm = z.infer<typeof fileSchema>;
