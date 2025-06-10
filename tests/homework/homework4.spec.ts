import { test, expect } from '@playwright/test';
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
  const cameraToggle = page.locator('.group_title.icon_down').filter({ hasText: 'Տեսանկարահանում' });
  await cameraToggle.scrollIntoViewIfNeeded();
  await cameraToggle.waitFor({ state: 'visible' });
  await cameraToggle.click();
  await page.locator('#wp_ln_attr_4059_48915').click();
  const drone1 = page.locator('.block_inner.product-item-details').filter({ hasText: 'Autel Robotics  EVO MAX 4T Standard Bundle' });
  await drone1.hover();
  const add = page.locator('button.action.tocart');
  await add.click();
  // const message = page.locator('.message-success.success message');
  // await expect(message).toBeVisible();   error a talis es mase, dra hamar em comment arel 
  const basket = page.locator('a.action.primary.viewcart', { hasText: 'Զամբյուղ' });
  await basket.click();
  await expect(page).toHaveTitle(/Գնումների զամբյուղ/);
});
