"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


export function Header() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <header className="top-0 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:opacity-80 transition-opacity"
        >
          相談記録管理システム
        </Link>
        <nav className="flex">
          <Button asChild variant="ghost">
            <Link href="/conversations">会話一覧</Link>
          </Button>

          {session?.user && (
            <>
              <Button asChild variant="ghost">
                <Link href="/new">新規登録</Link>
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                ログアウト
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
