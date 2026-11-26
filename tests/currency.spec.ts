import { expect, test, type Page } from "@playwright/test";

function trackConsole(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

test("ArrowDown and Enter select JPY from yen", async ({ page }) => {
  const errors = trackConsole(page);
  await page.goto("/invoice-generator");
  await expect(page.locator("h1")).toHaveCount(1);

  const currency = page.getByRole("combobox", { name: "Currency" });
  await currency.fill("yen");
  await expect(page.getByRole("option", { name: "JPY — Japanese Yen" })).toBeVisible();
  await currency.press("ArrowDown");
  await expect(currency).toHaveAttribute("aria-activedescendant", "currency-option-JPY");
  await expect(page.getByRole("option", { name: "JPY — Japanese Yen" })).toHaveAttribute("aria-selected", "true");
  await currency.press("Enter");

  await expect(currency).toHaveValue("JPY");
  await expect(page.locator(".summary .grand")).toContainText("¥");
  expect(errors).toEqual([]);
});

test("ArrowUp, Escape, and Tab follow the combobox pattern", async ({ page }) => {
  await page.goto("/invoice-generator");
  const currency = page.getByRole("combobox", { name: "Currency" });
  await currency.fill("pound");
  await currency.press("ArrowDown");
  const firstCode = (await page.getByRole("option").nth(0).innerText()).slice(0, 3);
  await currency.press("ArrowDown");
  await expect(page.getByRole("option").nth(1)).toHaveAttribute("aria-selected", "true");
  await currency.press("ArrowUp");
  await expect(page.getByRole("option").nth(0)).toHaveAttribute("aria-selected", "true");
  await currency.press("Escape");
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await expect(currency).toHaveValue("pound");

  await currency.press("ArrowDown");
  await currency.press("Tab");
  await expect(currency).toHaveValue(firstCode);
});

test("an unknown currency disables document actions and keeps the last preview", async ({ page }) => {
  const errors = trackConsole(page);
  await page.goto("/invoice-generator");
  const currency = page.getByRole("combobox", { name: "Currency" });
  await currency.fill("yen");
  await currency.press("ArrowDown");
  await currency.press("Enter");
  await expect(page.locator(".summary .grand")).toContainText("¥");

  await currency.fill("abc");
  await expect(page.getByText("Unknown currency code")).toBeVisible();
  await expect(page.locator(".summary .grand")).toContainText("¥");
  await expect(page.locator(".summary")).not.toContainText("ABC");
  for (const name of ["Download PDF", "Download Word", "Download Excel", "Save on this device", "Create a receipt for this invoice", "Draft a payment reminder"]) {
    const buttons = page.getByRole("button", { name, exact: true });
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) await expect(buttons.nth(index)).toBeDisabled();
  }
  expect(errors).toEqual([]);
});

test("an unknown currency disables the reminder copy action", async ({ page }) => {
  await page.goto("/payment-reminder-generator");
  await page.getByRole("combobox", { name: "Currency" }).fill("abc");
  await expect(page.getByText("Unknown currency code")).toBeVisible();
  const buttons = page.getByRole("button", { name: "Copy email" });
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
  for (let index = 0; index < count; index += 1) await expect(buttons.nth(index)).toBeDisabled();
});

test("the invoice page has one heading and does not scroll sideways", async ({ page }) => {
  const errors = trackConsole(page);
  for (const width of [360, 390, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/invoice-generator");
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
  expect(errors).toEqual([]);
});
