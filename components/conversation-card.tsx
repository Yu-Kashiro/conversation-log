import { Conversation } from "@/types/conversation";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

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
      <CardFooter>
        <Button asChild>
          <Link href={`/conversations/${conversation.id}`}>
            編集
          </Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
