import { test, expect } from "@playwright/test";

test("ログインページが正しく表示される", async ({ page }) => {
  // ログインページにアクセス
  await page.goto("/login");

  await expect(page).toHaveTitle(/ログイン/);

  // ページタイトルの確認
  await expect(page.getByRole("heading", { name: "ようこそ" })).toBeVisible();

  // 説明文の確認
  await expect(
    page.getByText("ゲストとしてログインしてください")
  ).toBeVisible();

  // ゲストログインボタンの確認
  await expect(
    page.getByRole("button", { name: "ゲストでログイン" })
  ).toBeVisible();
});

test("ログインフォームのレイアウトが正しい", async ({ page }) => {
  await page.goto("/login");

  // カードコンポーネントが存在することを確認
  const card = page.locator(".overflow-hidden");
  await expect(card).toBeVisible();

  // フォームが存在することを確認
  const form = page.locator("form");
  await expect(form).toBeVisible();
});

test("ゲストログインボタンが有効である", async ({ page }) => {
  await page.goto("/login");

  const loginButton = page.getByRole("button", { name: "ゲストでログイン" });

  // ボタンが有効であることを確認
  await expect(loginButton).toBeEnabled();
});

test("ゲストログインが成功してマイページに遷移する", async ({ page }) => {
  await page.goto("/login");

  // ゲストログインボタンをクリック
  await page.getByRole("button", { name: "ゲストでログイン" }).click();

  // マイページへリダイレクトされることを確認
  await expect(page).toHaveURL("/mypage", { timeout: 10000 });

  await expect(
    page.getByRole("heading", { name: "My Page"})
  ).toBeVisible();
});
