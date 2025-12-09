import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { TEST_DATA } from '../data/testData';
import { SELECTORS } from '../data/selectors';

async function createStorageState(roleName: string, email: string, password: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(TEST_DATA.baseUrl);
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
