// tests/checkout.spec.ts
import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// "beforeEach" is a hook that runs before EACH test case (TC08, 09, 10)
// This help to prepare one item in cart and go to checkout page
test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
    // Because already logged in, we start from Inventory page
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    // 1. Preparation: Add one item first
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    // 2. Action: Go to Cart page
    await inventoryPage.gotoCart();
    // 3. Action: Go to Checkout page
    await cartPage.gotoCheckout();

});

test('TC08: E2E Checkout - Happy Path @sanity', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // This test case starts from Checkout page (because of beforeEach)
    await checkoutPage.fillInformation('Kevin', 'Bui', '70000');
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();

    // Verify complete page
    await checkoutPage.assertComplete();
});

test('TC09: Checkout Error - Missing First Name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // DON'T fill First Name
    await checkoutPage.fillInformation('', 'Bui', '70000');
    await checkoutPage.continueCheckout();

    // Verify error message
    await checkoutPage.assertErrorMessage('Error: First Name is required');
});

test('TC10: Checkout - Cancel Checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page); // To verify back to Cart page

    // Cancel checkout
    await checkoutPage.cancelCheckout();

    // Verify back to Cart page
    await cartPage.assertIsOnPage();
});