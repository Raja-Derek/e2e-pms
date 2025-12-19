import { test } from '../../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('Menu Profil', () => {
    test('Validate menu profil', async ({ cookiesAdmin }) => {
        qase.id(776)

        await cookiesAdmin.navigateProfilePage();
        await cookiesAdmin.assertProfilePageVisible();
    })

})