import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { timestamps } from "./columns.helpers";

export const usersStorageTable = pgTable("usersStorage",{
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(()=> usersTable.id),
    capacity: integer(),
    used: integer(),

    ...timestamps
}/* agregar index */)