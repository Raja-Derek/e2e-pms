import { test } from '../../fixtures/roles';
import { qase } from 'playwright-qase-reporter';
import { DATA_PENGGUNA } from '../../data/testData';

test.describe.serial('Menu Pengguna', () => {
    test('Add new "pengguna"', async ({ adminPage }) => {
        qase.id(777)

        await adminPage.openPenggunaPage();
        await adminPage.assertPenggunaPageVisible();
        await adminPage.addPengguna({
            nama: DATA_PENGGUNA.penggunaTempe,
            email: 'tempebulat@lcc.com',
            password: 'tempebulat',
            role: 'Karyawan',
            departemen: 'Marketing Kode: MKT',
            posisi: 'Karyawan',
            atasan: 'ADAM1',
            divisi: 'SEMUA DIVISI'
        })
        await adminPage.assertSuccessAddPengguna()
    })

    test("Search 'pengguna' with valid data", async ({ adminPage }) => {
        qase.id(784)

        await adminPage.openPenggunaPage()
        await adminPage.searchPengguna(DATA_PENGGUNA.penggunaTempe)
        await adminPage.assertPenggunaFounded(DATA_PENGGUNA.penggunaTempe)
    })

    test("Search 'pengguna' with invalid data", async ({ adminPage }) => {
        qase.id(782)

        await adminPage.openPenggunaPage()
        await adminPage.searchPengguna("tempe kotak")
        await adminPage.assertAspekNotFound()
    })

    test("Edit 'Pengguna'", async ({ adminPage }) => {
        qase.id(778)

        await adminPage.openPenggunaPage()
        await adminPage.searchPengguna(DATA_PENGGUNA.penggunaTempe)
        await adminPage.assertPenggunaFounded(DATA_PENGGUNA.penggunaTempe)
        await adminPage.editPengguna({
            nama: DATA_PENGGUNA.penggunaTempeEdit,
            email: 'tempelonjongedit@lcc.com',
            password: 'tempelonjongedit',
            role: 'Karyawan',
            departemen: 'Digital Marketing Kode: DM',
            posisi: 'Karyawan',
            atasan: 'ADAM1',
            divisi: 'SEMUA DIVISI'
        })

        await adminPage.searchPengguna(DATA_PENGGUNA.penggunaTempeEdit)
        await adminPage.assertPenggunaFounded(DATA_PENGGUNA.penggunaTempeEdit)

    })

    test("Change Password 'Pengguna'", async ({adminPage}) => {
        qase.id(779)

        await adminPage.openPenggunaPage()
        await adminPage.searchPengguna(DATA_PENGGUNA.penggunaTempeEdit)
        await adminPage.changePasswordPengguna()
        await adminPage.assertChangePassword()
    })

    test("Delete 'Pengguna'", async ({ adminPage }) => {
        qase.id(780)

        await adminPage.openPenggunaPage()
        await adminPage.searchPengguna(DATA_PENGGUNA.penggunaTempeEdit)
        await adminPage.deletePengguna(DATA_PENGGUNA.penggunaTempeEdit)
        await adminPage.assertDeletePengguna()

    })
})