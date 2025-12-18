import { test } from '../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('HR Karyawan Menu Tests', () => {
    test('[HR] Validate menu karyawan', async ({ cookiesHR }) => {
        qase.id([826]);

        await cookiesHR.navigate();
        await cookiesHR.assertKaryawanPageVisible();
    });

    test('[HR] can see their employee', async ({ cookiesHR }) => {
        qase.id(747)

        await cookiesHR.navigate();
        await cookiesHR.searchKaryawan('TESTER1');
    })

    test('[HR] can provide attendance assesment', async ({ cookiesHR }) => {
        qase.id(749)

        await cookiesHR.navigate();

        //Ganti bulan ini untuk test
        // await cookiesHR.changeMonthFilter('September');

        await cookiesHR.chooseKaryawan('TESTER1');
        await cookiesHR.chooseEvaluasiAbsensi();

        await cookiesHR.assertEvaluasiAbsensiPageVisible();
        // await cookiesHR.saveEvaluasiAbsensi();
    })

    test('[HR] can provide assesment employee', async ({ cookiesHR }) => {
        qase.id(748)

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
        qase.id(750)

        await cookiesHR.navigate();

        await cookiesHR.chooseKaryawan('TESTER2');
        await cookiesHR.assertEvaluasiAspekDisable();

    })

})