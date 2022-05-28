const { LoginPage } = require('./LoginPage');
const { MenuResetPage } = require('./MenuResetPage');
const { CartPage } = require('./CartPage');
const { InventoryPage } = require('./InventoryPage');
const { CheckoutPage } = require('./CheckoutPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.menuResetPage = new MenuResetPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.cartPage = new CartPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getInventoryPage() {
        return this.inventoryPage;
    }

    getMenuResetPage() {
        return this.menuResetPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }
}
module.exports = { POManager };
