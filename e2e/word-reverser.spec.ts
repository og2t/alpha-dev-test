import { test, expect } from "@playwright/test";

test.describe("Word Reverser", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should display the word reverser interface", async ({ page }) => {
    // Check main components are visible
    await expect(
      page.locator("h2").filter({ hasText: "Word Reverser Tool" })
    ).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
    await expect(
      page.locator("button").filter({ hasText: "Reverse Words" })
    ).toBeVisible();
  });

  test("should reverse simple text", async ({ page }) => {
    const textarea = page.locator("textarea");
    const reverseButton = page
      .locator("button")
      .filter({ hasText: "Reverse Words" });

    // Clear textarea and enter text
    await textarea.clear();
    await textarea.fill("hello world");

    // Click reverse button
    await reverseButton.click();

    // Wait for animation to complete and check the result
    await page.waitForTimeout(2000); // Wait for animation

    // Check that the textarea now contains reversed text
    await expect(textarea).toHaveValue("olleh dlrow");
  });

  test("should reverse text with punctuation", async ({ page }) => {
    const textarea = page.locator("textarea");
    const reverseButton = page
      .locator("button")
      .filter({ hasText: "Reverse Words" });

    await textarea.clear();
    await textarea.fill("Hello, world!");

    await reverseButton.click();
    await page.waitForTimeout(2000);

    await expect(textarea).toHaveValue("olleH, dlrow!");
  });

  test("should reverse multiline text", async ({ page }) => {
    const textarea = page.locator("textarea");
    const reverseButton = page
      .locator("button")
      .filter({ hasText: "Reverse Words" });

    await textarea.clear();
    await textarea.fill("line1\nline2\nline3");

    await reverseButton.click();
    await page.waitForTimeout(2000);

    await expect(textarea).toHaveValue("1enil\n2enil\n3enil");
  });

  test("should disable button while animating", async ({ page }) => {
    const textarea = page.locator("textarea");
    const reverseButton = page
      .locator("button")
      .filter({ hasText: "Reverse Words" });

    await textarea.clear();
    await textarea.fill("test text");

    // Click button
    await reverseButton.click();

    // Wait for button text to change to "Reversing..." (proves it's in progress)
    await expect(
      page.locator("button").filter({ hasText: "Reversing..." })
    ).toBeVisible();

    // At this point button should be disabled
    await expect(
      page.locator("button").filter({ hasText: "Reversing..." })
    ).toBeDisabled();

    // Wait for operation to complete (button text returns to normal)
    await expect(reverseButton).toBeVisible();

    // Button should be enabled again
    await expect(reverseButton).toBeEnabled();
  });

  test("should show animating state", async ({ page }) => {
    const textarea = page.locator("textarea");
    const reverseButton = page
      .locator("button")
      .filter({ hasText: "Reverse Words" });

    await textarea.clear();
    await textarea.fill("test");

    await reverseButton.click();

    // Check for "Reversing..." text during animation
    await expect(
      page.locator("button").filter({ hasText: "Reversing..." })
    ).toBeVisible();

    await page.waitForTimeout(2000);

    // Should go back to normal state
    await expect(reverseButton).toHaveText("Reverse Words");
  });

  test("should not reverse empty text", async ({ page }) => {
    const textarea = page.locator("textarea");
    const reverseButton = page
      .locator("button")
      .filter({ hasText: "Reverse Words" });

    await textarea.clear();

    // Button should be disabled when textarea is empty
    await expect(reverseButton).toBeDisabled();
  });
});
