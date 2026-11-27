import { expect, test } from "@playwright/test";

const calculators = [
  { path: "/sales-tax-calculator", title: "Sales tax calculator", embed: "sales-tax" },
  { path: "/markup-calculator", title: "Markup calculator", embed: "markup" },
];

test.describe("calculator embed snippet", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  for (const calculator of calculators) {
    test(`${calculator.path} shows and copies the snippet`, async ({ page }) => {
      await page.goto(calculator.path);
      const panel = page.locator("details", { has: page.getByText("Embed this calculator", { exact: true }) });
      const snippet = panel.locator("textarea");
      await expect(snippet).toHaveValue(new RegExp(`<iframe src="https://www\\.biztoolsbox\\.online/embed/${calculator.embed}"`));
      await expect(snippet).toHaveValue(new RegExp(`<a href="https://www\\.biztoolsbox\\.online${calculator.path}">${calculator.title}</a>`));
      const value = await snippet.inputValue();
      expect(value.includes("rel=")).toBe(false);
      await panel.locator("summary").click();
      await expect(snippet).toBeVisible();
      await panel.getByRole("button", { name: "Copy embed code" }).click();
      const normalize = (text: string) => text.replace(/\r\n/g, "\n");
      await expect.poll(() => page.evaluate(() => navigator.clipboard.readText()).then(normalize)).toBe(normalize(value));
    });
  }

  test("embed widget has no site chrome or embed panel", async ({ page }) => {
    await page.goto("/embed/sales-tax");
    await expect(page.getByText("Embed code")).toHaveCount(0);
    await expect(page.locator("header")).toHaveCount(0);
    await expect(page.locator("footer")).toHaveCount(0);
    await expect(page.getByText("Cookie")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Powered by BizToolsBox" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sales tax calculator" })).toBeVisible();
  });
});
