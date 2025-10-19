import { ConversationCard } from "@/components/conversation-card";
import ConversationForm from "@/components/conversation-form";
import { getConversation } from "@/data/conversations";
import { notFound, redirect } from "next/navigation";

export default async function ConversationPage({
  params,
}: PageProps<"/conversations/[id]">) {
  const conversationId = (await params).id;
  const conversation = await getConversation(conversationId);

  if (!conversation) {
    redirect("/conversations");
  }

  return (
    <div className="container py-6 space-y-7">
      <h1 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">記録詳細</h1>
      <ConversationCard conversation={conversation} />
      <ConversationForm
        id={conversation.id}
        defaultValues={{
          targetPerson: conversation.targetPerson,
          content: conversation.content,
          consultationDate: conversation.consultationDate,
          contactMethod: conversation.contactMethod,
        }}
      />
    </div>
  );
}
