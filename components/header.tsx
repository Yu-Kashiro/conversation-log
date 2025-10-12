import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          ConversationLog
        </Link>
        <nav>
          <Link
            href="/mypage"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            My Page
          </Link>
        </nav>
      </div>
    </header>
  );
}