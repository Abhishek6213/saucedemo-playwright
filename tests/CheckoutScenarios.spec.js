const { test, expect } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../utils/LoginTestData.json')));
const { POManager } = require('../pageobjects/POManager');

for (const data of dataset) {
    test.beforeEach(async ({ page }, testInfo) => {
        const poManager = new POManager(page);
        await poManager.getLoginPage().validlogin(data.Username, data.password, data.validationMessage);
    });

    test(`Validate Navigation to Cart Page upon click of CANCEL button on checkout step one for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateCheckoutButton();
        await poManager.getCheckoutPage().validateCancelOnCheckOutStepOne();
    });

    test(`Validate Error Message on checkout step one for missing personal info for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateCheckoutButton();
        await poManager.getCheckoutPage().validateContinueOnCheckOutStepOne('AutoFirstName', 'TestLastName', '12345');
    });

    test(`Validate Navigation to Inventory Page upon click of CANCEL button on checkout step two page for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateCheckoutButton();
        await poManager.getCheckoutPage().validateContinueOnCheckOutStepOne('AutoFirstName', 'TestLastName', '12345');
        await poManager.getCheckoutPage().validateCancelOnCheckOutStepTwo();
    });

    test(`Validate items and Cost of items at checkout step two when multiple items are added to cart for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Fleece Jacket', true, '2');
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateCheckoutButton();
        await poManager.getCheckoutPage().validateContinueOnCheckOutStepOne('AutoFirstName', 'TestLastName', '12345');
        await poManager.getCheckoutPage().validateCheckoutItemsStepTwo(2);
    });

    test(`Validate Complete Checkout and Purchase for ${data.Username}`, async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Bike Light', true);
        await poManager.getInventoryPage().addOrRemoveFromCart('Sauce Labs Fleece Jacket', true, '2');
        await poManager.getCartPage().navigateToCart();
        await poManager.getCartPage().validateCheckoutButton();
        await poManager.getCheckoutPage().validateContinueOnCheckOutStepOne('AutoFirstName', 'TestLastName', '12345');
        await poManager.getCheckoutPage().validateCheckoutItemsStepTwo(2);
        await poManager.getCheckoutPage().clickOnFinishandValidateBackHomeButton();
    });
}
