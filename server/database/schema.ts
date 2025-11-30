import { FeedbackData, FeedbackModel } from "~~/app/tools/interfaces/index";
import { pgTable, uuid, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";

export const model = pgTable("model", {
  id: uuid().primaryKey().defaultRandom(),
  data: jsonb().$type<FeedbackModel>().notNull(),
  title: varchar(),
  emails: varchar().array().notNull(),
  clientKey: varchar("client_key", { length: 12 }).unique().notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
});

export const feedback = pgTable("feedback", {
  id: uuid().primaryKey().defaultRandom(),
  data: jsonb().$type<FeedbackData>().notNull(),
  modelID: uuid("model_id").references(() => model.id),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
});

export type Model = typeof tables.model.$inferSelect;
