import * as z from "zod";

export const folderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  parentId: z.string(),
});

export const createFolderSchema = z.object({
  name: z.string(),
  parentId: z.string(),
});

export type ICreateFolderForm = z.infer<typeof createFolderSchema>;

export type IUpdateFolderForm = z.infer<typeof folderSchema>;
