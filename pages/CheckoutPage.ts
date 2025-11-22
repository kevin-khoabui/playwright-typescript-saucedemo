// pages/CheckoutPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    // Page 1: Information
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    // Page 2: General
    readonly finishButton: Locator;

    // Page 3: Complete
    readonly completeHeader: Locator;


    constructor(page: Page) {
        this.page = page;
        // Page 1
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');

        // Page 2
        this.finishButton = page.locator('[data-test="finish"]');

        // Page 3
        this.completeHeader = page.locator('.complete-header');
    }

    async fillInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async assertErrorMessage(message: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(message);
    }

    async assertComplete() {
        await expect(this.completeHeader).toBeVisible();
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }
}