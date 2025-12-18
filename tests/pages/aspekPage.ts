import { TEST_DATA } from '../data/testData';
import { helper } from '../utils/helper';
import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class AspekPage extends BasePage {

    async navigateAspekPenilaian() {
        await this.page.goto(TEST_DATA.baseUrl + '/core/performance-aspect');
        console.log(await this.page.url());
    }

    async assertAspekPageVisible() {
        await expect(this.page.getByRole('heading', { name: 'Aspek Penilaian Performa' })).toBeVisible();
        await expect(this.page.getByText('Kelola aspek penilaian')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Cari nama atau deskripsi' })).toBeVisible();
        await expect(this.page.getByRole('columnheader', { name: 'Nama' })).toBeVisible();
        await expect(this.page.getByRole('columnheader', { name: 'Deskripsi' })).toBeVisible();
        await expect(this.page.getByRole('columnheader', { name: 'Poin Penilaian' })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'Managerial Skill' })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'Professional Skill' })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'Kepribadian' })).toBeVisible();
    }

    async searchAspek(aspekName: string) {
        await this.page.getByRole('textbox', { name: 'Cari nama atau deskripsi' }).fill(aspekName);
        await this.page.getByRole('textbox', { name: 'Cari nama atau deskripsi' }).press('Enter');
    }

    async assertAspekNotFound() {
        await expect(this.page.getByText('Tidak ada data ditemukan')).toBeVisible();
    }

    async assertAspekFounded(aspekName: string) {
        await expect(this.page.getByText(aspekName)).toBeVisible();
    }

}
