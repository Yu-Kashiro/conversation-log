import "server-only";
import { db } from "@/db";
import { conversations } from "@/db/schemas/conversation";
import { eq } from "drizzle-orm";

export const getConversations = async () => {
  return db.query.conversations.findMany();
}

export const getConversation = async (id: string) => {
  return db.query.conversations.findFirst({
    where: eq(conversations.id, id)
  })
}