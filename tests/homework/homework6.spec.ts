
//sort by Descending

// import { test, expect } from '@playwright/test';
test('Search Apple Watch, sort by descending price', async ({ page }) => {
    await page.goto('https://zigzag.am');
    await page.locator('#search').fill('Apple watch');
    await page.locator('#search').press('Enter');
    //Դասավորել նվազման կարգով
    await page.locator('button:has(div.filter-option-inner-inner)').click();
    await page.locator('a[role="option"].dropdown-item').nth(1).click();
    await page.waitForTimeout(2000);
    //Ապրանքները ըստ անվան ու գնի առանձնացնի
    const products = await page.$$eval('ol.grid_list > li', items =>
        items.map(item => {
            const title = item.querySelector('.product_name')?.textContent?.trim() || '';
            const priceText = item.querySelector('.current_price')?.textContent || '';
            const price = Number(priceText.replace(/[^\d]/g, ''));
            return { title, price };
        })
    );
    //Տպի ընդհանուր թիվը, ամենաթանկը, ու ապրանքների անունը ու գները
    console.log('Total products found:', products.length);
    console.log('Most expensive:', products[0]);
    console.log('Products and prices:', products);
    //Վերցնումա բոլոր ապրանքները ու ստուգում ա որ ունենան անուն ու 0-ից բարձր գին
    for (let i = 0; i < products.length - 1; i++) {
        expect(products[i].title).not.toBe('');
        expect(products[i].price).toBeGreaterThan(0);
        //Ստուգում ենք  որ ամեն հաջորդ ապրանքը նախորդից ցածր գնով կամ հավասար լինի
        if (i > 0) {
            expect(products[i + 1].price).toBeLessThanOrEqual(products[i].price);
        }
    }
});



// sort by Ascending


// import { test, expect } from '@playwright/test';
test('Search Dyson and sort by ascending price', async ({ page }) => {
    await page.goto('https://zigzag.am');
    await page.locator('#search').fill('Dysons');
    await page.locator('#search').press('Enter');
    //Դասավորել աճման կարգով
    await page.locator('button:has(div.filter-option-inner-inner)').click();
    await page.locator('a[role="option"].dropdown-item').nth(2).click();
    await page.waitForTimeout(2000);
    //Ապրանքները ըստ անվան ու գնի առանձնացնի
    const productElements = await page.$$('ol.grid_list > li');
    const products: { title: string; price: number }[] = [];
    for (const item of productElements) {
        const titleElement = await item.$('.product_name');
        const priceElement = await item.$('.current_price');
        //Ավելացնում ա օբյեկտները զանգվածի մեջ
        const title = (await titleElement?.textContent())?.trim() || '';
        const priceText = (await priceElement?.textContent()) || '';
        const price = Number(priceText.replace(/[^\d]/g, ''));
        products.push({ title, price });
    }
    //Տպի ընդհանուր թիվը, ամենաէժանը, ու ապրանքների անունը ու գները
    console.log('Total products found:', products.length);
    console.log('Lowest price product:', products[0]);
    console.log('Products and prices:', products);
    //Վերցնումա բոլոր ապրանքները ու ստուգում ա որ ունենան անուն ու 0-ից բարձր գին
    for (let i = 0; i < products.length - 1; i++) {
        expect(products[i].title).not.toBe('');
        expect(products[i].price).toBeGreaterThan(0);
        // Ստուգում ենք  որ ամեն հաջորդ ապրանքը նախորդից ցածր գնով կամ հավասար լինի
        if (i > 0) {
            expect(products[i + 1].price).toBeGreaterThanOrEqual(products[i].price);
        }
    }
});



import { test, expect } from '@playwright/test';
test('Order the Phone', async ({ page }) => {
    test.setTimeout(60000);
    // add phone to cart
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
    //email
    await expect(page).toHaveURL(/checkout/);
    await page.locator('.input-field._with-tooltip #customer-email').click();
    await page.fill('#customer-email', 'anna@gmail.com');
    //name
    await page.locator('#shipping-new-address-form input[name="firstname"]').click();
    await page.locator('#shipping-new-address-form input[name="firstname"]').fill('Աննա');
    //lastname
    await page.locator('#shipping-new-address-form input[name="lastname"]').click();
    await page.locator('#shipping-new-address-form input[name="lastname"]').fill('Մարգարյան');
    //region
    const region = page.locator('div.field[name="shippingAddress.region_id"]');
    await region.locator('button.dropdown-toggle').click();
    await region.locator('div.dropdown-menu >> text=Երևան').click();
    //address
    await page.locator('#shipping-new-address-form input[name="street[0]"]').click();
    await page.fill('#shipping-new-address-form input[name="street[0]"]', 'Տիգրան Մեծ 10');
    //phone
    await page.locator('#telephone_fake').click();
    await page.locator('#telephone_fake').fill('77070707');
    //Birtdate
    await page.locator('.birth_day .dropdown-toggle').click();
    await page.locator('.birth_day .dropdown-menu .dropdown-item', { hasText: '11' }).click();
    await page.locator('.birth_month .dropdown-toggle').click();
    await page.locator('.birth_month .dropdown-menu .dropdown-item', { hasText: '7' }).click();
    await page.locator('.birth_year .dropdown-toggle').click();
    await page.locator('.birth_year .dropdown-menu .dropdown-item', { hasText: '1998' }).click();
    //Select shipping type
    await page.locator('label[data-id="Ordinary"]').click();
    await expect(page.locator('label[data-id="Ordinary"]')).toBeChecked();
    //Place an order
    await page.locator('button.validate_btn.checkout_submit').click();
    //Checkout
    await page.waitForURL('https://www.zigzag.am/am/checkout/onepage/success/');
    await expect(page.locator('.thanks_word')).toHaveText(/Շնորհակալություն/);
});


