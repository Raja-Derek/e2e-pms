import { test } from '../../fixtures/roles';


test.describe('Supervisor Karyawan Menu Tests', () => {
    test('[Supervisor] can see their employee', async ({ cookiesSupervisor }) => {
        await cookiesSupervisor.navigate();
        await cookiesSupervisor.searchKaryawan('TESTER3');
    })

    test('[Supervisor] can provide assesment employee', async ({ cookiesSupervisor }) => {
        await cookiesSupervisor.navigate();

        // checkbox hanya bawahan saya
        await cookiesSupervisor.checkboxHanyaBawahanSaya();

        await cookiesSupervisor.chooseKaryawan('TESTER3');
        await cookiesSupervisor.chooseEvaluasiPerforma();
        await cookiesSupervisor.assertEvaluasiPerformaPageVisible();
    })

    test('[Supervisor] can not provide attendance assesment', async ({ cookiesSupervisor }) => {
        await cookiesSupervisor.navigate();
        await cookiesSupervisor.chooseKaryawan('TESTER3');
        await cookiesSupervisor.assertEvaluasiAbsensiDisable();
    })

    test('[Supervisor] can not provide additional assesment', async ({ cookiesSupervisor }) => {
        await cookiesSupervisor.navigate();
        await cookiesSupervisor.chooseKaryawan('TESTER3');
        await cookiesSupervisor.assertEvaluasiAspekDisable();
    })

    test('[Performance] Can not submit before the assessment aspects are completed', async ({ cookiesSupervisor }) => {
        await cookiesSupervisor.navigate();

        // checkbox hanya bawahan saya
        await cookiesSupervisor.checkboxHanyaBawahanSaya();

        await cookiesSupervisor.chooseKaryawan('TESTER3');
        await cookiesSupervisor.chooseEvaluasiPerforma();
        await cookiesSupervisor.assertEvaluasiPerformaPageVisible();
        await cookiesSupervisor.simpanEvaluasiPerforma();
        await cookiesSupervisor.assertBelumMengisiSemuaAspek();

    })

})