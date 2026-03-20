import { pgTable, varchar, integer, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { plansTable } from "./plan";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  email: varchar().unique().notNull(),
  password: varchar().notNull(),
  role: varchar().default("client"),
  planId: uuid().references(()=> plansTable.id),
  ...timestamps,
}/* agregar index */);
