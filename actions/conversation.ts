"use server";

import { db } from "@/db";
import { conversations } from "@/db/schemas/conversation";
import { verifySession } from "@/lib/session";
import { ConversationFormData } from "@/types/conversation";
import { conversationFormSchema } from "@/zod/conversation";
import { and, eq } from "drizzle-orm";

export async function createConversation(formData: ConversationFormData) {
  const data = conversationFormSchema.parse(formData);
  const session = await verifySession();
  const caseworkerId = session.user.id;
  const createdBy = session.user.id;

  await db.insert(conversations).values({ ...data, caseworkerId, createdBy });
}

export async function updateConversation(
  id: string,
  formData: ConversationFormData
) {
  const data = conversationFormSchema.parse(formData);
  const session = await verifySession();
  const caseworkerId = session.user.id;

  await db
    .update(conversations)
    .set({ ...data, caseworkerId })
    .where(
      and(
        eq(conversations.id, id),
        eq(conversations.caseworkerId, caseworkerId)
      )
    );
}

export async function deleteConversation(id: string) {
  const session = await verifySession();
  const caseworkerId = session.user.id;

  await db
    .delete(conversations)
    .where(
      and(
        eq(conversations.id, id),
        eq(conversations.caseworkerId, caseworkerId)
      )
    );
}
