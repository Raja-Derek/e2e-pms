import { TEST_DATA } from '../data/testData';
import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class KaryawanPage extends BasePage {

    async navigate() {
        await this.page.goto(TEST_DATA.baseUrl + '/core/employees');
    }

    async assertKaryawanPageVisible() {
        await this.page.getByRole('heading', { name: 'Karyawan' }).waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.page.getByRole('heading', { name: 'Karyawan' })).toBeVisible();
        await expect(this.page.getByText('Kelola data karyawan dan')).toBeVisible();
        await expect(this.page.getByTestId('employees-core_statistics_total-karyawan')).toBeVisible();
        await expect(this.page.getByTestId('employees-core_statistics_perlu-ditinjau')).toBeVisible();
        await expect(this.page.getByTestId('employees-core_statistics_sudah-dinilai')).toBeVisible();
        await expect(this.page.getByTestId('employees-core_tabs_semua')).toBeVisible();
        await expect(this.page.getByTestId('employees-core_tabs_pending')).toBeVisible();
        await expect(this.page.getByTestId('employees-core_tabs_reviewed')).toBeVisible();
        await expect(this.page.getByText('Hanya Bawahan Saya')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Desember' })).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Cari nama atau email...' })).toBeVisible();
        await expect(this.page.locator('.overflow-hidden.rounded-lg')).toBeVisible();
    }

    async searchKaryawan(namaKaryawan: string) {
        await this.page.getByRole('textbox', { name: 'Cari nama atau email...' }).click();
        await this.page.getByRole('textbox', { name: 'Cari nama atau email...' }).fill(namaKaryawan);
        await expect(this.page.getByText(namaKaryawan, { exact: true })).toBeVisible();

    }

    async chooseKaryawan(namaKaryawan: string) {
        await this.searchKaryawan(namaKaryawan);
        await this.page.locator('.flex.items-center.gap-1').first().click();
    }

    async chooseEvaluasiAbsensi() {
        await this.page.locator('div').filter({ hasText: /^Evaluasi Absensi$/ }).click();

    }

    async assertEvaluasiAbsensiPageVisible() {
        await expect(this.page.getByRole('heading', { name: 'Penilaian Absensi' })).toBeVisible();
        await expect(this.page.getByText('Penilaian karyawan secara')).toBeVisible();
        await expect(this.page.getByText('Informasi KaryawanNamaadiranggaDivisi-DepartemenIT & EngineeringJabatanKaryawan')).toBeVisible();
        await expect(this.page.locator('body')).toContainText('hari kerja');
        await expect(this.page.locator('body')).toContainText('hari libur');
        await expect(this.page.locator('body')).toContainText('hari dalam');
        await expect(this.page.locator('div').filter({ hasText: 'Terlambat' }).nth(4)).toBeVisible();
        await expect(this.page.locator('div').filter({ hasText: 'Sakit' }).nth(4)).toBeVisible();
        await expect(this.page.locator('div').filter({ hasText: 'Izin' }).nth(4)).toBeVisible();
        await expect(this.page.locator('div').filter({ hasText: /^Libur$/ }).first()).toBeVisible();
        await expect(this.page.locator('div').filter({ hasText: 'Cuti' }).nth(4)).toBeVisible();
        await expect(this.page.locator('div').filter({ hasText: 'Tanpa Keterangan' }).nth(4)).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Simpan' })).toBeVisible();
    }

    async saveEvaluasiAbsensi() {
        await this.page.getByRole('button', { name: 'Simpan' }).click();
        await this.page.getByRole('button', { name: 'Simpan' }).click();
        await expect(this.page.getByText('Penilaian absensi berhasil')).toBeVisible();
        await expect(this.page.locator('.lucide.lucide-circle-check')).toBeVisible();

    }

    async changeMonthFilter(month: string) {
        const base = new BasePage(this.page);

        const monthShort = month.slice(0, 3);
        await this.page.getByRole('button', { name: base.getCurrentMonthName() }).click();
        await this.page.getByRole('button', { name: monthShort }).click();
        await this.page.getByRole('button', { name: month }).click();
    }

    async checkMonth() {
        const base = new BasePage(this.page);

        console.log('Bulan sekarang adalah: ' + base.getCurrentMonthName());
    }
}
