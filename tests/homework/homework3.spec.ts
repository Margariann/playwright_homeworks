// import { test, expect } from '@playwright/test';
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




import { test, expect } from '@playwright/test';

// test('Search laptop and add to cart', async ({ page }) => {
// await page.goto('https://www.zigzag.am/');
// await page.locator('#search').fill('Laptop');
// await page.locator('#search').press('Enter');
// const productCards = page.locator('.product-item');
// const laptopsWithPrice210k = productCards.filter({
//   has: page.locator('.price', { hasText: '210,000'})
// });
// const productLink = page.getByText('HP Laptop 15.6" i3-1315U 8/512 Black /9B018EA');
// await productLink.scrollIntoViewIfNeeded();
// await expect(productLink).toBeVisible();
// await productLink.click();
// await expect(page).toHaveURL(/hp-laptop-15-6-i3-1315u-8-512-black-9b018ea/);
// await page.locator('#product-addtocart-button').click();
// await page.locator('.product-item-pricing .button-action.plus').click();
// const alert = page.locator('.message-success.success.message');
// await expect(alert).toBeVisible();
// await page.locator('#top-cart-btn-checkout').click();
// await expect(page).toHaveURL(/checkout/);
// });


test('Drones', async ({ page }) => {
await page.goto('https://www.zigzag.am/');
await page.locator('.catalog_btn').click();
const games = page.locator('.full_list .list_content .category_name', { hasText: 'Խաղեր, ծրագրեր, զվարճանք' });
await games.hover();
const dronesListItems = page.locator('.submenu_block.menu_5 ul li').filter({
  has: page.locator('a', { hasText: 'Դրոններ' }),
});
const dronesLink = dronesListItems.locator('a[href="https://www.zigzag.am/am/games-soft-entertainment/drones/drones.html"]');
await dronesLink.click();
const cameraToggle = page.locator('.group_title.icon_down').filter({ hasText: 'Տեսանկարահանում'});
await cameraToggle.scrollIntoViewIfNeeded();        
await cameraToggle.waitFor({ state: 'visible' });  
await cameraToggle.click();                         
await page.locator('#wp_ln_attr_4059_48915').click();
const drone1= page.locator('.block_inner.product-item-details').filter({hasText: 'Autel Robotics  EVO MAX 4T Standard Bundle'});                         
await drone1.hover();
const add = page.locator('button.action.tocart');
await add.click();

// const message = page.locator('.message-success.success message');
// await expect(message).toBeVisible();
const basket = page.locator('a.action.primary.viewcart', { hasText: 'Զամբյուղ' });
await basket.click();
});


// await page.getByText('Autel Robotics  EVO MAX 4T Standard Bundle').click();

// });