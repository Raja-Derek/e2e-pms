import { Page, expect } from '@playwright/test';
import { SELECTORS } from '../data/selectors';
import { TEST_DATA } from '../data/testData';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(TEST_DATA.baseUrl);
  }

  async enterEmail(email: string) {
    await this.page.fill(SELECTORS.emailInput, email);
  }

  async enterPassword(password: string) {
    await this.page.fill(SELECTORS.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(SELECTORS.loginButton);
  }

  async assertDashboardVisible() {
    await expect(this.page.getByText(TEST_DATA.notifLogin)).toBeVisible({ timeout: 20000 });
    // await expect(this.page.locator(SELECTORS.notifLogin)).toContainText(TEST_DATA.notifLogin);
  }

  async login(email: string, password: string) {
    await this.navigate();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

}
