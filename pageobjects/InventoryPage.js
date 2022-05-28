const { expect } = require('@playwright/test');
class InventoryPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.locator("div[class='inventory_item_name']");
        this.addToCart = page.locator("button[class='btn btn_primary btn_small btn_inventory']");
        this.removeFromCart = page.locator("button[class='btn btn_secondary btn_small btn_inventory']");
        this.cartCount = page.locator("a[class='shopping_cart_link'] span");
        this.sort = page.locator("select[class*='product_sort_container'] >> visible=true");
        this.price = page.locator("div[class*='inventory_item_price']");

        this.inventoryDetailItemTitle = page.locator("div[class='inventory_details_name large_size']");
        this.backToProducts = page.locator("button[class='btn btn_secondary back btn_large inventory_details_back_button']");

        this.addToCartLabel = 'Add to cart';
        this.removeFromCartLabel = 'Remove';
        this.sortAZ = 'az';
        this.sortZA = 'za';
        this.HighToLow = 'hilo';
        this.LowToHigh = 'lohi';
    }

    /**
     * @function validateTotalNumberOfItems - Get the total number of items in the Inventory
     * @param {Integer} totalNumber : Expected total number of items to be present in Inventory
     */
    async validateTotalNumberOfItems(totalNumber) {
        var totalItems = JSON.stringify(await this.addToCart.allTextContents()).split(',').length;
        await expect(totalItems, 'Total number of items on Inventory List Page is not as expected').toEqual(totalNumber);
    }

    /**
     * @function addOrRemoveFromCart - Add or Remove items in the Cart from the Inventory list Page
     * @param {String} productName : Name of the Product that should be added or removed from the Cart
     * @param {Boolean} isAddToCartAction : If Item needs to be added to Cart then the value is True. For removing item from Cart the value should be False
     * @param {String} numberOfItemsInCart : Number of items to be present in Cart
     */
    async addOrRemoveFromCart(productName, isAddToCartAction, numberOfItemsInCart = '1') {
        var cartCount = await this.cartCount;

        // Verify if the productName exist in the inventory list
        const titlesArr = JSON.stringify(await this.productTitle.allTextContents()).split(',');
        var searchedProductIndex = -1;
        for (let i = 0; i < titlesArr.length; i++) {
            if (titlesArr[i].trim().includes(productName.trim())) {
                searchedProductIndex = i;
                break;
            }
        }

        //Perform Add to Cart
        if (isAddToCartAction) {
            await this.addToCart.nth(searchedProductIndex).click({ delay: 100 });
            //Cart count should show 'numberOfItemsInCart' item added now
            await expect(this.cartCount, '"Add to Cart" button on item card of Inventory List Page is not working').toContainText(
                numberOfItemsInCart
            );

            const count = await this.removeFromCart.count();
            for (let i = 0; i < count; i++) {
                await expect(
                    this.removeFromCart.nth(i),
                    'After clicking on "Add to Cart" on item card on Inventory List, the button is not changing to "Remove"'
                ).toContainText(this.removeFromCartLabel);
            }
        } else {
            //Perform Remove from Cart
            await this.removeFromCart.click({ delay: 100 });
            await expect(this.cartCount, '"Remove" button on item card of Inventory List Page is not working').toHaveCount(0); // As element gets removed from DOM if item count is 0 in cart
            await expect(
                this.addToCart.nth(searchedProductIndex),
                'After clicking on "Remove" on item card on Inventory List, the button is not changing to "Add to Cart"'
            ).toContainText(this.addToCartLabel);
        }
    }

    /**
     * @function sortInventoryAlphabetically - Using the Dropdown on the Inventory list Page sort the items Alphabetically (A-Z or Z-A)
     * @param {String} sortType : Sorting of items should be done from A-Z or Z-A
     */
    async sortInventoryAlphabetically(sortType) {
        //Verify
        const dropdown = this.sort;
        await expect(this.sort, 'Filter for sorting items on Inventory List Page is not visible').toBeVisible();

        //Select the sortType
        await dropdown.selectOption(sortType);

        //Get Names of all the products and verify they are alphabetaically sorted
        var isCorrectlySorted = true;
        const titlesArr = JSON.stringify(await this.productTitle.allTextContents()).split(',');
        for (let i = 0; i < titlesArr.length - 1; i++) {
            const matchesLeader = titlesArr[i].match(/"(.*?)"/);
            const matchesFollower = titlesArr[i + 1].match(/"(.*?)"/);
            var itemAtI = matchesLeader ? matchesLeader[1] : titlesArr[i];
            var itemNextToI = matchesFollower ? matchesFollower[1] : titlesArr[i + 1];

            if (sortType == this.sortAZ && itemAtI.localeCompare(itemNextToI) >= 1) {
                isCorrectlySorted = false;
                break;
            } else if (sortType == this.sortZA && itemAtI.localeCompare(itemNextToI) < 1) {
                isCorrectlySorted = false;
                break;
            }
        }
        await expect(isCorrectlySorted, 'Items on Inventory List Page are not getting sorted alphabetically').toEqual(true);
    }

    /**
     * @function sortInventoryByPrice - Using the Dropdown on the Inventory list Page sort the items as per their price (High-Low or Low-High)
     * @param {String} sortType : Sorting of items should be done from High-Low or Low-High
     */
    async sortInventoryByPrice(sortType) {
        const dropdown = this.sort;
        await expect(this.sort, 'Filter for sorting items on Inventory List Page is not visible').toBeVisible();
        await dropdown.selectOption(sortType);

        //Get price of all the items on Inventory List Page
        var isCorrectlySorted = true;
        const priceArr = JSON.stringify(await this.price.allTextContents()).split(',');
        for (let i = 0; i < priceArr.length - 1; i++) {
            const matchesLeader = priceArr[i].match(/"\$(.*?)"/);
            const matchesFollower = priceArr[i + 1].match(/"\$(.*?)"/);
            var itemAtI = matchesLeader ? matchesLeader[1] : priceArr[i];
            var itemNextToI = matchesFollower ? matchesFollower[1] : priceArr[i + 1];

            if (sortType == this.LowToHigh && parseFloat(itemAtI) > parseFloat(itemNextToI)) {
                isCorrectlySorted = false;
                break;
            } else if (sortType == this.HighToLow && parseFloat(itemAtI) < parseFloat(itemNextToI)) {
                isCorrectlySorted = false;
                break;
            }
        }
        await expect(isCorrectlySorted, 'Items on Inventory List Page are not getting sorted by Price').toEqual(true);
    }

    /**
     * @function navigateToInventoryDetail - On selecting an item from Inventory List Navigate the User to Inventory Detail Page
     * @param {String} productName : Name of the Product to which user need to select
     */
    async navigateToInventoryDetail(productName) {
        //Find and click on productName
        var item = await this.page.locator('a:has-text("' + productName + '")');
        item.click();
        var itemTitleOnDetailPage = await this.inventoryDetailItemTitle.innerText();
        await expect(itemTitleOnDetailPage, 'On selecting an item from Inventory List user is not getting navigated to the same item').toEqual(
            productName
        );
    }

    /**
     * @function validateAddToCartOnItemDetails - On an Inventory detail page for an item which is not yet added to cart, validate a user can perform Add to Cart from details page
     */
    async validateAddToCartOnItemDetails() {
        //Verify Add to Cart is working correctly
        expect(
            await this.addToCart,
            'For an item which is not yet added to Cart, "Add to Cart" button not visible on Item Details Page'
        ).toBeVisible();
        await this.addToCart.click();

        //Cart count should show '1' item added now
        await expect(this.cartCount, '"Add to Cart" on Item Detail Page unable to add items to Cart').toContainText('1');
        //The button on the Inventory Detail Page should change to Remove
        await expect(this.removeFromCart, 'After "Add to Cart" button is clicked on Item Detail Page, "Remove" button is not showing').toContainText(
            this.removeFromCartLabel
        );
    }

    /**
     * @function validateRemoveFromCartOnItemDetails - On an Item detail page for an item which is already added to cart, validate a user can perform Remove from Cart from details page
     */
    async validateRemoveFromCartOnItemDetails() {
        //Verify Add to Cart is working correctly
        expect(
            await this.removeFromCart,
            'For an item which is already added to Cart, "Remove" Button is not visible on Item detail page'
        ).toBeVisible();
        await this.removeFromCart.click();

        await expect(this.cartCount, '"Remove" button on Item Details Page is not removing item from cart').toHaveCount(0); // As element gets removed from DOM if item count is 0 in cart
        await expect(this.addToCart, 'After "Remove" button is clicked on Item Detail Page, "Add to Cart" button is not showing').toContainText(
            this.addToCartLabel
        );
    }

    /**
     * @function validateBackToProductOnItemDetails - On an Item detail page validate a user can perform Back to Products from details page
     */
    async validateBackToProductOnItemDetails() {
        //Verify Back to Products is working correctly
        expect(await this.backToProducts, '"Back to Products" Button on Item detail Page is not Visible').toBeVisible();
        await this.backToProducts.click();
        expect(
            this.page,
            'On click of "Back to Products" button on Item Detail Page, User is not getting navigated back to Inventory List'
        ).toHaveURL(/.*inventory.html/);
    }
}
module.exports = { InventoryPage };
