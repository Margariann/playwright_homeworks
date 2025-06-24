import { test, expect } from '@playwright/test';
import { Console } from 'console';
test.beforeEach(async ({ page }) => {
    await page.goto('https://zigzag.am');
});


test('Check that all product categories contain "Apple watch"', async ({ page }) => {
    await page.locator('#search').fill('Apple watch');
    await page.locator('#search').press('Enter');
    await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Apple+watch');
    const title = page.locator('.section_title');
    await expect(title).toBeVisible();
    // Գտնել բոլոր կատեգորիաների անունները
    const appleWatch = page.locator('.product_category');
    const count = await appleWatch.count();
    //  Գտնել կատեգորիաներ, որտեղ չկարողացանք գտնել "Apple watch"
    let foundMismatch = false;

    for (let i = 0; i < count; i++) {
        const text = await appleWatch.nth(i).innerText();
        if (!text.toLowerCase().includes('apple watch')) {
            console.log(`Category №${i + 1} does not contain 'Apple watch': "${text}"`);
            foundMismatch = true;
        }
    }
    if (!foundMismatch) {
        console.log('All categories contain "Apple watch"');
    }
});


test('Autocomplete suggestions contain "TV" when typing TV', async ({ page }) => {
    await page.locator('#search').fill('TV');
    // Սպասել, որ առաջարկներից առաջինը երևա
    const suggestions = page.locator('.qs-option-name');
    await suggestions.first().waitFor({ state: 'visible' });
    // ստուգել քանակը
    const count = await suggestions.count();
    console.log(`Count of suggestions: ${count}`);
    expect(count).toBeGreaterThan(0);
    //Ստւգել որ առաջարկները պարունակում են "TV" բառը
    for (let i = 0; i < count; i++) {
        const text = (await suggestions.nth(i).innerText()).toLowerCase();
        console.log(`${text}`);
        expect(text).toContain('tv');
    }
});




test('Search functionality:Partial word', async ({ page }) => {
    await page.locator('#search').fill('հեռուստ');
    await page.locator('#search').press('Enter');
    // Սպասել, որ հայտնվի "Արդյունք չի գտնվել" հաղորդագրությունը
    await expect(page.locator('text=Արդյունք չի գտնվել')).toBeVisible();
    console.log('No direct results found for "հեռուստ"');
    // Ստանալ առաջարկվող տարբերակները
    const relatedTerms = page.locator('.block .item');
    const count = await relatedTerms.count();
    console.log(`Found ${count} related search terms:`);
    // Տպել դրանք
    for (let i = 0; i < count; i++) {
        const text = await relatedTerms.nth(i).innerText();
        console.log(`${i + 1}: ${text}`);
    }
});


test('Search prints name and price for each result', async ({ page }) => {
    await page.locator('#search').fill('airpods');
    await page.locator('#search').press('Enter');
    await page.waitForTimeout(2000);
    const items = page.locator('.product-item-details');
    await items.first().waitFor({ state: 'visible' });
    // ստանալ itemների քանակը
    const count = await items.count();
    console.log(`Found ${count} result items:`);
    expect(count).toBeGreaterThan(0);
    // մաքրելու տեքստը
    function cleanText(text: string): string {
        return text.trim().replace(/\s+/g, ' ');
    }
    // տպել բոլոր արդյունքները կոնսոլում՝ անունով ու գին
    for (let i = 0; i < count; i++) {
        const product = items.nth(i);
        const name = cleanText(await product.locator('.product_name').textContent() ?? '');
        const price = cleanText(await product.locator('.current_price').textContent() ?? '');
        console.log(`Item ${i + 1}: ${name} — ${price}`);
    }
});


