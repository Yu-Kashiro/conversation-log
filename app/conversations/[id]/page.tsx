import { ConversationCard } from "@/components/conversation-card";
import { getConversation } from "@/data/conversations";
import { notFound } from "next/navigation";

export default async function ConversationPage({ params }: PageProps<"/conversations/[id]">) {
  const conversationId = (await params).id;
  const conversation = await getConversation(conversationId);

  if (!conversation) {
    notFound();
  }

  return (
    <div className="container py-6">
      <h1 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">記録詳細</h1>
      <ConversationCard conversation={conversation} />
    </div>
  );
}