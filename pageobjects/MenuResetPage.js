const { expect } = require('@playwright/test');
class MenuResetPage {
    constructor(page) {
        this.page = page;
        this.menu = page.locator("div[class='bm-burger-button']");
        this.logout = page.locator("a[id='logout_sidebar_link']");
        this.cartCount = page.locator("a[class='shopping_cart_link'] span");
        this.resetAppState = page.locator("a[id='reset_sidebar_link']");
        this.about = page.locator("a[id='about_sidebar_link']");
    }

    /**
     * @function logoutUser - Logout user from sauce demo
     */
    async logoutUser() {
        await this.menu.click();
        await this.logout.click();
    }

    /**
     * @function validateNumberofItemsInCart - Validate Number of items in the cart after a user re-logins
     */
    async validateNumberofItemsInCart(count) {
        if (count == 0) await expect(this.cartCount, 'No item in the cart but cart count element is still present').toHaveCount(0);
        else await expect(this.cartCount, 'Item is not retained in Cart if a User Logout and Login back again').toContainText(count);
    }

    /**
     * @function validateResetAppState - Verify Reset App State functionality
     */
    async validateResetAppState() {
        await this.menu.click();
        await this.resetAppState.click();
        await expect(this.cartCount, 'Reset App State is not removing items from Cart').toHaveCount(0);
    }

    /**
     * @function validateAboutMenuItem - Verify Reset App State functionality
     */
    async validateAboutMenuItem() {
        await this.menu.click();
        await this.about.click();
        expect(this.page, 'On click of About Menu Item user is not navigating to saucelabs.com').toHaveURL(/.*saucelabs.com/);
    }
}

module.exports = { MenuResetPage };
