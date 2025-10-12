export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-3">
          <a href="/mypage" className="hover:text-foreground transition-colors">
            マイページ
          </a>
          <a href="/credit" className="hover:text-foreground transition-colors">
            クレジット
          </a>
          <a href="/pet" className="hover:text-foreground transition-colors">
            ペット
          </a>
        </nav>
        <p className="text-center text-sm text-muted-foreground">
          © 2024 Taro App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
