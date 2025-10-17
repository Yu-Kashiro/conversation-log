import { ConversationCard } from "@/components/conversation-card";
import { getConversations } from "@/data/conversations";
import Link from "next/link";

export default async function ConversationsPage() {
  const conversations = await getConversations();

  return (
    <div className="container py-6">
      <h1 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">相談記録</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            <Link href={`/conversations/${conversation.id}`}>
              <ConversationCard conversation={conversation} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
