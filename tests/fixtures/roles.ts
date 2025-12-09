import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export const test = base.extend<{
  supervisorPage: Page;
  directorPage: Page;
  hrPage: Page;
}>({
  supervisorPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: './tests/auth/supervisor.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  directorPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: './tests/auth/director.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  hrPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: './tests/auth/hr.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  }
});
