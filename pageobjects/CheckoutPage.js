const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cancel = page.locator("button[class='btn btn_secondary back btn_medium cart_cancel_link']");
        this.continue = page.locator("input[class='submit-button btn btn_primary cart_button btn_action']");

        this.firstName = page.locator("input[name='firstName']");
        this.lastName = page.locator("input[name='lastName']");
        this.postalCode = page.locator("input[name='postalCode']");

        this.checkoutItems = page.locator("div[class='cart_item']");
        this.itemTotal = page.locator("div[class='summary_subtotal_label']");
        this.tax = page.locator("div[class='summary_tax_label']");
        this.total = page.locator("div[class='summary_total_label']");
        this.finish = page.locator("button[class='btn btn_action btn_medium cart_button']");
        this.backHome = page.locator("button[class='btn btn_primary btn_small']");

        this.errorMsg = page.locator("div[class='error-message-container error'] h3");
        this.firstNameError = 'Error: First Name is required';
        this.lastNameError = 'Error: Last Name is required';
        this.postalCodeError = 'Error: Postal Code is required';
    }

    /**
     * @function validateCancelOnCheckOutStepOne - On Checkout Step One page validate a user can click on Cancel and go back to Cart Page
     */
    async validateCancelOnCheckOutStepOne() {
        expect(await this.cancel, 'Cancel button is not visible on Checkout Step One page').toBeVisible();
        await this.cancel.click();
        expect(this.page, 'On click of Cancel button on Checkout Step One page, user is not navigating back to Cart Page').toHaveURL(/.*cart.html/);
    }

    /**
     * @function validateContinueOnCheckOutStepOne - On Checkout Step One page validate a user can click on Continue and it gives error if personal information is missing
     * @param {String} firstName : First Name in personal information on Checkout step One Page
     * @param {String} lastName : Last Name in personal information on Checkout step One Page
     * @param {String} postalCode : Postal Code in personal information on Checkout step One Page
     */
    async validateContinueOnCheckOutStepOne(firstName, lastName, postalCode) {
        expect(await this.continue, 'Continue button is not visible on Checkout Step One page').toBeVisible();

        //First Name error message validation
        await this.continue.click();
        var msg = await this.errorMsg.innerText();
        expect(msg, 'On click of Continue button on Checkout Step One page, user is not getting error message if First Name is missing').toContain(
            this.firstNameError
        );

        //Last Name error message validation
        await this.firstName.type(firstName);
        await this.continue.click();
        msg = await this.errorMsg.innerText();
        expect(msg, 'On click of Continue button on Checkout Step One page, user is not getting error message if Last Name is missing').toContain(
            this.lastNameError
        );

        //Zip or Postal Code error message validation
        await this.lastName.type(lastName);
        await this.continue.click();
        msg = await this.errorMsg.innerText();
        expect(msg, 'On click of Continue button on Checkout Step One page, user is not getting error message if Postal Code is missing').toContain(
            this.postalCodeError
        );

        //Enter all personal information and click Contine
        await this.postalCode.type(postalCode);
        await this.continue.click();
        expect(this.page, 'On click of Continue button on Checkout Step One page, user is not navigating to Checkout Step Two Page').toHaveURL(
            /.*checkout-step-two.html/
        );
    }

    /**
     * @function validateCancelOnCheckOutStepTwo - On Checkout Step Two page validate a user can click on Cancel and go back to Inventory List Page
     */
    async validateCancelOnCheckOutStepTwo() {
        expect(await this.cancel, 'Cancel button is not visible on Checkout Step Two page').toBeVisible();
        await this.cancel.click();
        expect(this.page, 'On click of Cancel button on Checkout Step Two page, user is not navigating back to Inventory List Page').toHaveURL(
            /.*inventory.html/
        );
    }

    /**
     * @function validateCheckoutItemsStepTwo - On Checkout Step Two page validate Items and the total
     * @param {Integer} itemCount : Number of items that should be present on Checkout Step Two Page
     */
    async validateCheckoutItemsStepTwo(itemCount) {
        expect(await this.checkoutItems, 'Expected number of items are not present on Checkout Step Two page').toHaveCount(itemCount);

        // Add the price of all individual items on Checkout Step Two Page and verify it against "Item Total" value on Checkout Step Two Page
        const count = await this.checkoutItems.count();
        var actualItemTotal = 0;
        for (let i = 0; i < count; i++) {
            var itemText = await this.checkoutItems.nth(i).innerText();
            var itemCost = parseFloat(itemText.split('$')[1]);
            actualItemTotal = actualItemTotal + itemCost;
        }

        var expectedItemTotalText = await this.itemTotal.innerText();
        var expectedItemTotal = parseFloat(expectedItemTotalText.split('$')[1]);
        expect(
            actualItemTotal == expectedItemTotal,
            'Actual total of Items is not equal to "Item Total" amount mentioned on Checkout Step Two Page'
        ).toBeTruthy();

        //Get Tax amount from Checkout Step Two Page
        var taxText = await this.tax.innerText();
        var taxCost = parseFloat(taxText.split('$')[1]);

        //Calculate Actual Total and verify it with "Total" mentioned on Checkout Step Two Page
        var actualTotal = actualItemTotal + taxCost;
        var totalText = await this.total.innerText();
        var expectedTotal = parseFloat(totalText.split('$')[1]);
        expect(
            actualTotal == expectedTotal,
            'Actual total including Tax is not equal to "Total" amount mentioned on Checkout Step Two Page'
        ).toBeTruthy();
    }

    /**
     * @function clickOnFinishandValidateBackHomeButton - Validate Finish button, click on it and Validate Back Home button redirects to Home page
     */
    async clickOnFinishandValidateBackHomeButton() {
        //Click on "Finish"
        expect(await this.finish, 'Finish button is not visible on Checkout Step Two page').toBeVisible();
        await this.finish.click();
        expect(this.page, 'On click of Finish button on Checkout Step Two page, user is not navigating back to Checkout Complete Page').toHaveURL(
            /.*checkout-complete.html/
        );

        //On Checkout Complete Page click on Back Home button
        expect(await this.backHome, 'Back Home button is not visible on Checkout Complete page').toBeVisible();
        await this.backHome.click();
        expect(this.page, 'On click of Back Home button on Checkout Complete page, user is not navigating back to Home Page').toHaveURL(
            /.*inventory.html/
        );
    }
}

module.exports = { CheckoutPage };
