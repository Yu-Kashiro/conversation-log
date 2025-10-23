import { User } from "@/types/user";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

export function UserCard({ user }: { user: User }) {
  const avatar = createAvatar(adventurer, {
    seed: user.id,
  });

  const avatarUrl = avatar.toDataUri();

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-16 h-16 border">
          <AvatarImage src={avatarUrl} alt={user.name} />
        </Avatar>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-center">{user.name}</CardTitle>
        <CardDescription className="break-all">{user.email}</CardDescription>
      </CardContent>
    </Card>
  );
}
