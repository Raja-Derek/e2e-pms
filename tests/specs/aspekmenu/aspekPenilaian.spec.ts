import { test } from '../../fixtures/roles';


test.describe('Menu Aspek Penilaian Performa', () => {
    test('Validate menu "Aspek Penilaian"', async ({ adminPage }) => {
        await adminPage.navigateAspekPenilaian();
        await adminPage.assertAspekPageVisible();
    })

    test('Search "Aspek" with valid data', async ({ adminPage }) => {
        await adminPage.navigateAspekPenilaian();
        await adminPage.searchAspek('Kemampuan membuat rencana kerja')
        await adminPage.assertAspekFounded('Kemampuan membuat rencana kerja');
    })
    
    test('Search "Aspek" with invalid data', async ({ adminPage }) => {
        await adminPage.navigateAspekPenilaian();
        await adminPage.searchAspek('tahu bulat')
        await adminPage.assertAspekNotFound();
    })

})