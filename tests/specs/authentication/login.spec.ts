import { test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { TEST_DATA } from '../../data/testData';
import { qase } from 'playwright-qase-reporter';

test.describe('Login Tests', () => {
  test('[Supervisor] login to platform', async ({ page }) => {
    qase.id(733);
    const loginPage = new LoginPage(page);
    await test.step('User access the link', async () => {
      await loginPage.navigate();
    });

    await test.step('User input email', async () => {
      await loginPage.enterEmail(TEST_DATA.supervisorEmail);
    })

    await test.step('User input password', async () => {
      await loginPage.enterPassword(TEST_DATA.supervisorPassword);
    })

    await test.step('User click login button', async () => {
      await loginPage.clickLogin();
    })

    await test.step('User successfully logged in and dashboard page is displayed', async () => {
      await loginPage.assertDashboardVisible();
    })
  });

  test('[Director] login to platform', async ({ page }) => {
    qase.id(737);
    const loginPage = new LoginPage(page);

    await loginPage.login(TEST_DATA.dirutEmail, TEST_DATA.dirutPassword);
    await loginPage.assertDashboardVisible();
  });

  test('[HR] login to platform', async ({ page }) => {
    qase.id(745);

    const loginPage = new LoginPage(page);
    await loginPage.login(TEST_DATA.hrEmail, TEST_DATA.hrPassword);
    await loginPage.assertDashboardVisible();
  });
});
