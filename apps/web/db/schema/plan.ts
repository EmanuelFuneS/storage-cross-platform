import {
  integer,
  pgTable,
  varchar,
  decimal,
  uuid,
  bigint,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const plansTable = pgTable(
  "plans",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    price: decimal().notNull(),
    capacity: bigint({ mode: "number" }).notNull(),

    ...timestamps,
  } /* agregar index */,
);
