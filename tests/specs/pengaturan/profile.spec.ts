import { test } from '../../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('Menu Profil', () => {
    test('Validate menu profil', async ({ adminPage }) => {
        qase.id(776)

        await adminPage.navigateProfilePage();
        await adminPage.assertProfilePageVisible();
    })

})