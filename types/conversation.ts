import { conversations } from "@/db/schemas/conversation";

export type Conversation = typeof conversations.$inferSelect;