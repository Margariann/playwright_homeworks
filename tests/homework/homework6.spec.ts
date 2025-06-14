
// import { test, expect } from '@playwright/test';

// test('Search Apple Watch, sort by descending price', async ({ page }) => {
//     await page.goto('https://zigzag.am');
//     await page.locator('#search').fill('Apple watch');
//     await page.locator('#search').press('Enter');
//     await page.locator('button:has(div.filter-option-inner-inner)').click();
//     await page.locator('a[role="option"].dropdown-item').nth(1).click();
//     await page.waitForTimeout(2000);

//     const products = await page.$$eval('ol.grid_list > li', items =>
//         items.map(item => {
//             const title = item.querySelector('.product_name')?.textContent?.trim() || '';
//             const priceText = item.querySelector('.current_price')?.textContent || '';
//             const price = Number(priceText.replace(/[^\d]/g, ''));
//             return { title, price };
//         })
//     );
//     console.log('Total products found:', products.length);
//     console.log('Most expensive:', products[0]);
//     console.log('Products and prices:', products);

//     for (let i = 0; i < products.length; i++) {
//         expect(products[i].title).not.toBe('');
//         expect(products[i].price).toBeGreaterThan(0);

//         if (i > 0) {
//             expect(products[i].price).toBeLessThanOrEqual(products[i - 1].price);
//         }
//     }
// });




// import { test, expect } from '@playwright/test';

// test('Search Dyson and sort by ascending price', async ({ page }) => {
//     await page.goto('https://zigzag.am');
//     await page.locator('#search').fill('Dysons');
//     await page.locator('#search').press('Enter');
//     await page.locator('button:has(div.filter-option-inner-inner)').click();
//     await page.locator('a[role="option"].dropdown-item').nth(2).click();
//     await page.waitForTimeout(2000);

//     const productElements = await page.$$('ol.grid_list > li');
//     const products: { title: string; price: number }[] = [];

//     for (const item of productElements) {
//         const titleElement = await item.$('.product_name');
//         const priceElement = await item.$('.current_price');

//         const title = (await titleElement?.textContent())?.trim() || '';
//         const priceText = (await priceElement?.textContent()) || '';
//         const price = Number(priceText.replace(/[^\d]/g, ''));

//         products.push({ title, price });
//     }

//     console.log('Total products found:', products.length);
//     console.log('Lowest price product:', products[0]);
//     console.log('Products and prices:', products);

//     for (let i = 0; i < products.length; i++) {
//         expect(products[i].title).not.toBe('');
//         expect(products[i].price).toBeGreaterThan(0);
//         if (i > 0) {
//             expect(products[i].price).toBeGreaterThanOrEqual(products[i - 1].price);
//         }
//     }
// });



import { test, expect } from '@playwright/test';
test('Order the Phone', async ({ page }) => {
    await page.goto('https://zigzag.am');
    await page.locator('#search').fill('Phone');
    await page.locator('#search').press('Enter');
    const phone = page.locator('.product_block').first();
    await phone.hover();
    const add = phone.locator('.action.tocart').first();
    await add.click();
    const modal = page.locator(".mpquickcart-block");
    await expect(modal).toBeVisible();
    await modal.locator('text=Nothing Phone (2A) Plus');
    await page.locator('#top-cart-btn-checkout').click();
    await expect(page).toHaveURL(/checkout/);
    await page.locator('.input-field._with-tooltip #customer-email').click();
    await page.fill('#customer-email', 'anna@gmail.com');
    await page.locator('#shipping-new-address-form input[name="firstname"]').click();
    await page.locator('#shipping-new-address-form input[name="firstname"]').fill('Աննա');
    await page.locator('#shipping-new-address-form input[name="lastname"]').click();
    await page.locator('#shipping-new-address-form input[name="lastname"]').fill('Մարգարյան');
    const region = page.locator('div.field[name="shippingAddress.region_id"]');
    await region.locator('button.dropdown-toggle').click();
    await region.locator('div.dropdown-menu >> text=Երևան').click();
    await page.locator('#shipping-new-address-form input[name="street[0]"]').click();
    await page.fill('#shipping-new-address-form input[name="street[0]"]', 'Տիգրան Մեծ 10');
    await page.locator('#telephone_fake').click();
    await page.locator('#telephone_fake').fill('77070707');
    await page.locator('.birth_day .dropdown-toggle').click();
    await page.locator('.birth_day .dropdown-menu .dropdown-item', { hasText: '11' }).click();
    await page.locator('.birth_month .dropdown-toggle').click();
    await page.locator('.birth_month .dropdown-menu .dropdown-item', { hasText: '7' }).click();
    await page.locator('.birth_year .dropdown-toggle').click();
    await page.locator('.birth_year .dropdown-menu .dropdown-item', { hasText: '1998' }).click();
    await page.locator('label[data-id="Ordinary"]').click();
    await expect(page.locator('label[data-id="Ordinary"]')).toBeChecked();
    await page.locator('button.validate_btn.checkout_submit').click();
    await expect(page).toHaveURL(/success/);
    await expect(page.locator('.thanks_word')).toHaveText(/Շնորհակալություն/);
});


