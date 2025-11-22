// pages/CartPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async assertIsOnPage() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText('Your Cart');
    }

    async removeItemFromCart(itemName: string) {
        const itemLocator = this.page.locator('.cart_item').filter({ hasText: itemName });
        await itemLocator.locator('button:text-is("Remove")').click();
    }

    async assertCartIsEmpty() {
        // Verify that no cart items are visible
        await expect(this.page.locator('.cart_item')).not.toBeVisible();
    }

    async gotoCheckout() {
        await this.checkoutButton.click();
    }
}