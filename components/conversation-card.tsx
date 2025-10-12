import { Conversation } from "@/types/conversation";
import { Card, CardContent } from "./ui/card";

export function ConversationCard({
  conversation,
}: {
  conversation: Conversation;
}) {
  return (
    <Card className="w-full">
      <CardContent>
        <h1 className="text-lg font-bold">{conversation.targetPerson}</h1>
        <p className="text-muted-foreground">
          担当者: {conversation.caseworkerId}
        </p>
        <p className="text-sm text-muted-foreground">
          相談日: {new Date(conversation.consultationDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-muted-foreground">
          連絡方法: {conversation.contactMethod}
        </p>
        <p className="text-sm text-muted-foreground">{conversation.content}</p>
      </CardContent>
    </Card>
  );
}
