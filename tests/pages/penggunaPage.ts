import { TEST_DATA } from '../data/testData';
import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class PenggunaPage extends BasePage {

    async navigatePengguna() {
        await this.page.goto(TEST_DATA.baseUrl + '/settings/users');
        console.log(await this.page.url());
    }

    async assertPenggunaPageVisible() {
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
    }
}
