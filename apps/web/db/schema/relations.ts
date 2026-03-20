import { plansTable } from "./plan";
import { usersTable } from "./user";
import { relations } from "drizzle-orm";
import { usersStorageTable } from "./userStorage";
import { foldersTable } from "./folder";
import { filesTable } from "./file";
//plan -> users

export const plansRelations = relations(plansTable, ({ many }) => ({
  users: many(usersTable),
}));

//user > plan, storage, folder

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  plan: one(plansTable, {
    fields: [usersTable.planId],
    references: [plansTable.id],
  }),
  storage: one(usersStorageTable, {
    fields: [usersTable.id],
    references: [usersStorageTable.userId],
  }),
  folders: many(foldersTable),
}));

// userStorage -> users, files
export const usersStorageRelations = relations(
  usersStorageTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [usersStorageTable.userId],
      references: [usersTable.id],
    }),
    files: many(filesTable),
  }),
);

//folder -> users, tfolder, bfolder, files

export const foldersRelations = relations(foldersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [foldersTable.userId],
    references: [usersTable.id],
  }),
  parent: one(foldersTable, {
    fields: [foldersTable.parentId],
    references: [foldersTable.id],
    relationName: "folder_children",
  }),
  Children: many(foldersTable, {
    relationName: "folder_children",
  }),
  files: many(filesTable),
}));

//files -> userStorage, folder

export const filesRelations = relations(filesTable, ({ one }) => ({
  Storage: one(usersStorageTable, {
    fields: [filesTable.userStorageId],
    references: [usersStorageTable.id],
  }),
  folder: one(foldersTable, {
    fields: [filesTable.folderId],
    references: [foldersTable.id],
  }),
}));
