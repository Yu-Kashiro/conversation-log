import { ConversationCard } from "@/components/conversation-card";
import { Conversation } from "@/types/conversation";

export default function ConversationsPage() {
  const mockConversations: Conversation[] = [
    {
      id: "1",
      targetPerson: "John Doe",
      caseworkerId: "caseworker1",
      consultationDate: new Date("2023-03-15"),
      contactMethod: "email",
      content: "I need help with my application.",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "caseworker1",
      updatedBy: null,
      deletedAt: null,
    },
    {
      id: "2",
      targetPerson: "Jane Smith",
      caseworkerId: "caseworker2",
      consultationDate: new Date("2023-03-16"),
      contactMethod: "phone",
      content: "I have a question about my benefits.",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "caseworker2",
      updatedBy: null,
      deletedAt: null,
    },
    {
      id: "3",
      targetPerson: "Jane Smith",
      caseworkerId: "caseworker2",
      consultationDate: new Date("2023-03-16"),
      contactMethod: "phone",
      content: "I have a question about my benefits.",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "caseworker2",
      updatedBy: null,
      deletedAt: null,
    },
  ];

  return (
    <div className="container py-10">
      <h1 className="font-bold text-2xl mb-6">相談記録</h1>
      <div className="grid grid-cols-3 gap-4">
        {mockConversations.map((conversation) => (
          <div key={conversation.id}>
            <ConversationCard conversation={conversation} />
          </div>
        ))}
      </div>
    </div>
  );
}
