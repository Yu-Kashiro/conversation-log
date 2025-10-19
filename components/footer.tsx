export function Footer() {
  return (
    <footer className="sticky top-full border-t bg-background">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-3">
          <a href="/credit" className="hover:text-foreground transition-colors">
            クレジット
          </a>
        </nav>
        <p className="text-center text-sm text-muted-foreground">
          © 2025 Conversation Log. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
