import {type Page, type Locator, expect} from '@playwright/test';

export class InventoryPage{
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly shoppingCartIcon: Locator;
    readonly sortDropdown: Locator;
    readonly inventoryItemName: Locator; // Check item name locator

    constructor(page: Page){
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]'); // The "Products" title
        this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.inventoryItemName = page.locator('.inventory_item_name');
    }
    /**
     * Helper method to verify this is correct page */  
    async assertIsOnPage(){
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText('Products');
        await expect(this.shoppingCartIcon).toBeVisible();
    }

    async assertUrl(){
       /* /.*inventory\.html/ matches any URL that ends with inventory.html */
        await expect(this.page).toHaveURL(/.*inventory\.html/);
    }

    async addItemToCart(itemName: string) {
        // Locator này tìm item cha chứa tên, sau đó tìm nút "Add" bên trong
        const itemLocator = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await itemLocator.locator('button:text-is("Add to cart")').click();
    }

    async removeItemFromCart(itemName: string) {
        const itemLocator = this.page.locator('.inventory_item').filter({ hasText: itemName });
        await itemLocator.locator('button:text-is("Remove")').click();
    }

    async assertCartCount(expectedCount: number) {
        const cartBadge = this.shoppingCartIcon.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText(String(expectedCount));
    }

    async assertCartIsEmpty() {
        const cartBadge = this.shoppingCartIcon.locator('.shopping_cart_badge');
        await expect(cartBadge).not.toBeVisible();
    }

    async sortItems(option: 'az' | 'za' | 'lohi' | 'hilo') {
        // lohi = Price (low to high)
        await this.sortDropdown.selectOption(option);
        //await this.sortDropdown.selectOption(option, { force: true });
    }
    
    async assertFirstNameInList(expectedName: string) {
        await expect(this.inventoryItemName.first()).toHaveText(expectedName);
    }

    async gotoCart() {
        await this.shoppingCartIcon.click();
    }
}