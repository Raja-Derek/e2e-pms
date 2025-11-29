import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { TEST_DATA } from './data/testData';

test('[Supervisor] login to platform', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(TEST_DATA.supervisorEmail, TEST_DATA.supervisorPassword);

  // Assertion bahwa masuk dashboard
  await loginPage.assertDashboardVisible();
});

test('[Supervisor] forgot password', async ({ page }) => {
  const loginPage = new LoginPage(page);


});

test('[Director] login to platform', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(TEST_DATA.dirutEmail, TEST_DATA.dirutPassword);

  // Assertion bahwa masuk dashboard
  await loginPage.assertDashboardVisible();
});

test('[Director] forgot password', async ({ page }) => {
  const loginPage = new LoginPage(page);


});

test('[HR] login to platform', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(TEST_DATA.hrEmail, TEST_DATA.hrPassword);

  // Assertion bahwa masuk dashboard
  await loginPage.assertDashboardVisible();
});

test('[HR] forgot password', async ({ page }) => {
  const loginPage = new LoginPage(page);


});
