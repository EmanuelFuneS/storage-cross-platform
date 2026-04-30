import { pgTable, uuid, timestamp, unique } from "drizzle-orm/pg-core";
import { usersStorageTable } from "./userStorage";
import { filesTable } from "./file";

export const recentsFileTable = pgTable(
  "recentsFile",
  {
    id: uuid().primaryKey().defaultRandom(),
    storageId: uuid().references(() => usersStorageTable.id, {
      onDelete: "cascade",
    }),
    fileId: uuid().references(() => filesTable.id, { onDelete: "cascade" }),
    opened_at: timestamp().defaultNow(),
  },
  (table) => [unique().on(table.storageId, table.fileId)],
);
