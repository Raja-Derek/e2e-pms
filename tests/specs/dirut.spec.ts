import { test } from '../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('Director Karyawan Menu Tests', () => {
    test('[Director] can see their employee', async ({ cookiesDirector }) => {
        qase.id(751)

        await cookiesDirector.navigate();
        await cookiesDirector.searchKaryawan('TESTER2');
    })

    test('[Director] can provide assesment employee', async ({ cookiesDirector }) => {
        qase.id(752)

        await cookiesDirector.navigate();

        // checkbox hanya bawahan saya
        await cookiesDirector.checkboxHanyaBawahanSaya();

        await cookiesDirector.chooseKaryawan('TESTER2');
        await cookiesDirector.chooseEvaluasiPerforma();
        await cookiesDirector.assertEvaluasiPerformaPageVisible();
    })

    test('[Director] can not provide attendance assesment', async ({ cookiesDirector }) => {
        qase.id(753)

        await cookiesDirector.navigate();
        await cookiesDirector.chooseKaryawan('TESTER2');
        await cookiesDirector.assertEvaluasiAbsensiDisable();
    })

    test('[Director] can provide additional assesment', async ({ cookiesDirector }) => {
        qase.id(754)

        await cookiesDirector.navigate();

        await cookiesDirector.chooseKaryawan('TESTER2');
        await cookiesDirector.chooseEvaluasiAspek();
        await cookiesDirector.assertEvaluasiAspekPageVisible('TESTER2');

    })

})