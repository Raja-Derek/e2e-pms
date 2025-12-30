import { test } from '../../fixtures/roles';

import { DATA_PERAN } from '../../data/testData';

test.describe.serial('Menu Peran & Akses', () => {
    test('Add new "peran & akses"', async ({ adminPage }) => {
        await adminPage.openPeranPage()
        await adminPage.assertPeranPageVisible();
        await adminPage.addNewPeran({
            namaPeran: DATA_PERAN.staff,
            slug: 'ast',
            deskripsi: 'Staff dari automation'
        })
        await adminPage.submitTambahPeran()
    })

    test('Search "peran" with invalid data', async({adminPage})=>{
        await adminPage.openPeranPage()
        await adminPage.searchPeran("tahu goreng 2")
        await adminPage.assertSearchNotFound()
    })

    test('Search "peran" with valid data', async({adminPage})=>{
        await adminPage.openPeranPage()
        await adminPage.searchPeran(DATA_PERAN.staff)
        await adminPage.assertSearchFound(DATA_PERAN.staff)
    })

    test('Validate "Kelola hak akses"', async({adminPage})=>{
        await adminPage.openPeranPage()
        await adminPage.searchPeran(DATA_PERAN.staff)
        await adminPage.assertSearchFound(DATA_PERAN.staff)
        await adminPage.addHakAkses()
    })

    test('Validate "Edit Peran"', async({adminPage})=>{
        await adminPage.openPeranPage()
        await adminPage.searchPeran(DATA_PERAN.staff)
        await adminPage.assertSearchFound(DATA_PERAN.staff)
        await adminPage.editPeran({
            namaPeran: DATA_PERAN.staff + 'edit',
            slug: 'ats',
            deskripsi: 'edit peran staff'
        })
    })

    test('Validate "Hapus Peran"', async({adminPage})=>{
        await adminPage.openPeranPage()
        await adminPage.searchPeran(DATA_PERAN.staff)
        await adminPage.assertSearchFound(DATA_PERAN.staff)
        await adminPage.deletePeran({
            namaPeran: DATA_PERAN.staff + 'edit',
            slug: 'ats',
            deskripsi: 'edit peran staff'
        })
    })
})