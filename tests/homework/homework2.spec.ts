import { test, expect } from '@playwright/test';
test.describe('Login functionality and negative cases', () => {
  var link = 'https://playground.testingart.com/';
  var validEmail = 'testingart@email.com';
  var validPassword = 'Testing!123';

  test.beforeEach(async ({ page }) => {
    await page.goto(link);
  });

  test('Empty email&password ', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('text=Invalid Email or Password')).toBeVisible();
});

  test('Inval email', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid');
    await page.fill('input[name="password"]', validPassword);
    await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('text=Invalid Email or Password')).toBeVisible();
   });

  test('Valid email with wrong password', async ({ page }) => {
    await page.fill('input[name="email"]', validEmail);
    await page.fill('input[name="password"]', 'wrong');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('text=Invalid Email or Password')).toBeVisible();
  }); 


  test('Wrong email with valid password', async ({ page }) => {
    await page.fill('input[name="email"]', 'user@mail.ru');
    await page.fill('input[name="password"]', validPassword);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('text=Invalid Email or Password')).toBeVisible();
  });

  test('Login Functionality', async ({ page }) => {
    await page.fill('input[name="email"]', validEmail);
    await page.fill('input[name="password"]', validPassword);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Welcome')).toBeVisible();
});
});




// test('check search function', async ({ page }) => {
//   await page.goto('https://www.sephora.com/');
// var closeButton = page.locator('.css-1kna575');
// if (await closeButton.isVisible()) {
//   await closeButton.click();
// }
//  await expect(page.locator('#modal2Dialog')).toBeVisible();
// });

