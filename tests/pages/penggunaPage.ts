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

    async addPengguna(name: string, email: string, password: string, role: string, division: string, department: string, position: string, supervisor: string) {
        await this.page.getByRole('button', { name: 'Tambah Pengguna' }).click();
        await this.page.getByRole('textbox', { name: 'Nama Lengkap' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill(password);
        await this.page.getByRole('combobox', { name: 'Peran' }).click();
        await this.page.getByRole('option', { name: role }).click();
        await this.page.getByRole('combobox', { name: 'Divisi' }).click();
        await this.page.getByRole('option', { name: 'Semua Divisi' }).click();

        await this.page.getByRole('combobox', { name: 'Departemen' }).click();
        await this.page.getByRole('option', { name: department }).click();
        await this.page.getByRole('combobox', { name: 'Posisi (Opsional)' }).click();
        await this.page.getByRole('option', { name: position, exact: true }).click();
        await this.page.getByRole('combobox', { name: 'Atasan' }).click();
        await this.page.getByPlaceholder('Cari atasan...').fill(supervisor);
        await this.page.getByLabel('Suggestions').getByText(supervisor, { exact: true }).click();
        await this.page.getByRole('button', { name: 'Tambah Pengguna' }).click();
    }

    async editPengguna() {

    }
}
