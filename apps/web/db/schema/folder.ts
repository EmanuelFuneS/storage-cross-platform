import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { timestamps } from "./columns.helpers";

export const foldersTable = pgTable("folders", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(()=> usersTable.id),
  name: varchar().notNull(),
  parentId: varchar(),

  ...timestamps
}/* agregar index (table) => [
  index("folders_user_idx").on(table.userId),
  index("folders_parent_idx").on(table.parentId),
]*/);
