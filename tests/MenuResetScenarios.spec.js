const { test, expect } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../utils/LoginTestData.json')));
const { POManager } = require('../pageobjects/POManager');

for (const data of dataset) {
    test.beforeEach(async ({ page }, testInfo) => {
        const poManager = new POManager(page);
        await poManager.getLoginPage().validlogin(data.Username, data.password, data.validationMessage);
    });

    test(`Validate Number of Items present in cart remains same when user logout and then login again for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getMenuResetPage().logoutUser();
        await poManager.getLoginPage().validlogin(data.Username, data.password, data.validationMessage);
        await poManager.getMenuResetPage().validateNumberofItemsInCart('1');
    });

    test(`Validate RESET APP STATE for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getMenuResetPage().validateResetAppState();
    });

    test(`Validate ABOUT for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getMenuResetPage().validateAboutMenuItem();
    });
}
