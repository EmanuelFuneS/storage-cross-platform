import { bigint, integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { timestamps } from "./columns.helpers";

export const usersStorageTable = pgTable(
  "usersStorage",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => usersTable.id, { onDelete: "cascade" }),
    capacity: bigint({ mode: "number" }),
    used: bigint({ mode: "number" }),

    ...timestamps,
  } /* agregar index */,
);
