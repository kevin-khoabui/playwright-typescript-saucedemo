// tests/inventory.spec.ts
import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

// Notes: All tests here start from Inventory page (because of logged-in state)

test.beforeEach(async ({ page }) => {
    // await page.goto('/');
    await page.goto('/inventory.html');
});

test('TC04: Add one item to cart @sanity', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    // 1. Preparation: Ensure on Inventory Page
    await inventoryPage.assertIsOnPage();
    // 2. Action: Add item to cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    // 3. Verify
    await inventoryPage.assertCartCount(1);
});

test('TC05: Remove one item from inventory page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    // 1. Preparation: Add one item first
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.assertCartCount(1);
    // 2. Action: Remove item
    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    // 3. Verify
    await inventoryPage.assertCartIsEmpty();
});

test('TC07: Sort items by Price (low to high)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertIsOnPage();
    // 1. Action
    await inventoryPage.sortItems('lohi'); // lohi = Price (low to high)
    // 2. Verify the first item is the cheapest one
    await inventoryPage.assertFirstNameInList('Sauce Labs Onesie');
});