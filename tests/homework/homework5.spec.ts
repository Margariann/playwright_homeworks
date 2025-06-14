import { test, expect } from '@playwright/test';
test('Order summary verification', async ({ page }) => {
    await page.goto('https://www.zigzag.am/');
    const menuItem = page.locator('li[data-id="main_menu"] a.submenu_btn[data-sub="menu_1"]').first();
    await menuItem.hover();
    const TV = page.locator('a').filter({ hasText: 'Smart հեռուստացույցներ' });
    await TV.click();
    await expect(page).toHaveURL(/smart-tvs/);
    const smartTv = page.locator('li #product-item-info_44559');
    const smartName = (await smartTv.locator('.product_name').innerText()).trim();
    const smartPrice = (await smartTv.locator('#product-price-44559').innerText()).trim();
    await smartTv.hover();
    const addSmart = smartTv.locator('button.action.tocart');
    await addSmart.click();

    const modal = page.locator(".mpquickcart-block");
    await expect(modal).toBeVisible();

    // const modal = page.locator('#modal-content-40');
    //await expect(modal).toBeVisible();
    const count = modal.locator('.block-title');
    await expect(count).toContainText('1');
    const addProduct = modal.locator('.viewcart');
    await addProduct.click();
    const menuItem2 = page.locator('.level0.nav-3.category-item  a.submenu_btn[data-sub="menu_2"]').first();
    await menuItem2.focus();
    await menuItem2.hover();
    // await expect.soft(menuItem2).toBeVisible();
    const mac = page.locator('li a').filter({ hasText: /MacBook/i });
    await mac.click();
    await expect(page).toHaveURL(/macbook/);

    const pro14 = page.locator('#product-item-info_43527');
    const proName = (await pro14.locator('.product_name').innerText()).trim();
    const proPrice = (await pro14.locator('#product-price-43527').innerText()).trim();
    await pro14.hover();
    const addPro = pro14.locator('button.action.tocart');
    await addPro.click();
    await expect(modal).toBeVisible();
    await expect(count).toContainText('2');
    await addProduct.click();
    const Compare = page.locator('.page_inner');
    await expect.soft(Compare).toContainText(proName);
    await expect.soft(Compare).toContainText(proPrice);
    await expect.soft(Compare).toContainText(smartName);
    await expect.soft(Compare).toContainText(smartPrice);
    function cleanPrice(priceStr: string): number {
        return Number(priceStr.replace(/[^\d]/g, ''));
    }
    const total = cleanPrice(proPrice) + cleanPrice(smartPrice);
    await expect.soft(Compare).toContainText(total.toString());
    const purchase = page.locator('.custom_container .next_step_btn.checkout');
    await purchase.click();
    await expect(page).toHaveURL(/checkout/);
});


// Վահանի գրածը

test('Zigzag.am full e2e flow', async ({ page }) => {
    // 1. Մուտք գործել կայք
    await page.goto('https://zigzag.am');

    var productName_1 = 'Tefal DT9810F0  HAND STEAMER'
    var productName_2 = 'Cougar Defensor Gray F'
    var expectedTotalPrice = '234,900 ֏'

    // 2. Անցնել "Կենցաղային տեխնիկա" tab
    await page.getByText('Կենցաղային տեխնիկա', { exact: false }).first().click();

    // 3. Ընտրել որևէ ապրանք
    const allTab1Products = page.locator('.block_inner.product-item-details');
    const product1 = allTab1Products.filter({ hasText: productName_1 });
    const price1 = await product1.locator('.price').innerText();

    // 4. Կատարել Ավելացնել գործողությունը
    await product1.hover();
    await product1.locator('.add_to_cart').click();

    // 5. Ստուգել որ ավելացել է զամբյուղում
    const basketModal = page.locator(".mpquickcart-block");
    await expect(basketModal).toBeVisible();
    const productItem = basketModal.locator('.minicart-items').filter({ hasText: productName_1 });

    const actualProductName = await productItem.locator('.product-item-name').innerText();
    const actualProductPrice = await productItem.locator('.price-container').innerText();
    const totalPrice = await basketModal.locator('.amount').last().innerText();
    console.log("ProductName: ", actualProductName);
    console.log("ProductPrice: ", actualProductPrice);
    console.log("TotalPrice: ", totalPrice);

    expect.soft(actualProductName).toBe(productName_1);
    expect.soft(actualProductPrice).toBe(price1);
    expect.soft(totalPrice).toBe(price1);

    // 6. Անցնել "Միայն օնլայն" tab
    await page.locator('.modals-overlay').click();
    await page.getByText('Միայն օնլայն', { exact: false }).first().click();

    // 7. Ընտրել որևէ ապրանք
    const allTab2Products = page.locator('.block_inner.product-item-details');
    const product2 = allTab2Products.filter({ hasText: productName_2 });
    const price2 = await product2.locator('.price').innerText();
    console.log("price2 : ", price2);

    // 8. Կատարել Ավելացնել գործողությունը
    await product2.hover();
    await product2.locator('.add_to_cart').click();

    // 9. Ստուգել որ ավելացել է զամբյուղում
    await expect(basketModal).toBeVisible();
    const productItem2 = basketModal.locator('.minicart-items').filter({ hasText: productName_2 });

    const actualProductName2 = await productItem2.locator('.product-item-name').first().innerText();
    const actualProductPrice2 = await productItem2.locator('.price-container').first().innerText();
    const totalPrice2 = await basketModal.locator('.amount').last().innerText();
    console.log("ProductName: ", actualProductName2);
    console.log("ProductPrice: ", actualProductPrice2);
    console.log("TotalPrice: ", totalPrice2);

    expect.soft(actualProductName2).toBe(productName_2);
    expect.soft(actualProductPrice2).toBe(price2);
    expect.soft(totalPrice2).toBe(expectedTotalPrice);

    //10. Կատարել Պատվիրել գործողությունը
    await page.locator('#top-cart-btn-checkout').click();

    //11․ Բացված էջում ստուգել ապրանքների անունները և ընդհանուր գումարը
    var productItemOrder = page.locator('#checkout-review-table').filter({ hasText: productName_1 });

    const actualProduct1NameOrder = await productItemOrder.locator('.product-item-name-block').first().innerText();
    const actualProduct2NameOrder = await productItemOrder.locator('.product-item-name-block').last().innerText();

    const totalPriceOrder = await page.locator('tr.grand.totals .price').innerText();

    console.log("ProductName 1: ", actualProduct1NameOrder);
    console.log("ProductName 2: ", actualProduct2NameOrder);
    console.log("TotalPrice: ", totalPriceOrder);

    expect.soft(actualProduct1NameOrder).toBe(productName_1);
    expect.soft(actualProduct2NameOrder).toBe(productName_2);
    expect.soft(totalPrice2).toBe(expectedTotalPrice);



});











