# SisaBaik API

API untuk aplikasi SisaBaik yang membantu pengelolaan penawaran makanan dan pemesanan makanan.

## Persyaratan

- Node.js yang mendukung opsi `--env-file`.
- PostgreSQL.
- File `.env` yang berisi konfigurasi koneksi database dan rahasia autentikasi.

## Instalasi dan Menjalankan Aplikasi

1. Instal dependensi:

   ```bash
   npm install
   ```

2. Siapkan database PostgreSQL dan sesuaikan konfigurasi pada `.env.example`.
3. Buat file `.env` berdasarkan `.env.example`, lalu isi konfigurasi database dan rahasia autentikasi untuk lingkungan lokal.
4. Jalankan migrasi database sesuai urutan proyek, termasuk `database/07_auth.sql`.
5. Jalankan server untuk pengembangan:

   ```bash
   npm run dev
   ```

6. Jalankan pengujian autentikasi:

   ```bash
   npm run auth:test
   ```

7. Untuk menjalankan skrip verifikasi penyedia, gunakan:

   ```bash
   npm run penyedia:verifikasi
   ```

   Ikuti petunjuk skrip dan pastikan akun yang diverifikasi memang sesuai dengan kebutuhan pengujian.


## Autentikasi dan Otorisasi

Aplikasi menggunakan autentikasi berbasis token dan pemeriksaan peran serta kepemilikan data di server.

- Pembeli dan penyedia mendaftar melalui endpoint registrasi masing-masing.
- Registrasi tidak memberikan kebebasan kepada klien untuk memilih peran sembarangan.
- Akun penyedia harus melalui proses peninjauan atau persetujuan admin sebelum dapat menggunakan fitur penyedia yang dilindungi.
- Kata sandi disimpan dalam bentuk hash, bukan teks biasa.
- Identitas pengguna yang terautentikasi ditentukan oleh server berdasarkan token dan akun yang valid.
- Pembuatan pesanan tidak menerima `emailPembeli` atau `penyediaId` sebagai sumber identitas tepercaya dari klien.
- Penyedia hanya dapat mengelola penawaran miliknya sendiri.
- Logout semua sesi membatalkan validitas token lama melalui mekanisme versi token yang diperiksa oleh server.

## Konfigurasi Lingkungan

Gunakan `.env.example` sebagai acuan nama variabel konfigurasi. Isi nilai rahasia hanya di `.env` lokal.

**Jangan** memasukkan kata sandi, token, nilai rahasia JWT, atau isi `.env` ke dokumentasi maupun repositori Git.

## Pengujian

Jalankan pengujian autentikasi dengan:

```bash
npm run auth:test
```

Pengujian ini memverifikasi perilaku autentikasi dan otorisasi sesuai cakupan skrip pengujian proyek.

## Dokumentasi API dan Hasil Pengujian

- `docs/API.md`: dokumentasi endpoint, format request, respons, dan kode kesalahan.
- `docs/hasil-uji-chapter8.md`: catatan hasil pengujian autentikasi dan otorisasi Chapter 8.

Catat hasil pengujian yang benar-benar dijalankan. Jangan mencatat token atau kredensial rahasia.
