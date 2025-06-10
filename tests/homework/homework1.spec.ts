import { test, expect } from '@playwright/test';

test('Wikipedia loads and shows heading', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  var heading = page.getByRole('heading', { name: 'Wikipedia' });
  await expect(heading).toBeVisible();
});



test('Playwright homepage contains expected text', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  var NewsHeader = page.getByText('In the news', { exact: true });
await expect(NewsHeader).toBeVisible();
 });



test('Search Wikipedia using getByLabel', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  var searchInput1 = page.getByLabel('Search Wikipedia');
  await searchInput1.fill('Playwright');
  await page.keyboard.press('Enter');
  var heading1 = page.locator('#firstHeading');
  await expect(heading1).toHaveText(/Playwright/i);
});




test('Wikipedia search input using id selector', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  var search = page.locator('#searchInput');
  await search.fill('Armenia');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/Armenia/);
});






test('Find search input using CSS selector', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  var input6 = page.locator('input#searchInput');
  await input6.fill('Playwright');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Playwright');
});




test('Check Wikipedia logo visibility using XPath', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  var logo = page.locator('//img[@alt="Wikipedia"]');
  await expect(logo).toBeVisible();
});




test('Wikipedia search input using placeholder with first()', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  var searchInput2 = page.getByPlaceholder('Search Wikipedia').first();
  await searchInput2.fill('Selenium');
  await expect(searchInput2).toHaveValue('Selenium');
});

