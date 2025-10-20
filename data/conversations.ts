import "server-only";
import { db } from "@/db";
import { conversations } from "@/db/schemas/conversation";
import { and, eq } from "drizzle-orm";
import { verifySession } from "@/lib/session";

export const getConversations = async () => {
  return db.query.conversations.findMany();
};

export const getConversation = async (id: string) => {
  return db.query.conversations.findFirst({
    where: eq(conversations.id, id),
  });
};

export const isConversationOwner = async (id: string) => {
  const session = await verifySession();
  const ownerId = session.user.id;

  const conversation = await db.query.conversations.findFirst({
    where: and(eq(conversations.id, id), eq(conversations.createdBy, ownerId)),
  });

  return !!conversation;
};
