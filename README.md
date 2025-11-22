# Playwright Automation Framework - Portfolio Project

This is a professional End-to-End (E2E) automation framework built from scratch to test the E-commerce flow on `https://www.saucedemo.com/`.

## 🎯 Project Goals
This project demonstrates my ability to **architect, implement, and maintain** a modern test automation framework using industry best practices.

## 🛠 Tech Stack
* **Framework:** Playwright
* **Language:** TypeScript (Strict typing)
* **Pattern:** Page Object Model (POM)
* **CI/CD:** GitHub Actions
* **Reporting:** HTML Reporter

## 🏗 Architecture Highlights
1.  **Page Object Model (POM):**
    * Separates test logic (`/tests`) from page selectors and actions (`/pages`).
    * Ensures code reusability and easy maintenance.
2.  **Global Authentication (Setup Project):**
    * Implements a `global-setup` mechanism to authenticate **once**.
    * Saves authentication state (Cookies/Storage) to `storageState.json`.
    * All tests reuse this state, significantly reducing execution time (no need to log in before every test).
3.  **Robust Locators:**
    * Prioritizes `data-test` attributes for stability.
    * Uses advanced filtering (`.filter({ hasText: ... })`) for dynamic elements like inventory items.
4.  **Configurable:**
    * Uses `constants.ts` to manage credentials and data centrally.
    * `playwright.config.ts` handles base URLs and browser configurations.

## 🧪 Test Scenarios (10 Automated Cases)
The suite covers critical business flows:
* **Login:** Successful login, Locked-out user, Invalid credentials.
* **Inventory:** Add to cart, Remove from cart, Sort items (Price low-high).
* **Cart:** Verify items, Remove items.
* **Checkout (E2E):** Complete happy path flow, Validation errors, Cancel flow.

## 🚀 How to Run
1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run all tests:**
    ```bash
    npx playwright test
    ```
3.  **View Report:**
    ```bash
    npx playwright show-report
    ```