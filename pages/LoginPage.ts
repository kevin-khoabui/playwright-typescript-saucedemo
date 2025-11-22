//1. Import neccessay modules from Playwright
import {type Page, type Locator, expect} from '@playwright/test';


// 1. Import necessary modules from Playwright
//import { type Page, type Locator, expect } from '@playwright/test';

// 2. Define the LoginPage Class
export class LoginPage {
    // 3. Define the properties (class variables)
    // We use 'readonely' because these locators won't change
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    //4. Define the Constructor
    // This runs when you create a new 'LoginPage' object
    constructor(page: Page){
        this.page = page;
        // Best Practice: Use [data-test] attributes for locators
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]')
        this.errorMessage = page.locator('[data-test="error"]');

    }

    // 5. Define Methods (reusable actions on this page)
    
    /**
     * Navigates to the login page
     */
    async goto(){
        /* baseURL is 'https://www.saucedemo.com/' */
        await this.page.goto('/');
    }
  
    /**
     * Fills the username and password, then clicks login
     * @param username The username to fill
     * @param password The password to fill
     */
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * A helper method to check for a specific error message
     * @param message The exact error text to expect
     */
    async assertErrorMessage(message: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(message);
    }
}