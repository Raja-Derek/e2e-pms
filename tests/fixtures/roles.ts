import { test as base, Page } from '@playwright/test';
import { KaryawanPage } from '../pages/karyawanPage';
import { AspekPage } from '../pages/aspekPage';
import { ProfilePage } from '../pages/profilePage';
import { PenggunaPage } from '../pages/penggunaPage';

export const test = base.extend<{
    _createAuth: undefined;
    cookiesHR: KaryawanPage;
    cookiesSupervisor: KaryawanPage;
    cookiesDirector: KaryawanPage;
    cookiesAdmin: AspekPage & ProfilePage & PenggunaPage;
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
    },

    cookiesAdmin: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './tests/auth/admin.json' });
        const page = await context.newPage();

        const aspek = new AspekPage(page);
        const profile = new ProfilePage(page);
        const pengguna = new PenggunaPage(page);

        const combined = new Proxy(aspek as unknown as AspekPage & ProfilePage & PenggunaPage, {
            get(target, prop, receiver) {
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                const value = (profile as any)[prop as keyof ProfilePage];
                if (typeof value === 'function') {
                    return (value as Function).bind(profile);
                }
                return value;
            }
        });

        await use(combined);
        await context.close();
    }
});
