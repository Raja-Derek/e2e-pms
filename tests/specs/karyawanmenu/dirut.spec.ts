import { test } from '../../fixtures/roles';


test.describe('Director Karyawan Menu Tests', () => {
    test('[Director] can see their employee', async ({ cookiesDirector }) => {
        await cookiesDirector.navigate();
        await cookiesDirector.searchKaryawan('TESTER2');
    })

    test('[Director] can provide assesment employee', async ({ cookiesDirector }) => {
        await cookiesDirector.navigate();

        // checkbox hanya bawahan saya
        await cookiesDirector.checkboxHanyaBawahanSaya();

        await cookiesDirector.chooseKaryawan('TESTER2');
        await cookiesDirector.chooseEvaluasiPerforma();
        await cookiesDirector.assertEvaluasiPerformaPageVisible();
    })

    test('[Director] can not provide attendance assesment', async ({ cookiesDirector }) => {
        await cookiesDirector.navigate();
        await cookiesDirector.chooseKaryawan('TESTER2');
        await cookiesDirector.assertEvaluasiAbsensiDisable();
    })

    test('[Director] can provide additional assesment', async ({ cookiesDirector }) => {
        await cookiesDirector.navigate();

        await cookiesDirector.chooseKaryawan('TESTER2');
        await cookiesDirector.chooseEvaluasiAspek();
        await cookiesDirector.assertEvaluasiAspekPageVisible('TESTER2');

    })

})