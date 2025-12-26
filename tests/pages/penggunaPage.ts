import { TEST_DATA } from '../data/testData';
import { BasePage } from './basePage';
import { expect, test } from '@playwright/test';
import { PenggunaData } from '../types/pengguna';

export class PenggunaPage extends BasePage {

    // add new pengguna selector
    private tambahBtn = this.page.getByRole('button', { name: 'Tambah Pengguna' });
    private namaInput = this.page.getByRole('textbox', { name: 'Nama Lengkap' });
    private emailInput = this.page.getByRole('textbox', { name: 'Email' });
    private passwordInput = this.page.getByRole('textbox', { name: 'Minimal 8 karakter' });
    private roleSelect = this.page.getByRole('combobox', { name: 'Peran' });
    private divisi = this.page.getByRole('combobox', { name: 'Divisi' })
    private departemenSelect = this.page.getByRole('combobox', { name: 'Departemen' });
    private posisiSelect = this.page.getByRole('combobox', { name: 'Posisi (Opsional)' });
    private atasanSelect = this.page.getByRole('combobox', { name: 'Atasan' });


    async openPenggunaPage() {
        await test.step('Navigate to page Pengguna', async () => {
            await this.page.goto(TEST_DATA.baseUrl + '/settings/users');
            await expect(this.tambahBtn).toBeVisible()
            console.log(await this.page.url());
        })
    }

    async assertPenggunaPageVisible() {
        await test.step('Assert page Pengguna is visible', async () => {
            await expect(this.page.getByRole('heading', { name: 'Pengaturan' })).toBeVisible();
            await expect(this.page.getByText('Pengaturan sistem')).toBeVisible();
            await expect(this.page.getByRole('heading', { name: 'Pengguna' })).toBeVisible();
            await expect(this.page.getByText('Kelola akun pengguna dan hak')).toBeVisible();
            await expect(this.page.getByRole('textbox', { name: 'Cari nama, email, departemen' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Nama' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Email' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Peran' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Divisi' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Departemen' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Posisi' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Atasan' })).toBeVisible();
            await expect(this.page.getByRole('button', { name: 'Dibuat Pada' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Aksi' })).toBeVisible();
            await expect(this.page.getByRole('button', { name: 'Tambah Pengguna' })).toBeVisible();
        })

    }

    async addPengguna(data: PenggunaData) {
        await test.step('Add new "Pengguna"', async () => {
            await this.tambahBtn.click();
            await this.namaInput.fill(data.nama);
            await this.emailInput.fill(data.email);
            await this.passwordInput.fill(data.password);
            await this.roleSelect.click();
            await this.page.getByRole('option', { name: data.role }).click();
            await this.divisi.click();
            await this.page.getByRole('option', { name: 'Semua Divisi' }).click();

            await this.departemenSelect.click();
            await this.page.getByRole('option', { name: data.departemen }).click();
            await this.posisiSelect.click();
            await this.page.getByRole('option', { name: data.posisi, exact: true }).click();
            await this.atasanSelect.click();
            await this.page.getByPlaceholder('Cari atasan...').fill(data.atasan);
            await this.page.getByLabel('Suggestions').getByText(data.atasan, { exact: true }).click();
            await this.page.getByRole('button', { name: 'Tambah Pengguna' }).click();
        })
    }

    async assertSuccessAddPengguna() {
        await test.step('Assert successfully add new "Pengguna"', async () => {
            await expect(this.page.getByText('Pengguna berhasil dibuat')).toBeVisible({ timeout: 20000 });
        })
    }

    async searchPengguna(name: string) {
        await test.step(`Search ${name}`, async () => {
            const result = name.replace(/ /g, '+');
            
            
            await expect(this.page.getByText('Tidak ada data ditemukan')).not.toBeVisible();
            await this.page.getByRole('textbox', { name: 'Cari nama, email, departemen' }).fill(name);
            await this.page.waitForTimeout(5000)
        })
    }

    async assertPenggunaFounded(name: string) {
        await test.step(`${name} is founded`, async () => {
            await expect(this.page.getByText(name)).toBeVisible({ timeout: 50000 });
        })
    }

    async assertPenggunaNotFound() {
        await test.step('Assert Pengguna not found', async () => {
            await expect(this.page.getByText('Tidak ada data ditemukan')).toBeVisible();
            await expect(this.page.getByText('Coba ubah kata kunci')).toBeVisible();
        })
    }

    async editPengguna(data: PenggunaData) {
        await test.step(`Edit pengguna ${data.nama}`, async () => {
            await this.page.getByRole('cell', { name: 'Buka menu' }).click();
            await this.page.getByRole('menuitem', { name: 'Edit Pengguna' }).click();
            await this.namaInput.click()
            await this.namaInput.fill(data.nama);
            await this.emailInput.fill(data.email);
            await this.roleSelect.click();
            await this.page.getByLabel(data.role).getByText(data.role).click();
            await this.divisi.click();
            await this.page.getByRole('option', { name: data.divisi }).click();
            await this.page.getByRole('listbox', { name: 'Suggestions' }).press('Escape');
            await this.departemenSelect.click();
            await this.page.getByRole('option', { name: data.departemen }).click();
            await this.posisiSelect.click();
            await this.page.getByRole('option', { name: 'Karyawan', exact: true }).click();
            await this.atasanSelect.click();
            await this.page.getByRole('option', { name: 'ESTU estu@lcc.com' }).click();
            await this.page.getByRole('button', { name: 'Simpan Perubahan' }).click();
            await expect(this.page.getByText('Pengguna berhasil diperbarui')).toBeVisible({ timeout: 10000 });

        })
    }

    async changePasswordPengguna() {
        await test.step('Change password', async () => {
            await this.page.getByRole('cell', { name: 'Buka menu' }).first().click();
            await this.page.getByRole('menuitem', { name: 'Ubah Kata Sandi' }).click();
            await this.page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
            await this.page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('tempeenak');
            await this.page.getByRole('textbox', { name: 'Konfirmasi Kata Sandi' }).click();
            await this.page.getByRole('textbox', { name: 'Konfirmasi Kata Sandi' }).fill('tempeenak');
            await this.page.getByRole('button', { name: 'Ubah Kata Sandi' }).click();
        })
    }

    async assertChangePassword() {
        await expect(this.page.getByText('Kata sandi berhasil diubah')).toBeVisible({ timeout: 20000 })
    }

    async deletePengguna(name: string) {
        await test.step(`Delete Pengguna ${name}`, async () => {

            await this.page.getByRole('button', { name: 'Buka menu' }).click();
            await this.page.getByRole('menuitem', { name: 'Hapus Pengguna' }).click();
            await this.page.getByRole('button', { name: 'Isi otomatis' }).click();
            await this.page.getByRole('button', { name: 'Hapus Pengguna' }).click();
        })
    }

    async assertDeletePengguna() {
        await test.step('Assert Pengguna has been deleted', async () => {
            await this.page.getByText('Pengguna berhasil dihapus').click();
        })
    }
}
