import { test, expect } from '@playwright/test';
import { waitForPageReady } from './helpers';

test.describe('Accessibility', () => {
  test('skip-to-content link exists and targets main', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);

    const skipLink = page.getByText('Skip to main content');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    const main = page.locator('#main-content');
    await expect(main).toBeAttached();
  });

  test('skip-to-content link becomes visible on focus', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);

    // Tab to focus the skip link
    await page.keyboard.press('Tab');
    const skipLink = page.getByText('Skip to main content');
    await expect(skipLink).toBeVisible();
  });

  test('all pages have a main landmark', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/projects', '/contact', '/privacy-policy'];
    for (const path of pages) {
      await page.goto(path);
      await waitForPageReady(page);
      const main = page.locator('#main-content');
      await expect(main).toBeAttached();
    }
  });
});

test.describe('Contact form', () => {
  test('contact page has all form fields', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageReady(page);

    await expect(page.locator('#contact-name')).toBeVisible();
    await expect(page.locator('#contact-email')).toBeVisible();
    await expect(page.locator('#contact-phone')).toBeVisible();
    await expect(page.locator('#contact-service')).toBeVisible();
    await expect(page.locator('#contact-message')).toBeVisible();
  });

  test('contact form fields are labeled', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageReady(page);

    // Check labels exist for form fields
    await expect(page.getByLabel(/^name$/i)).toBeVisible();
    await expect(page.getByLabel(/^email$/i)).toBeVisible();
    await expect(page.getByLabel(/^message$/i)).toBeVisible();
  });

  test('contact page has phone and email links', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageReady(page);

    const phoneLink = page.locator('a[href="tel:+353833468913"]').first();
    await expect(phoneLink).toBeAttached();

    const emailLink = page.locator('a[href="mailto:cladprimeco@outlook.com"]').first();
    await expect(emailLink).toBeAttached();
  });

  test('contact form has privacy policy link', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageReady(page);

    // Scroll to form section to make privacy link visible
    await page.locator('#contact-form').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const privacyLink = page.locator('#contact-form').getByRole('link', { name: /privacy policy/i });
    await expect(privacyLink).toBeVisible();
  });
});
