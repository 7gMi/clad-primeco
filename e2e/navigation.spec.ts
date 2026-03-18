import { test, expect } from '@playwright/test';
import { clickNavLink, waitForPageReady } from './helpers';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
  });

  test('homepage loads with header and footer', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigate to About page', async ({ page }) => {
    await clickNavLink(page, 'About');
    await expect(page).toHaveURL(/\/about/);
  });

  test('navigate to Services page', async ({ page }) => {
    await clickNavLink(page, 'Services');
    await expect(page).toHaveURL(/\/services/);
  });

  test('navigate to Projects page', async ({ page }) => {
    await clickNavLink(page, 'Projects');
    await expect(page).toHaveURL(/\/projects/);
  });

  test('navigate to Contact page', async ({ page }) => {
    await clickNavLink(page, 'Contact');
    await expect(page).toHaveURL(/\/contact/);
  });

  test('navigate back to Home', async ({ page }) => {
    await clickNavLink(page, 'About');
    await expect(page).toHaveURL(/\/about/);
    await clickNavLink(page, 'Home');
    await expect(page).toHaveURL('/');
  });

  test('404 page for unknown routes', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await waitForPageReady(page);
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page not found')).toBeVisible();
  });

  test('privacy policy link in footer', async ({ page }) => {
    await page.getByRole('link', { name: /privacy policy/i }).click();
    await expect(page).toHaveURL(/\/privacy-policy/);
  });
});

test.describe('Mobile menu', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test.beforeEach(({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'desktop', 'Mobile menu tests only on mobile/tablet');
  });

  test('hamburger opens and closes mobile menu', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);

    const hamburger = page.getByLabel(/open menu/i);
    await hamburger.click();
    await page.waitForTimeout(400);

    const panel = page.locator('#mobile-menu');
    await expect(panel).toHaveAttribute('aria-hidden', 'false');

    // Close via X button
    const closeBtn = page.getByLabel(/close menu/i);
    await closeBtn.click();
    await page.waitForTimeout(400);
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
  });

  test('mobile menu has phone and email links', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);

    const hamburger = page.getByLabel(/open menu/i);
    await hamburger.click();
    await page.waitForTimeout(400);

    await expect(page.locator('#mobile-menu').getByText('083 346 8913')).toBeVisible();
    await expect(page.locator('#mobile-menu').getByText('cladprimeco@outlook.com')).toBeVisible();
  });
});
