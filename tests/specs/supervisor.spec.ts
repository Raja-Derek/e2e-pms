import { test } from '../fixtures/roles';
import { qase } from 'playwright-qase-reporter';

test.describe('Supervisor Karyawan Menu Tests', () => {
    test('[Supervisor] can see their employee', async ({ cookiesSupervisor }) => {
        qase.id(739)

        await cookiesSupervisor.navigate();
        await cookiesSupervisor.searchKaryawan('TESTER3');
    })

    test('[Supervisor] can provide assesment employee', async ({ cookiesSupervisor }) => {
        qase.id(752)

        await cookiesSupervisor.navigate();

        // checkbox hanya bawahan saya
        await cookiesSupervisor.checkboxHanyaBawahanSaya();

        await cookiesSupervisor.chooseKaryawan('TESTER3');
        await cookiesSupervisor.chooseEvaluasiPerforma();
        await cookiesSupervisor.assertEvaluasiPerformaPageVisible();
    })

    test('[Supervisor] can not provide attendance assesment', async ({ cookiesSupervisor }) => {
        qase.id(753)

        await cookiesSupervisor.navigate();
        await cookiesSupervisor.chooseKaryawan('TESTER3');
        await cookiesSupervisor.assertEvaluasiAbsensiDisable();
    })

    test('[Supervisor] can not provide additional assesment', async ({ cookiesSupervisor }) => {
        qase.id(754)

        await cookiesSupervisor.navigate();
        await cookiesSupervisor.chooseKaryawan('TESTER3');
        await cookiesSupervisor.assertEvaluasiAspekDisable();
    })

    test('[Performance] Can not submit before the assessment aspects are completed', async ({ cookiesSupervisor }) => {
        qase.id(770)

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