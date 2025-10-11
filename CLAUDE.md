# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際にClaude Code (claude.ai/code)にガイダンスを提供します。

## プロジェクト概要

TypeScript、React 19、Tailwind CSS v4、shadcn/uiコンポーネントを使用したNext.js 15.5.4アプリケーション（App Router使用）。Better Authによる認証、Drizzle ORMとPostgreSQLによるデータベース管理を含み、Supabaseでホスティングされています。

## 開発コマンド

```bash
# 開発サーバーを起動（Turbopack使用）
pnpm dev

# 本番用にビルド（Turbopack使用）
pnpm build

# 本番サーバーを起動
pnpm start

# リンターを実行
pnpm lint

# データベースマイグレーション
npx drizzle-kit generate  # スキーマ変更からマイグレーションを生成
npx drizzle-kit migrate   # データベースにマイグレーションを適用
npx drizzle-kit push      # スキーマを直接データベースにプッシュ（開発環境のみ）
npx drizzle-kit studio    # データベース検査用にDrizzle Studioを開く
```

## アーキテクチャ

### 認証システム

- **フレームワーク**: Better Auth（Drizzleアダプター使用）
- **配置場所**: `lib/auth.ts`がauthインスタンスをエクスポート
- **クライアント**: `lib/auth-client.ts`がクライアント側の認証を担当
- **APIルート**: `app/api/auth/[...all]/route.ts`に認証エンドポイント
- **ミドルウェア**: `middleware.ts`が楽観的リダイレクトでルート保護を処理
- **公開ルート**: `middleware.ts`で定義 - 現在は`/login`、`/register`、`/`
- **プラグイン**: 匿名認証とNext.jsクッキー
- **ID生成**: すべてのデータベースIDにnanoid(10)を使用
- **データベーステーブル**: `db/schemas/auth.ts`に`users`、`sessions`、`accounts`、`verifications`

**重要**: ミドルウェアの認証チェックは安全ではありません - 楽観的リダイレクトのみを実行します。必ず個別のページ/ルートで認証を検証してください。

### データベースアーキテクチャ

- **ORM**: postgres.jsドライバーを使用したDrizzle ORM
- **接続**: `prepare: false`設定の単一postgresクライアント
- **インスタンス**: `db/index.ts`が設定済みのDrizzleインスタンスをエクスポート
- **スキーマ構成**:
  - スキーマは`db/schemas/`でドメイン別に整理
  - 現在は認証テーブル用の`auth.ts`が存在
  - 新しいスキーマファイル追加時は`db/index.ts`でインポートしてスプレッド
- **マイグレーション**: メタ情報と共に`db/migrations/`に保存
- **設定**: `drizzle.config.ts`がスキーマの場所、出力ディレクトリ、データベース認証情報を定義

### UIコンポーネント

- **フレームワーク**: Radix UIプリミティブを使用したshadcn/ui
- **配置場所**: `components/ui/`
- **スタイリング**: `tailwind-merge`と`class-variance-authority`を使用したTailwind CSS v4
- **ユーティリティ**: `lib/utils.ts`に条件付きクラス用の`cn()`ヘルパーを含む
- **設定**: `components.json`がshadcn設定を定義
- **管理**: `npx shadcn@latest add <component-name>`で新しいコンポーネントを追加

### プロジェクト構造

```
app/                    # Next.js App Router
  api/auth/[...all]/   # Better Auth APIルート
  layout.tsx           # Geistフォントを使用したルートレイアウト
  page.tsx             # ホームページ
db/                    # データベース層
  schemas/             # ドメイン別のDrizzleスキーマ
  migrations/          # 生成されたマイグレーション
  index.ts             # データベースインスタンス
lib/                   # 共有ユーティリティ
  auth.ts              # Better Auth設定
  auth-client.ts       # クライアント側認証
  get-base-url.ts      # 環境対応のベースURL
  utils.ts             # UIユーティリティ(cn)
components/ui/         # shadcn/uiコンポーネント
middleware.ts          # ルート保護
```

## コード規約

### コミットメッセージ

- Conventional Commits形式を使用（AGENTS.mdより）
- 例: `feat:`、`fix:`、`chore:`、`docs:`

### サーバーアクション

- GETリクエストにはサーバーアクションを使用しない（AGENTS.mdより）
- サーバーアクションはミューテーション（変更操作）のみに使用

### データベーススキーマの変更

1. `db/schemas/`のスキーマファイルを修正
2. `npx drizzle-kit generate`を実行してマイグレーションを作成
3. `npx drizzle-kit migrate`を実行してデータベースに適用
4. 新しいスキーマファイルを追加する場合は`db/index.ts`でインポート

### 環境変数

必須の変数（`.env`に保存）:
- `DATABASE_URL` - PostgreSQL接続文字列（Supabase）
- Better Authは`getBaseURL()`用に追加の変数が必要な場合があります

## 主要技術

- **Next.js 15.5.4** - App RouterとTurbopack使用
- **React 19.1.0** - React Hook FormとZodバリデーション使用
- **Better Auth 1.3.27** - 認証用
- **Drizzle ORM 0.44.6** - postgres.js経由のPostgreSQL
- **Tailwind CSS 4** - shadcn/uiコンポーネント使用
- **TypeScript 5**
- **Supabase** - データベースホスティング
