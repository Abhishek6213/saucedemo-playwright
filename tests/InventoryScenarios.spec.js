const { test, expect } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../utils/LoginTestData.json')));
const { POManager } = require('../pageobjects/POManager');

for (const data of dataset) {
    test.beforeEach(async ({ page }, testInfo) => {
        const poManager = new POManager(page);
        await poManager.getLoginPage().validlogin(data.Username, data.password, data.validationMessage);
    });

    test(`Validate Number of Items present in Inventory for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().validateTotalNumberOfItems(6);
    });

    test(`Validate Add items to the cart for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
    });

    test(`Validate Remove items from the cart for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', false);
    });

    test(`Validate Sort functionality on Inventory page for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);

        await poManager.getInventoryPage().sortInventoryAlphabetically('az');
        await poManager.getInventoryPage().sortInventoryAlphabetically('za');
        await poManager.getInventoryPage().sortInventoryByPrice('lohi');
        await poManager.getInventoryPage().sortInventoryByPrice('hilo');
    });

    test(`Validate item is same on Inventory page and Inventory item detail page for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().navigateToInventoryDetail('Sauce Labs Bike Light');
    });

    test(`Validate item can be added to cart from Inventory item detail page for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().navigateToInventoryDetail('Sauce Labs Bike Light');
        await poManager.getInventoryPage().validateAddToCartOnItemDetails();
    });

    test(`Validate item can be Removed from cart from Inventory item detail page for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().navigateToInventoryDetail('Sauce Labs Bike Light');
        await poManager.getInventoryPage().validateAddToCartOnItemDetails();
        await poManager.getInventoryPage().validateRemoveFromCartOnItemDetails();
    });

    test(`Validate BACK TO PRODUCTS functionality on Inventory item detail page for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().navigateToInventoryDetail('Sauce Labs Bike Light');
        await poManager.getInventoryPage().validateAddToCartOnItemDetails();
        await poManager.getInventoryPage().validateRemoveFromCartOnItemDetails();
        await poManager.getInventoryPage().validateBackToProductOnItemDetails();
    });
}
