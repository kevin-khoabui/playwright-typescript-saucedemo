// tests/cart.spec.ts
import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('TC06: Remove one item from Cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await page.goto('/inventory.html');

    // 1. Preparation: Add one item first
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    // 2. Action: Go to Cart page
    await inventoryPage.gotoCart();
    await cartPage.assertIsOnPage();
    // 3. Action: Remove item
    await cartPage.removeItemFromCart('Sauce Labs Backpack');
    // 4. Verify cart is empty
    await cartPage.assertCartIsEmpty();
});