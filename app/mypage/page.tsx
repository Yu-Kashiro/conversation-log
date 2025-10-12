import { UserCard } from "@/components/user-card";
import { verifySession } from "@/lib/session";

export default async function MyPage() {
  const session = await verifySession()

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">My Page</h1>
      <UserCard user={session.user} />
    </div>
  );
}
