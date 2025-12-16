import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { TEST_DATA } from '../data/testData';
import { SELECTORS } from '../data/selectors';

async function createStorageState(roleName: string, email: string, password: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Attach listeners to capture client-side errors and console output (useful in CI logs)
  page.on('console', msg => console.log(`[console][${roleName}] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => console.log(`[pageerror][${roleName}] ${err.message}`));
  page.on('requestfailed', req => console.log(`[requestfailed][${roleName}] ${req.url()} ${req.failure()?.errorText || ''}`));

  // Validate base URL before navigation. TEST_DATA.baseUrl should be defined via env (.env or CI secrets).
  const baseUrl = TEST_DATA.baseUrl;
  if (!baseUrl) {
    throw new Error('BASE_URL is not defined. Please set BASE_URL environment variable (or BASE_URL in .env for local development).');
  }
  const finalBaseUrl = baseUrl.startsWith('http') ? baseUrl : `http://${baseUrl}`;
  console.log(`🔎 Navigating to: ${finalBaseUrl}`);
  await page.goto(finalBaseUrl);
  await page.fill(SELECTORS.emailInput, email);
  await page.fill(SELECTORS.passwordInput, password);
  await page.click(SELECTORS.loginButton);

  await page.waitForURL(/.*core/);

  // Save storage state
  const outputPath = path.join(__dirname, `${roleName}.json`);
  await page.context().storageState({ path: outputPath });

  await browser.close();
  console.log(`✅ Storage generated for ${roleName}`);
}

async function globalSetup() {
  console.log('🔥 Cleaning old auth session...');
  const authDir = path.join(__dirname);

  fs.readdirSync(authDir)
    .filter(file => file.endsWith('.json'))
    .forEach(file => fs.unlinkSync(path.join(authDir, file)));

  console.log('🔐 Generating auth sessions...');

  await createStorageState('supervisor', TEST_DATA.supervisorEmail, TEST_DATA.supervisorPassword);
  await createStorageState('director', TEST_DATA.dirutEmail, TEST_DATA.dirutPassword);
  await createStorageState('hr', TEST_DATA.hrEmail, TEST_DATA.hrPassword);

  console.log('🏁 All sessions generated!');
}

export default globalSetup;
