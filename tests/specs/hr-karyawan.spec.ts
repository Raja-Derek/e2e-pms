import { test } from '../fixtures/roles';
import { expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { KaryawanPage } from '../pages/karyawanPage';

test.describe('HR Karyawan Menu Tests', () => {
    test('[HR] Validate menu karyawan', async ({ hrPage }) => {
        qase.id([745, 826,]);

        const karyawanPage = new KaryawanPage(hrPage);

        await karyawanPage.navigate();
        await karyawanPage.assertKaryawanPageVisible();
    });

    test('[HR] can see their employee', async ({hrPage})=>{
        qase.id(747)

        const karyawanPage = new KaryawanPage(hrPage);

        await karyawanPage.navigate();
        await karyawanPage.searchKaryawan('adirangga');
    })

    test('[HR] can provide attendance assesment', async ({hrPage})=>{
        qase.id(749)

        const karyawanPage = new KaryawanPage(hrPage);

        await karyawanPage.navigate();

        //Ganti bulan ini untuk test
        await karyawanPage.changeMonthFilter('Februari');

        await karyawanPage.chooseKaryawan('adirangga');
        await karyawanPage.chooseEvaluasiAbsensi();
        await karyawanPage.assertEvaluasiAbsensiPageVisible();
        await karyawanPage.saveEvaluasiAbsensi();
    })
    
})