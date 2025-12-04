import * as dotenv from 'dotenv';

dotenv.config();

export const TEST_DATA = {
  supervisorEmail: process.env.SUPERVISOR_EMAIL || '',
  supervisorPassword: process.env.SUPERVISOR_PASSWORD || '',
  dirutEmail: process.env.DIRUT_EMAIL || '',
  dirutPassword: process.env.DIRUT_PASSWORD || '',
  hrEmail: process.env.HR_EMAIL || '',
  hrPassword: process.env.HR_PASSWORD || '',
  baseUrl: process.env.BASE_URL || '',
  notifLogin: 'Berhasil login' // ubah sesuai pesan notifikasi yang diharapkan
};
