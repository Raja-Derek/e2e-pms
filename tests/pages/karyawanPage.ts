import { TEST_DATA } from '../data/testData';
import { helper } from '../utils/helper';
import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class KaryawanPage extends BasePage {

    async navigate() {
        await this.page.goto(TEST_DATA.baseUrl + '/core/employees');
        console.log(await this.page.url());

    }

    async assertKaryawanPageVisible() {
        await expect(
            this.page.getByRole('heading', { name: 'Karyawan' })
        ).toBeVisible({ timeout: 20000 });

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
        await this.page.waitForTimeout(5000);
        const searchBox = this.page.getByRole('textbox', { name: 'Cari nama atau email...' });
        await searchBox.click();
        await searchBox.fill(namaKaryawan);
        // Trigger search if the UI requires an Enter to run the filter
        await searchBox.press('Enter');
        // Use a looser text match to accommodate possible name casing or extra whitespace
        await expect(this.page.getByText(namaKaryawan, { exact: true })).toBeVisible({ timeout: 20000 });
        await this.page.waitForTimeout(3000);
    }

    async chooseKaryawan(namaKaryawan: string) {
        await this.searchKaryawan(namaKaryawan);
        await expect(this.page.getByText(namaKaryawan, { exact: true })).toBeVisible({ timeout: 10000 });
        await this.page.getByText(namaKaryawan, { exact: true }).click();
        await expect(this.page.getByText('Pilih Jenis Penilaian', { exact: true })).toBeVisible({ timeout: 20000 });

    }

    async chooseEvaluasiAbsensi() {
        await this.page.locator('div').filter({ hasText: /^Evaluasi Absensi$/ }).click();
        await this.page.waitForTimeout(5000);
    }

    async chooseEvaluasiPerforma() {
        await expect(this.page.getByText('Evaluasi Performance')).toBeVisible();
        await this.page.getByText('Evaluasi Performance').click();
        await this.page.waitForTimeout(5000);
    }

    async chooseEvaluasiAspek() {
        await this.page.waitForTimeout(2000);
        await expect(this.page.getByText('Evaluasi Aspek Lainnya')).toBeVisible();
        await this.page.locator('div').filter({ hasText: 'Evaluasi Aspek' }).nth(2).click();
        await this.page.waitForTimeout(5000);
    }

    async assertEvaluasiAspekDisable() {
        await expect(this.page.getByText('Evaluasi Aspek Lainnya')).toBeVisible();
        await expect(this.page.getByText('Evaluasi Aspek LainnyaPenilaian aspek tambahan lainnyaBelum DinilaiTidak ada')).toBeVisible();
    }

    async assertEvaluasiPerformaDisable() {
        await expect(this.page.getByText('Evaluasi Performance')).toBeVisible();
        await expect(this.page.getByText('Bukan Atasan Langsung')).toBeVisible();
    }

    async assertEvaluasiAbsensiDisable() {
        await expect(this.page.getByText('Evaluasi Absensi')).toBeVisible();
        await expect(this.page.getByText('Evaluasi AbsensiPenilaian kehadiran dan absensiBelum DinilaiTidak ada akses')).toBeVisible();
    }

    async assertEvaluasiPerformaPageVisible() {
        await expect(this.page.getByRole('heading', { name: 'Penilaian Performa' })).toBeVisible({timeout: 10000});
        await expect(this.page.getByText('Penilaian karyawan secara')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Managerial Skill' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Professional Skill' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Kepribadian' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Simpan' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Managerial Skill' })).toBeVisible();

    }

    async provideEvaluasiPerforma() {
        await this.page.getByRole('button', { name: 'A' }).nth(1).click();
        await this.page.getByRole('button', { name: 'A' }).nth(2).click();
        await this.page.getByRole('button', { name: 'A' }).nth(3).click();
        await this.page.getByRole('button', { name: 'A' }).nth(4).click();
        await this.page.getByRole('button', { name: 'A' }).nth(5).click();
        await this.page.getByRole('button', { name: 'A', exact: true }).nth(5).click();
        await this.page.locator('div:nth-child(2) > .space-y-6 > div:nth-child(3) > .flex > button').first().click();
        await this.page.locator('div:nth-child(2) > .space-y-6 > div:nth-child(4) > .flex > button').first().click();
        await this.page.locator('div:nth-child(3) > .space-y-6 > div > .flex > button').first().click();
        await this.page.locator('div:nth-child(3) > .space-y-6 > div:nth-child(2) > .flex > button').first().click();
        await this.page.locator('div:nth-child(3) > .space-y-6 > div:nth-child(3) > .flex > button').first().click();
        await this.page.locator('div:nth-child(3) > .space-y-6 > div:nth-child(4) > .flex > button').first().click();
        await this.page.locator('div:nth-child(5) > .flex > button').first().click();
        await this.page.locator('div:nth-child(6) > .flex > button').first().click();
        await this.page.locator('div:nth-child(7) > .flex > button').first().click();
        await this.page.locator('div:nth-child(8) > .flex > button').first().click();
        await this.page.locator('div:nth-child(9) > .flex > button').first().click();
        await this.page.locator('div:nth-child(10) > .flex > button').first().click();
        await this.page.locator('div:nth-child(11) > .flex > button').first().click();
        await this.page.locator('div:nth-child(12) > .flex > button').first().click();
        await this.page.locator('div:nth-child(13) > .flex > button').first().click();
        await this.page.locator('div:nth-child(14) > .flex > button').first().click();
        await this.simpanEvaluasiPerforma();
    }

    async simpanEvaluasiPerforma() {
        await this.page.getByRole('button', { name: 'Simpan' }).click();
        await this.page.getByRole('button', { name: 'Simpan' }).click();
    }

    async assertBelumMengisiSemuaAspek() {
        await expect(this.page.getByText('Anda belum mengisi semua aspek')).toBeVisible();
    }

    async assertEvaluasiAspekPageVisible(karyawan: string) {
        // waitForURL returns a Promise<void> so assert it directly instead of passing to expect
        // scope the name check to the "Informasi Karyawan" section to avoid strict mode
        const infoSection = this.page.locator('div').filter({ hasText: 'Informasi Karyawan' }).first();
        await expect(infoSection.getByText(karyawan, { exact: true })).toBeVisible({ timeout: 10000 });
        await expect(this.page.getByRole('heading', { name: 'Penilaian Lainnya' })).toBeVisible();
        await expect(this.page.getByText('Informasi Karyawan')).toBeVisible();
        await expect(this.page.getByText('Nama')).toBeVisible();
        await expect(this.page.getByText('Divisi')).toBeVisible();
        await expect(this.page.getByText('Departemen')).toBeVisible();
        await expect(this.page.getByText('Jabatan')).toBeVisible();
        await expect(this.page.getByText('Bulan Penilaian')).toBeVisible();
        await expect(this.page.getByText('Data Penilaian Lainnya')).toBeVisible();
        await expect(this.page.getByText('Komentar')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Komentar' })).toBeVisible();
        await expect(this.page.getByText('Nilai', { exact: true })).toBeVisible();
        await expect(this.page.getByRole('spinbutton', { name: 'Nilai' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Simpan' })).toBeVisible();
    }

    async assertEvaluasiPerforma() {
        await expect(this.page.locator('.lucide.lucide-circle-check')).toBeVisible();

    }

    async assertEvaluasiAbsensiPageVisible() {
        await expect(this.page.getByRole('heading', { name: 'Penilaian Absensi' })).toBeVisible({ timeout: 10000 });
        await expect(this.page.getByText('Penilaian karyawan secara')).toBeVisible();
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
        const help = new helper();

        const monthShort = month.slice(0, 3);
        await this.page.getByRole('button', { name: help.getCurrentMonthName() }).click();
        await this.page.getByRole('button', { name: monthShort }).click();
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('button', { name: month }).click();
        await this.page.waitForTimeout(10000);
    }

    async checkMonth() {
        const base = new BasePage(this.page);
        const help = new helper();

        console.log('Bulan sekarang adalah: ' + help.getCurrentMonthName());
    }

    async checkboxHanyaBawahanSaya() {
        await this.page.getByRole('checkbox', { name: 'Hanya Bawahan Saya' }).click();

    }
}
