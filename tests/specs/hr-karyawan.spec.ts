import { test } from '../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('HR Karyawan Menu Tests', () => {
    test('[HR] Validate menu karyawan', async ({ karyawanPageHR }) => {
        qase.id([745]);


        await karyawanPageHR.navigate();
        await karyawanPageHR.assertKaryawanPageVisible();
    });

    test('[HR] can see their employee', async ({ karyawanPageHR }) => {
        qase.id(747)

        await karyawanPageHR.navigate();
        await karyawanPageHR.searchKaryawan('adirangga');
    })

    test('[HR] can provide attendance assesment', async ({ karyawanPageHR }) => {
        qase.id(749)

        await karyawanPageHR.navigate();

        //Ganti bulan ini untuk test
        await karyawanPageHR.changeMonthFilter('September');

        await karyawanPageHR.chooseKaryawan('ESTU');
        await karyawanPageHR.chooseEvaluasiAbsensi();
        await karyawanPageHR.assertEvaluasiAbsensiPageVisible();
        // await karyawanPageHR.saveEvaluasiAbsensi();
    })

    test('[HR] can provide assesment employee', async ({ karyawanPageHR }) => {
        qase.id(748)

        await karyawanPageHR.navigate();

        //Ganti bulan ini untuk test
        await karyawanPageHR.changeMonthFilter('Juni');

        // checkbox hanya bawahan saya
        await karyawanPageHR.checkboxHanyaBawahanSaya();

        await karyawanPageHR.chooseKaryawan('ADAM1');
        await karyawanPageHR.chooseEvaluasiPerforma();
        await karyawanPageHR.assertEvaluasiPerformaPageVisible();
        // await karyawanPageHR.provideEvaluasiPerforma();
        // await karyawanPageHR.assertEvaluasiPerforma();
    })

})