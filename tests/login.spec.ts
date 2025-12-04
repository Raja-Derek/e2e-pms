import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { TEST_DATA } from './data/testData';
import { qase } from 'playwright-qase-reporter';


test('[Supervisor] login to platform', async ({ page }) => {
  qase.id(733);

  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(TEST_DATA.supervisorEmail, TEST_DATA.supervisorPassword);

  // Assertion bahwa masuk dashboard
  await loginPage.assertDashboardVisible();
});

test.skip('[Supervisor] forgot password', async ({ page }) => {
  qase.id(735);

  const loginPage = new LoginPage(page);
});

test('[Director] login to platform', async ({ page }) => {
  qase.id(737);

  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(TEST_DATA.dirutEmail, TEST_DATA.dirutPassword);

  // Assertion bahwa masuk dashboard
  await loginPage.assertDashboardVisible();
});

test.skip('[Director] forgot password', async ({ page }) => {
  qase.id(738);
  const loginPage = new LoginPage(page);


});

test('[HR] login to platform', async ({ page }) => {
  qase.id(745);
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(TEST_DATA.hrEmail, TEST_DATA.hrPassword);

  // Assertion bahwa masuk dashboard
  await loginPage.assertDashboardVisible();
});

test.skip('[HR] forgot password', async ({ page }) => {
  qase.id(746);
  const loginPage = new LoginPage(page);


});
