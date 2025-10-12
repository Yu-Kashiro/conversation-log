import { User } from "@/types/user";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function UserCard({ user }: { user: User }) {
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </CardHeader>
      <CardContent>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription className="break-all">{user.email}</CardDescription>
      </CardContent>
    </Card>
  );
}
