import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { contactMethods, conversations } from "@/db/schemas/conversation";

export const conversationFormSchema = createInsertSchema(conversations, {
  targetPerson: z.string().trim().min(1, "名前は一文字以上入力してください"),
  content: z.string().trim().min(1, "内容は一文字以上入力してください"),
  contactMethod: z.enum(contactMethods),
}).omit({
  caseworkerId: true,
  createdAt: true,
  updatedAt: true,
})