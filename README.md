# SisaBaik

SisaBaik merupakan aplikasi untuk membantu pengelolaan penawaran makanan dan pemesanan makanan. Proyek ini terdiri dari backend API menggunakan Node.js dan Express, serta frontend menggunakan Vue 3 dan Vite. Aplikasi menggunakan PostgreSQL sebagai sistem pengelolaan basis data.

## 1. Persyaratan

Perangkat dan teknologi yang dibutuhkan:

- Node.js versi 22 atau lebih baru.
- npm.
- PostgreSQL.
- Vue 3 dan Vite untuk pengembangan frontend.
- File `.env` untuk konfigurasi backend.

## 2. Struktur Proyek

```text
sisabaik-api/
├── database/
├── docs/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── lib/
│   │   ├── router/
│   │   └── views/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── public/
├── scripts/
├── src/
├── .env.example
└── README.md
```

## 3. Instalasi Backend

1. Instal dependensi dari direktori utama proyek:

   ```bash
   npm install
   ```

2. Siapkan database PostgreSQL.
3. Sesuaikan konfigurasi berdasarkan `.env.example`.
4. Buat file `.env` berdasarkan `.env.example`, kemudian isi konfigurasi database dan rahasia autentikasi untuk lingkungan lokal.
5. Jalankan migrasi database sesuai urutan proyek, termasuk `database/07_auth.sql`.

## 4. Menjalankan Backend

Jalankan server pengembangan dari direktori utama proyek:

```bash
npm run dev
```

Backend dapat diakses melalui:

```text
http://127.0.0.1:3000
```

Untuk menjalankan pengujian autentikasi:

```bash
npm run auth:test
```

Untuk menjalankan skrip verifikasi penyedia:

```bash
npm run penyedia:verifikasi
```

Ikuti petunjuk skrip dan pastikan akun yang digunakan sesuai dengan kebutuhan pengujian.

## 5. Instalasi dan Menjalankan Frontend

Frontend berada di dalam direktori `frontend`.

Masuk ke direktori frontend:

```bash
cd frontend
```

Instal dependensi:

```bash
npm install
```

### Menjalankan Development Server

```bash
npm run dev
```

Frontend dapat diakses melalui:

```text
http://127.0.0.1:5173/
```

### Membuat Production Build

```bash
npm run build
```

Perintah tersebut menghasilkan folder `dist` yang berisi hasil kompilasi frontend.

### Menjalankan Preview

```bash
npm run preview
```

Frontend hasil build dapat diperiksa melalui:

```text
http://127.0.0.1:4173/
```

Jika source frontend mengalami perubahan setelah build, jalankan kembali `npm run build` sebelum memeriksa hasil preview.

## 6. Implementasi Frontend Chapter 9

Pada Chapter 9, frontend mulai dikembangkan menggunakan Vue 3 dan Vite dengan pendekatan component-based.

Beberapa komponen yang digunakan meliputi:

- `Ikon.vue`: menampilkan ikon aplikasi.
- `KartuPenawaran.vue`: menampilkan informasi penawaran makanan.
- `FilterPenawaran.vue`: mengelola pencarian dan filter katalog.
- `FormPenawaran.vue`: menyediakan form untuk menambahkan penawaran.

Aset visual menggunakan file SVG yang disimpan di dalam direktori `src/assets/`, termasuk logo dan ilustrasi kategori makanan.

Pada tahap awal, data penawaran masih menggunakan fixture lokal yang disimpan dalam memori aplikasi. Pengembangan tersebut menjadi dasar untuk proses integrasi dengan backend pada Chapter 10.

## 7. Integrasi Frontend dan Backend Chapter 10

Pada Chapter 10, frontend Vue dikembangkan lebih lanjut agar dapat berkomunikasi dengan backend API SisaBaik.

Implementasi mencakup beberapa bagian berikut:

- Integrasi komunikasi HTTP antara frontend dan backend.
- Pengelolaan sesi pengguna dan token autentikasi.
- Implementasi halaman login dan registrasi.
- Penggunaan Vue Router untuk navigasi halaman.
- Pembatasan akses halaman berdasarkan autentikasi dan peran pengguna.
- Pengambilan dan pengelolaan data penawaran melalui backend.
- Pengelolaan pesanan pembeli dan penyedia.
- Pengelolaan status pesanan dan proses pengambilan.
- Penanganan respons API, pesan kesalahan, dan kondisi loading.

Frontend menggunakan alamat backend `http://127.0.0.1:3000` melalui konfigurasi proxy Vite selama pengembangan.

Dengan integrasi ini, proses utama aplikasi tidak lagi hanya bergantung pada fixture lokal, tetapi menggunakan data yang dikelola oleh backend dan PostgreSQL.

## 8. Autentikasi dan Otorisasi

Backend menggunakan autentikasi berbasis token serta pemeriksaan peran dan kepemilikan data di server.

Ketentuan autentikasi dan otorisasi meliputi:

- Pembeli dan penyedia mendaftar melalui endpoint registrasi masing-masing.
- Registrasi tidak memberikan kebebasan kepada klien untuk memilih peran secara sembarangan.
- Akun penyedia harus melalui proses peninjauan atau persetujuan admin sebelum dapat menggunakan fitur penyedia yang dilindungi.
- Kata sandi disimpan dalam bentuk hash, bukan teks biasa.
- Identitas pengguna yang terautentikasi ditentukan oleh server berdasarkan token dan akun yang valid.
- Pembuatan pesanan tidak menerima `emailPembeli` atau `penyediaId` sebagai sumber identitas tepercaya dari klien.
- Penyedia hanya dapat mengelola penawaran miliknya sendiri.
- Logout semua sesi membatalkan validitas token lama melalui mekanisme versi token yang diperiksa oleh server.

## 9. Konfigurasi Lingkungan

Gunakan `.env.example` sebagai acuan nama variabel konfigurasi.

Simpan nilai rahasia hanya di dalam file `.env` lokal.

Jangan memasukkan kata sandi, token, nilai rahasia JWT, atau isi file `.env` ke dokumentasi maupun repositori Git.

## 10. Pengujian

Pengujian backend dan frontend dilakukan untuk memastikan fitur aplikasi berjalan sesuai fungsinya.

### Pengujian Backend

Pengujian autentikasi backend dapat dijalankan dengan:

```bash
npm run auth:test
```

Pengujian tersebut memverifikasi perilaku autentikasi dan otorisasi sesuai cakupan skrip pengujian proyek.

### Pengujian Frontend

Pengujian frontend dilakukan melalui browser dengan memeriksa:

- Tampilan katalog pembeli dan penyedia.
- Pencarian dan filter kategori.
- Validasi form penawaran.
- Login dan registrasi pengguna.
- Navigasi halaman berdasarkan peran pengguna.
- Proses pembuatan dan pengelolaan penawaran.
- Proses pemesanan, pembatalan, dan perubahan status pesanan.
- Pengelolaan stok dan pencatatan pembayaran.
- Pembaruan informasi pada dashboard.
- Responsivitas pada ukuran layar 375 px, 768 px, dan 1280 px.
- Hasil production build dan preview.

Pengujian dilakukan menggunakan skenario yang telah ditentukan dan hasilnya dicatat berdasarkan kondisi aktual aplikasi.

## 11. Dokumentasi API dan Hasil Pengujian

Dokumentasi proyek tersedia pada direktori `docs/`:

- `docs/API.md`: dokumentasi endpoint, format request, respons, dan kode kesalahan.
- `docs/hasil-uji-chapter8.md`: catatan hasil pengujian autentikasi dan otorisasi Chapter 8.
- `docs/hasil-uji-chapter9.md`: catatan hasil pengujian komponen dan frontend Chapter 9.
- `docs/hasil-uji-chapter10.md`: catatan hasil pengujian integrasi frontend dan backend Chapter 10.

Dokumentasi hasil pengujian disusun berdasarkan hasil yang benar-benar diperoleh selama pengujian. Jangan mencantumkan token atau kredensial rahasia.

---

**Proyek SisaBaik** by: Imam Abdul Rahim