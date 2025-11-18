import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const screenshotsDir = path.join(process.cwd(), 'screenshots');

// Utwórz katalog screenshots jeśli nie istnieje
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

test.describe('Testy tras aplikacji', () => {
  test.beforeEach(async ({ page }) => {
    // Przejdź do strony głównej przed każdym testem
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Strona główna - powinna się załadować', async ({ page }) => {
    await expect(page).toHaveTitle(/EduLearn|Next.js/i);
    await page.screenshot({ path: path.join(screenshotsDir, 'home-page.png'), fullPage: true });
  });

  test('Trasa /courses - powinna się załadować', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotsDir, 'courses-page.png'), fullPage: true });
  });

  test('Trasa /library - powinna się załadować', async ({ page }) => {
    await page.goto('/library');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotsDir, 'library-page.png'), fullPage: true });
  });

  test('Trasa /messages - powinna się załadować', async ({ page }) => {
    await page.goto('/messages');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotsDir, 'messages-page.png'), fullPage: true });
  });

  test('Trasa /notifications - powinna się załadować', async ({ page }) => {
    await page.goto('/notifications');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotsDir, 'notifications-page.png'), fullPage: true });
  });

  test('Trasa /progress - powinna się załadować', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    await page.screenshot({ path: path.join(screenshotsDir, 'progress-page.png'), fullPage: true });
  });

  test('Nawigacja przez sidebar - powinna działać', async ({ page }) => {
    // Kliknij w Courses
    await page.click('text=Courses');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/courses/);
    await page.screenshot({ path: path.join(screenshotsDir, 'navigation-courses.png'), fullPage: true });

    // Kliknij w Library
    await page.click('text=My Library');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/library/);
    await page.screenshot({ path: path.join(screenshotsDir, 'navigation-library.png'), fullPage: true });

    // Kliknij w Home
    await page.click('text=Home');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/$/);
    await page.screenshot({ path: path.join(screenshotsDir, 'navigation-home.png'), fullPage: true });
  });
});

