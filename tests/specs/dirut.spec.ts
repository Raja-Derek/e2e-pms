import { test } from '../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('Director Karyawan Menu Tests', () => {
    test('[Director] can see their employee', async ({ karyawanPageDirector }) => {
        qase.id(751)

        await karyawanPageDirector.navigate();
        await karyawanPageDirector.searchKaryawan('TESTER2');
    })

    test('[Director] can provide assesment employee', async ({ karyawanPageDirector }) => {
        qase.id(752)

        await karyawanPageDirector.navigate();

        // checkbox hanya bawahan saya
        await karyawanPageDirector.checkboxHanyaBawahanSaya();

        await karyawanPageDirector.chooseKaryawan('TESTER2');
        await karyawanPageDirector.chooseEvaluasiPerforma();
        await karyawanPageDirector.assertEvaluasiPerformaPageVisible();
    })

    test('[Director] can not provide attendance assesment', async ({ karyawanPageDirector }) => {
        qase.id(753)

        await karyawanPageDirector.navigate();
        await karyawanPageDirector.chooseKaryawan('TESTER2');
        await karyawanPageDirector.assertEvaluasiAbsensiDisable();
    })

    test('[Director] can provide additional assesment', async ({ karyawanPageDirector }) => {
        qase.id(754)

        await karyawanPageDirector.navigate();

        await karyawanPageDirector.chooseKaryawan('TESTER2');
        await karyawanPageDirector.chooseEvaluasiAspek();
        await karyawanPageDirector.assertEvaluasiAspekPageVisible('TESTER2');

    })

})