import { test, expect } from '@playwright/test';
// test('Search for a product and verify product title', async ({ page }) => {
// await page.goto('https://zangakbookstore.am/');
// await page.locator('input.search-string').fill('Տիգրան Մեծ');
// await page.locator('input.search-string').press('Enter');

// const bookImg = page.locator('img[alt="Տիգրան Մեծի հեքիաթը"]');
// await bookImg.click(); 
// const saveButton = page.getByText('Պահպանել');
// await saveButton.click();
// const modal = page.locator('.modal-content .modal-body');
// const closeButton = modal.getByRole('button', { name: 'Close' });
// await closeButton.click();     
// });




test('Search laptop and add to cart', async ({ page }) => {
  await page.goto('https://www.zigzag.am/');
  await page.locator('#search').fill('Laptop');
  await page.locator('#search').press('Enter');
  const productCards = page.locator('.product-item');
  const laptopsWithPrice210k = productCards.filter({
    has: page.locator('.price', { hasText: '210,000' })
  });
  const productLink = page.getByText('HP Laptop 15.6" i3-1315U 8/512 Black /9B018EA');
  await productLink.scrollIntoViewIfNeeded();
  await expect(productLink).toBeVisible();
  await productLink.click();
  await expect(page).toHaveURL(/hp-laptop-15-6-i3-1315u-8-512-black-9b018ea/);
  await page.locator('#product-addtocart-button').click();
  await page.locator('.product-item-pricing .button-action.plus').click();
  const alert = page.locator('.message-success.success.message');
  await expect(alert).toBeVisible();
  await page.locator('#top-cart-btn-checkout').click();
  await expect(page).toHaveURL(/checkout/);
});