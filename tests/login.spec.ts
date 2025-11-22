// Import 'test' and 'expect' (required for every test file)
import { test, expect } from '@playwright/test';

// Ensure each test starts with a fresh state (no logged-in user)
test.use({ storageState: undefined });

// Import the Page Object classes we created
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CREDENTIALS } from '../helpers/constants';

// Write your test cases
// We use 'test.describe()' to group related tests together
test.describe('Login Functionality', () => {
    // TC001: Login successfully with a standard user
    test('TC001: Login successfully with standard user', async ({ page }) => {
        // Create objects for the pages
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        // --- Start of Test Steps ---

        // 1. Go to the login page
        await loginPage.goto();

        // 2. Login with valid username
        await loginPage.login(CREDENTIALS.STANDARD_USER.USERNAME, CREDENTIALS.STANDARD_USER.PASSWORD);

        // 3. Verify (assert)
        // Check that we landed on the inventory page
        await inventoryPage.assertIsOnPage();
        await inventoryPage.assertUrl();
    });

    // TC002: Fail Login with a locked-out user
    test('TC002: Show error message with locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // --- Start of Test Steps ---

        // 1. Go to login page
        await loginPage.goto();

        // 2. Login with locked-out user
        await loginPage.login(CREDENTIALS.LOCKED_OUT_USER.USERNAME, CREDENTIALS.LOCKED_OUT_USER.PASSWORD);

        // 3. Verify (assert)
        // Check that the correct error message is shown
        await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    });

    // TC003: Fail Login with a invalid password
    test('TC003: Fail Login with a invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // --- Start of Test Steps ---

        // 1. Go to login page
        await loginPage.goto();

        // 2. Login with invalid password
        await loginPage.login(CREDENTIALS.STANDARD_USER.USERNAME, CREDENTIALS.INVALID_PASSWORD);

        // 3. Verify (assert)
        // Check that the correct error message is shown
        await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
    })

}
)