import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { KaryawanPage } from '../pages/karyawanPage';

export const test = base.extend<{
    supervisorPage: Page;
    directorPage: Page;
    hrPage: Page;
    loginPage: LoginPage;
    karyawanPageHR: KaryawanPage;
    karyawanPageSupervisor: KaryawanPage;
    karyawanPageDirector: KaryawanPage;
}>({
    supervisorPage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './tests/auth/supervisor.json' });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
    karyawanPageSupervisor: async ({ supervisorPage }, use) => {
        const pageObj = new KaryawanPage(supervisorPage);
        await use(pageObj);
    },
    

    directorPage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './tests/auth/director.json' });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
    karyawanPageDirector: async ({ directorPage }, use) => {
        const pageObj = new KaryawanPage(directorPage);
        await use(pageObj);
    },

    hrPage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './tests/auth/hr.json' });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
    karyawanPageHR: async ({ hrPage }, use) => {
        const pageObj = new KaryawanPage(hrPage);
        await use(pageObj);
    },
});
