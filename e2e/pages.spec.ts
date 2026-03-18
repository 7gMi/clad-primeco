import { test, expect } from '@playwright/test';
import { waitForPageReady } from './helpers';

test.describe('Page content', () => {
  test('Home page has hero section', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
    // Home should have the Get a Quote CTA or hero content
    await expect(page.locator('header')).toBeVisible();
  });

  test('About page renders content', async ({ page }) => {
    await page.goto('/about');
    await waitForPageReady(page);
    await expect(page.locator('main, section').first()).toBeVisible();
  });

  test('Services page renders service cards', async ({ page }) => {
    await page.goto('/services');
    await waitForPageReady(page);
    await expect(page.locator('main, section').first()).toBeVisible();
  });

  test('Projects page renders project gallery', async ({ page }) => {
    await page.goto('/projects');
    await waitForPageReady(page);
    await expect(page.locator('main, section').first()).toBeVisible();
  });

  test('Contact page renders form', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageReady(page);
    // Contact page should have input fields
    const inputs = page.locator('input, textarea');
    await expect(inputs.first()).toBeVisible();
  });

  test('Privacy policy page renders', async ({ page }) => {
    await page.goto('/privacy-policy');
    await waitForPageReady(page);
    await expect(page.locator('main, section').first()).toBeVisible();
  });
});

test.describe('Footer', () => {
  test('footer has creator credit', async ({ page }) => {
    await page.goto('/about');
    await waitForPageReady(page);
    await expect(page.getByText('Mihai Gaina')).toBeVisible();
  });

  test('footer has "Need a website" CTA', async ({ page }) => {
    await page.goto('/about');
    await waitForPageReady(page);
    await expect(page.getByText(/need a website/i)).toBeVisible();
  });

  test('footer creator link points to mihaigaina.dev', async ({ page }) => {
    await page.goto('/about');
    await waitForPageReady(page);
    const creatorLink = page.locator('a[href="https://mihaigaina.dev"]');
    await expect(creatorLink).toBeVisible();
  });
});

test.describe('SEO & meta', () => {
  test('page has correct title', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
    const title = await page.title();
    expect(title).toContain('Clad');
  });

  test('page has meta description', async ({ page }) => {
    await page.goto('/');
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /.+/);
  });

  test('page has meta designer', async ({ page }) => {
    await page.goto('/');
    const designer = page.locator('meta[name="designer"]');
    await expect(designer).toHaveAttribute('content', /Mihai Gaina/);
  });
});
