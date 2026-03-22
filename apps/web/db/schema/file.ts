import {
  bigint,
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { usersStorageTable } from "./userStorage";
import { foldersTable } from "./folder";
import { timestamps } from "./columns.helpers";

export const filesTable = pgTable("files", {
  id: uuid().primaryKey().defaultRandom(),
  userStorageId: uuid().references(() => usersStorageTable.id),
  folderId: uuid().references(() => foldersTable.id),
  name: varchar().notNull(),
  type: varchar().notNull(),
  size: bigint({mode: "number"}).notNull(),
  s3_key: varchar().notNull(),
  is_deleted: boolean().default(false),

  uploaded_at: timestamp(),
  ...timestamps,
}/* agregar index (table) => [
  index("files_user_storage_idx").on(table.userStorageId),
  index("files_folder_idx").on(table.folderId),
  index("files_is_deleted_idx").on(table.is_deleted),
]*/);
