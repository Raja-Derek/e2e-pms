import { test } from '../../fixtures/roles';


test.describe('Menu Profil', () => {
    test('Validate menu profil', async ({ adminPage }) => {
        await adminPage.navigateProfilePage();
        await adminPage.assertProfilePageVisible();
    })

})