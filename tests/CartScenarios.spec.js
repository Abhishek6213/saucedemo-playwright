const { test, expect } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../utils/LoginTestData.json')));
const { POManager } = require('../pageobjects/POManager');

for (const data of dataset) {
    test.beforeEach(async ({ page }, testInfo) => {
        const poManager = new POManager(page);
        await poManager.getLoginPage().validlogin(data.Username, data.password, data.validationMessage);
    });

    test(`Validate Navigation to Cart and CONTINUE SHOPPING button on Cart Page for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateBackToShopping();
    });

    test(`Validate CHECKOUT should not be visible in empty Cart for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateCheckoutNotVisibleForEmptyCart();
    });

    test(`Validate REMOVE item from Cart for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateRemoveButton();
    });

    test(`Validate Checkout for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateCheckoutButton();
    });
}
