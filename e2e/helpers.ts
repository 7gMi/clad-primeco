import { type Page } from '@playwright/test';

/** Click a nav link — handles desktop (visible nav) and mobile (hamburger menu). */
export async function clickNavLink(page: Page, label: string) {
  const isMobile = (page.viewportSize()?.width ?? 1280) < 768;

  if (isMobile) {
    const hamburger = page.getByLabel(/open menu/i);
    await hamburger.click();
    await page.waitForTimeout(400);
    const mobileNav = page.locator('#mobile-menu');
    await mobileNav.getByRole('link', { name: label }).click();
  } else {
    await page.getByRole('link', { name: label }).first().click();
  }

  await page.waitForLoadState('networkidle');
}

/** Wait for page to be fully loaded. */
export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
}
