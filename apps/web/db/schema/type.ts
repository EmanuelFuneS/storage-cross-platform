import { pgTable, uuid, varchar, } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const typesTable = pgTable("types", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  subType: varchar().array().notNull(),
  ...timestamps,
});
