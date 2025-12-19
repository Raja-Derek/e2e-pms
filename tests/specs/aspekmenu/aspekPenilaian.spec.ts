import { test } from '../../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('Menu Aspek Penilaian Performa', () => {
    test('Validate menu "Aspek Penilaian"', async ({ cookiesAdmin }) => {
        qase.id(771)

        await cookiesAdmin.navigateAspekPenilaian();
        await cookiesAdmin.assertAspekPageVisible();
    })

    test('Search "Aspek" with valid data', async ({ cookiesAdmin }) => {
        qase.id(772)

        await cookiesAdmin.navigateAspekPenilaian();
        await cookiesAdmin.searchAspek('Kemampuan membuat rencana kerja')
        await cookiesAdmin.assertAspekFounded('Kemampuan membuat rencana kerja');
    })
    
    test('Search "Aspek" with invalid data', async ({ cookiesAdmin }) => {
        qase.id(772)

        await cookiesAdmin.navigateAspekPenilaian();
        await cookiesAdmin.searchAspek('tahu bulat')
        await cookiesAdmin.assertAspekNotFound();
    })

})