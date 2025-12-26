import { TEST_DATA } from '../data/testData';
import { BasePage } from './basePage';
import { expect, test } from '@playwright/test';
import { PeranData } from '../types/peran'

export class PeranPage extends BasePage {

    async openPeranPage() {
        await test.step('Navigate to Peran & Akses page', async () => {
            await this.page.goto(TEST_DATA.baseUrl + '/settings/roles');
            console.log(await this.page.url());
            await this.assertPageNotEmpty()
        })
    }

    async assertPeranPageVisible() {
        await test.step('Assert Peran & Akses page is visible', async () => {
            await expect(this.page.getByRole('heading', { name: 'Pengaturan' })).toBeVisible();
            await expect(this.page.getByText('Pengaturan sistem')).toBeVisible();
            await expect(this.page.getByRole('heading', { name: 'Peran & Akses' })).toBeVisible();
            await expect(this.page.getByText('Kelola peran dan hak akses')).toBeVisible();
            await expect(this.page.getByRole('button', { name: 'Tambah Peran' })).toBeVisible();
            await expect(this.page.getByRole('textbox', { name: 'Cari nama, slug, atau' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Nama' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Slug' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Deskripsi' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Jumlah Akses' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Visibilitas Karyawan' })).toBeVisible();
            await expect(this.page.getByRole('columnheader', { name: 'Aksi' })).toBeVisible();
        })
    }

    async checkVisibilityDepartment() {
        await this.page.getByRole('checkbox', { name: 'Dapat melihat semua karyawan di departemennya' }).click();
    }

    async checkVisibilityDivision() {
        await this.page.getByRole('checkbox', { name: 'Dapat melihat semua karyawan di divisinya' }).click();
    }

    async checkVisibilityAllDivision() {
        await this.page.getByRole('checkbox', { name: 'Dapat melihat semua karyawan di semua divisi' }).click();
    }

    async addNewPeran(data: PeranData) {
        await test.step('Click "Tambah Peran"', async () => {
            await this.page.getByRole('button', { name: 'Tambah Peran' }).click();

        })
        await test.step('Input "Nama Peran"', async () => {
            await this.page.getByRole('textbox', { name: 'Nama Peran' }).click();
            await this.page.getByRole('textbox', { name: 'Nama Peran' }).fill(data.namaPeran);

        })

        await test.step('Input "Slug"', async () => {
            await this.page.getByRole('textbox', { name: 'Slug' }).click();
            await this.page.getByRole('textbox', { name: 'Slug' }).press('ControlOrMeta+a');
            await this.page.getByRole('textbox', { name: 'Slug' }).fill(data.slug);

        })

        await test.step('Input "Deskripsi"', async () => {
            await this.page.getByRole('textbox', { name: 'Deskripsi' }).click();
            await this.page.getByRole('textbox', { name: 'Deskripsi' }).fill(data.deskripsi);
        })
    }

    async submitTambahPeran() {
        await this.page.getByRole('button', { name: 'Tambah Peran' }).click();
        await expect(this.page.getByText('Peran berhasil dibuat')).toBeVisible();
    }

    async assertPageNotEmpty() {
        await expect(this.page.getByText('Tidak ada data ditemukan')).not.toBeVisible();
    }

    async searchPeran(peran: string) {
        await test.step(`Search peran ${peran}`, async () => {
            await this.page.getByRole('textbox', { name: 'Cari nama, slug, atau' }).fill(peran);

        })
    }

    async assertSearchFound(name: string) {
        await test.step('Assert data found', async () => {
            await expect(this.page.getByText(name)).toBeVisible();
        })
    }

    async assertSearchNotFound() {
        await test.step('Assert data "Peran & Akses" not found', async () => {
            await expect(this.page.getByText('Tidak ada data ditemukan')).toBeVisible();
            await expect(this.page.getByText('Coba ubah kata kunci')).toBeVisible();
        })
    }

    async addHakAkses() {
        await test.step('Add All "Hak Akses"', async () => {
            await expect(this.page.getByText('Admin', { exact: true })).not.toBeVisible();

            await this.page.getByRole('cell', { name: 'Buka menu' }).click({ timeout: 15000 });
            await this.page.getByRole('menuitem', { name: 'Kelola Hak Akses' }).click();
            await this.page.getByRole('button', { name: 'Pilih Semua' }).click();
            await expect(this.page.getByText('dari 25 hak akses dipilih')).toBeVisible();
            await this.page.getByRole('button', { name: 'Simpan Perubahan' }).click();
        })
        await test.step('Assert "Hak Akses" successfully added', async () => {
            await expect(this.page.getByText('Hak akses berhasil diperbarui')).toBeVisible();
        })
    }

    async editPeran(data: PeranData) {
        await test.step('Edit "Peran & Akses"', async () => {
            await expect(this.page.getByText('Admin', { exact: true })).not.toBeVisible();

            await this.page.getByRole('button', { name: 'Buka menu' }).click();
            await this.page.getByRole('menuitem', { name: 'Edit Peran' }).click();
            await this.page.getByRole('textbox', { name: 'Nama Peran' }).click()
            await this.page.getByRole('textbox', { name: 'Nama Peran' }).fill(data.namaPeran);
            await this.page.getByRole('textbox', { name: 'Slug' }).fill(data.slug);
            await this.page.getByRole('textbox', { name: 'Deskripsi' }).fill(data.deskripsi);
            await this.page.getByRole('button', { name: 'Simpan Perubahan' }).click();
        })

        await test.step('Assert successfully edit "Peran & Akses"', async () => {
            await expect(this.page.getByText('Peran berhasil diperbarui')).toBeVisible();

        })
    }

    async deletePeran(data: PeranData) {
        await test.step('Delete "Peran & Akses"', async () => {
            await expect(this.page.getByText('Admin', { exact: true })).not.toBeVisible();

            await this.page.getByRole('button', { name: 'Buka menu' }).click();
            await this.page.getByRole('menuitem', { name: 'Hapus Peran' }).click();
            await this.page.getByRole('button', { name: 'Hapus Peran' }).click();
        })
        await test.step('Assert Peran has been deleted', async () => {
            await expect(this.page.getByText('Peran berhasil dihapus')).toBeVisible();
            await this.searchPeran(data.namaPeran)
            await this.assertSearchNotFound()
        })
    }
}
