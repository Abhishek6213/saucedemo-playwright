const { expect } = require('@playwright/test');
class CartPage {
    constructor(page) {
        this.page = page;
        this.cartCount = page.locator("a[class='shopping_cart_link'] span");

        this.cart = page.locator("a[class='shopping_cart_link']");
        this.backToShopping = page.locator("button[class='btn btn_secondary back btn_medium']");
        this.checkout = page.locator("button[class='btn btn_action btn_medium checkout_button']");
        this.removeFromCart = page.locator("button[class='btn btn_secondary btn_small cart_button']");
    }

    /**
     * @function navigateToCart - On an Inventory list page validate a user can click on Cart
     */
    async navigateToCart() {
        expect(await this.cart, 'Cart icon is not visible on ribbon').toBeVisible();
        await this.cart.click();
        expect(this.page, 'On click of Cart icon user is not navigating to Cart Page').toHaveURL(/.*cart.html/);
    }

    /**
     * @function validateBackToShopping - On Cart page validate a user can click on Back to Shopping button
     */
    async validateBackToShopping() {
        expect(await this.backToShopping, 'Back to Shopping button on Cart Page is not visible').toBeVisible();
        await this.backToShopping.click();
        expect(this.page, 'Back to Shopping button on Cart Page is not navigating back to Inventory List Page').toHaveURL(/.*inventory.html/);
    }

    /**
     * @function validateCheckoutNotVisibleForEmptyCart - On Cart page validate a user cannot see Checkout button if Cart is empty
     */
    async validateCheckoutNotVisibleForEmptyCart() {
        expect(await this.checkout, 'Checkout Button on Cart Page is not hidden even when there are no items in Cart').toBeHidden();
    }

    /**
     * @function validateRemoveButton - On Cart page validate a user can perform Remove from Cart action
     */
    async validateRemoveButton() {
        expect(await this.removeFromCart, '"Remove" button on Cart Page is not visible').toBeVisible();
        await this.removeFromCart.click();
        await expect(this.cartCount, '"Remove" button on Cart Page is not removing item from Cart').toHaveCount(0); // As element gets removed from DOM if item count is 0 in cart
    }

    /**
     * @function validateCheckoutButton - On Cart page validate a user can perform Checkout action when an item is added to Cart
     */
    async validateCheckoutButton() {
        await this.checkout.click();
        expect(this.page, 'On click of "Checkout" button on Cart Page, User is not getting navigated back to checkout-step-on Page').toHaveURL(
            /.*checkout-step-one.html/
        );
    }
}

module.exports = { CartPage };
