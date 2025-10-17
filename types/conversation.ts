import { conversations } from "@/db/schemas/conversation";
import { conversationFormSchema } from "@/zod/conversation";
import z from "zod";

export type Conversation = typeof conversations.$inferSelect;
export type ConversationFormData = z.infer<typeof conversationFormSchema>