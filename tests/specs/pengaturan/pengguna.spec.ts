import { test } from '../../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('Menu Pengguna', () => {
    test('Add new "pengguna"', async ({ cookiesAdmin }) => {
        qase.id(777)

        await cookiesAdmin.navigatePengguna();
        await cookiesAdmin.assertPenggunaPageVisible();
    })

})