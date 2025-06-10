import { test, expect } from '@playwright/test';

test('Wikipedia loads and shows heading', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  var heading = page.getByRole('heading', { name: 'Wikipedia' });
  await expect(heading).toBeVisible();
});



test('Playwright homepage contains expected text', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  // Look for the visible text "In the news"
  var inTheNewsHeader = page.getByText('In the news', { exact: true });
await expect(inTheNewsHeader).toBeVisible();
 });



test('Search Wikipedia using getByLabel', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');

  // search anel  "Search Wikipedia" labelov
  var searchInput = page.getByLabel('Search Wikipedia');

  await searchInput.fill('Playwright');
  await page.keyboard.press('Enter');

  // vernagire parunaki Playwright
  var heading = page.locator('#firstHeading');
  await expect(heading).toHaveText(/Playwright/i);
});




test('Wikipedia search input using id selector', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');

  // Use the unique id selector for the search input
  var searchInput = page.locator('#searchInput');
  await searchInput.fill('Armenia');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/Armenia/);
});






test('Find search input using CSS selector', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');

  var input = page.locator('input#searchInput');
  await input.fill('Playwright');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Playwright');
});




test('Check Wikipedia logo visibility using XPath', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');

  // alt ogtagorcelov gtnel wikii logon
  var logo = page.locator('//img[@alt="Wikipedia"]');
  await expect(logo).toBeVisible();
});




test('Wikipedia search input using placeholder with first()', async ({ page }) => {
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');

  // placeholderi elementneric vercnum a arajine 
  var searchInput = page.getByPlaceholder('Search Wikipedia').first();

  await searchInput.fill('Selenium');
  await expect(searchInput).toHaveValue('Selenium');
});

