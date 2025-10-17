import { contactMethods, conversations } from "@/db/schemas/conversation";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversationFormSchema = createInsertSchema(conversations, {
  targetPerson: z.string().trim().min(1, "名前は一文字以上入力してください"),
  content: z.string().trim().min(1, "内容は一文字以上入力してください"),
  contactMethod: z.enum(contactMethods),
  consultationDate: z.date(),
}).omit({
  caseworkerId: true,
  createdAt: true,
  updatedAt: true,
  id: true,
  createdBy: true,
  updatedBy: true,
  deletedAt: true,
});
