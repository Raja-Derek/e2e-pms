import { test } from '../../fixtures/roles';


test.describe('HR Karyawan Menu Tests', () => {
    test('[HR] Validate menu karyawan', async ({ cookiesHR }) => {
        await cookiesHR.navigate();
        await cookiesHR.assertKaryawanPageVisible();
    });

    test('[HR] can see their employee', async ({ cookiesHR }) => {
        await cookiesHR.navigate();
        await cookiesHR.searchKaryawan('TESTER1');
    })

    test('[HR] can provide attendance assesment', async ({ cookiesHR }) => {
        await cookiesHR.navigate();

        //Ganti bulan ini untuk test
        // await cookiesHR.changeMonthFilter('September');

        await cookiesHR.chooseKaryawan('TESTER1');
        await cookiesHR.chooseEvaluasiAbsensi();

        await cookiesHR.assertEvaluasiAbsensiPageVisible();
        // await cookiesHR.saveEvaluasiAbsensi();
    })

    test('[HR] can provide assesment employee', async ({ cookiesHR }) => {
        await cookiesHR.navigate();

        //Ganti bulan ini untuk test
        // await cookiesHR.changeMonthFilter('Juni');

        // checkbox hanya bawahan saya
        await cookiesHR.checkboxHanyaBawahanSaya();

        await cookiesHR.chooseKaryawan('TESTER1');
        await cookiesHR.chooseEvaluasiPerforma();
        await cookiesHR.assertEvaluasiPerformaPageVisible();
        // await cookiesHR.provideEvaluasiPerforma();
        // await cookiesHR.assertEvaluasiPerforma();
    })

    test('[HR] can not provide additional assesment', async ({ cookiesHR }) => {
        await cookiesHR.navigate();

        await cookiesHR.chooseKaryawan('TESTER2');
        await cookiesHR.assertEvaluasiAspekDisable();

    })

})