// helpers/global-setup.ts
import { chromium, type FullConfig } from '@playwright/test';
import { CREDENTIALS } from './constants'; // Import from constants file
import path from 'path';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Login By STANDARD_USER
  // We use the full URL here because the config file (baseURL) has not been loaded yet
  await page.goto('https://www.saucedemo.com/'); 
  await page.locator('[data-test="username"]').fill(CREDENTIALS.STANDARD_USER.USERNAME);
  await page.locator('[data-test="password"]').fill(CREDENTIALS.STANDARD_USER.PASSWORD);
  await page.locator('[data-test="login-button"]').click();

  // Wait for the inventory page to load
  await page.waitForSelector('.inventory_list');
  const statePath = path.join(__dirname, '..', 'storageState.json');

  // Save storage state into the file (this filename is important)
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}
export default globalSetup;