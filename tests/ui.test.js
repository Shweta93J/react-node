const { test, expect } = require('@playwright/test');

test('Login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#username', 'admin');
  await page.fill('#password', '1234');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('Login with invalid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#username', 'admin');
  await page.fill('#password', 'wrong');
  await page.click('button[type="submit"]');
  await expect(page.locator('.error')).toBeVisible();
});

test('Create, Edit, Delete an item', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#username', 'admin');
  await page.fill('#password', '1234');
  await page.click('button[type="submit"]');

  await page.click('button#new-item');
  await page.fill('input[name="title"]', 'Test Task');
  await page.click('button#save');
  await expect(page.locator('text=Test Task')).toBeVisible();

  await page.click('button.edit');
  await page.fill('input[name="title"]', 'Updated Task');
  await page.click('button#save');
  await expect(page.locator('text=Updated Task')).toBeVisible();

  await page.click('button.delete');
  await expect(page.locator('text=Updated Task')).not.toBeVisible();
});
