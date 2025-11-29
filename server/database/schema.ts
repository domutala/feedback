import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  jsonb,
} from "drizzle-orm/pg-core";

export const model = pgTable("model", {
  id: uuid().primaryKey().defaultRandom(),
  data: jsonb().notNull(),
  email: varchar().notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type Model = typeof tables.model.$inferSelect;
