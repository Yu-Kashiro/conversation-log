import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";

export const contactMethods = ["phone", "counter", "visit", "email", "online"] as const;

export const contactMethodEnum = pgEnum("contact_method", contactMethods);

export const conversations = pgTable("conversations", {
  id: text("id").primaryKey().$defaultFn(() => nanoid(10)),
  targetPerson: text("target_person").notNull(),
  caseworkerId: text("caseworker_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  consultationDate: timestamp("consultation_date").notNull(),
  contactMethod: contactMethodEnum("contact_method").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  updatedBy: text("updated_by").references(() => users.id, {
    onDelete: "cascade",
  }),
  deletedAt: timestamp("deleted_at"),
});

export const conversationRelations = relations(conversations, ({ one }) => ({
  caseworker: one(users, {
    fields: [conversations.caseworkerId],
    references: [users.id],
  }),
}));