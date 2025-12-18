import { test as base, Page } from '@playwright/test';
import { KaryawanPage } from '../pages/karyawanPage';

export const test = base.extend<{
    _createAuth: undefined;
    cookiesHR: KaryawanPage;
    cookiesSupervisor: KaryawanPage;
    cookiesDirector: KaryawanPage;
}>({
    // small helper to create an authenticated page from a storage state file
    _createAuth: [async ({ browser }, use) => {
        // placeholder fixture, not exposed — used below via browser param
        await use(undefined);
    }, { auto: true }],

    cookiesSupervisor: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './tests/auth/supervisor.json' });
        const page = await context.newPage();
        await use(new KaryawanPage(page));
        await context.close();
    },

    cookiesDirector: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './tests/auth/director.json' });
        const page = await context.newPage();
        await use(new KaryawanPage(page));
        await context.close();
    },

    cookiesHR: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './tests/auth/hr.json' });
        const page = await context.newPage();
        await use(new KaryawanPage(page));
        await context.close();
    }
});
