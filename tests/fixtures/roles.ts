import { test as base, Page } from '@playwright/test';
import { KaryawanPage } from '../pages/karyawanPage';
import { AspekPage } from '../pages/aspekPage';
import { ProfilePage } from '../pages/profilePage';
import { PenggunaPage } from '../pages/penggunaPage';
import { PeranPage } from '../pages/peranPage';

export const test = base.extend<{
    _createAuth: undefined;
    cookiesHR: KaryawanPage;
    cookiesSupervisor: KaryawanPage;
    cookiesDirector: KaryawanPage;
    adminPage: AspekPage & ProfilePage & PenggunaPage & PeranPage;
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

    adminPage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: './tests/auth/admin.json' });
        const page = await context.newPage();

        const aspek = new AspekPage(page);
        const profile = new ProfilePage(page);
        const pengguna = new PenggunaPage(page);
        const peran = new PeranPage(page);

        const targets = [aspek, profile, pengguna, peran] as const;

        const combined = new Proxy(aspek as unknown as AspekPage & ProfilePage & PenggunaPage & PeranPage,{
            get(_target, prop, _receiver) {
                for (const obj of targets) {
                    if (prop in obj) {
                        const value = (obj as any)[prop as keyof typeof obj];
                        return typeof value === 'function' ? (value as Function).bind(obj) : value;
                    }
                }
                return undefined;
            },
            set(_target, prop, value) {
                for (const obj of targets) {
                    if (prop in obj) {
                        (obj as any)[prop as keyof typeof obj] = value;
                        return true;
                    }
                }
                (aspek as any)[prop as keyof typeof aspek] = value;
                return true;
            },
            has(_target, prop) {
                return targets.some(obj => prop in obj);
            }
        });

        await use(combined);
        await context.close();
    }
});
