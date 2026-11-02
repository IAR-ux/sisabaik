# Hasil Pengujian Chapter 9 — Frontend Vue SisaBaik

## 1. Identitas Pengujian

- Nama Penguji: Imam Abdul Rahim
- Proyek: SisaBaik
- Modul: Chapter 9 — Vue Components
- Branch: `feature/vue-components`
- Commit terakhir sebelum penyelesaian Chapter 9: `3ef8bcd`
- Versi Node.js: `v24.21.0`
- Versi npm: `11.19.0`
- Framework: Vue 3
- Build Tool: Vite

## 2. Hasil Pengujian Skenario

1. **Halaman baru, mode pembeli**
   - Hasil: 3 kartu, 15 unit, dan 2 penyedia.

2. **Pencarian LAPAU**
   - Hasil: 2 kartu penawaran Lapau Uni Rina.

3. **Pencarian tidak-ada-produk**
   - Hasil: Daftar kosong dan pesan empty state tampil.

4. **Reset filter dan pilih kategori roti**
   - Hasil: 1 kartu Paket Roti Sore.

5. **Memilih Paket Roti Sore**
   - Hasil: Ringkasan menampilkan stok tetap 6. Pemilihan tidak membuat pesanan baru.

6. **Beralih ke mode penyedia**
   - Hasil: 3 kartu milik Rina, 2 penawaran tersedia, dan 9 unit.

7. **Submit form kosong**
   - Hasil: Validasi tampil dan jumlah penawaran tetap 3.

8. **Harga penawaran lebih tinggi dari harga normal**
   - Hasil: Pesan validasi kesalahan tampil dan data tidak bertambah.

9. **Menambahkan Paket Gratis Latihan**
   - Hasil: Data bertambah menjadi 4 penawaran, 3 tersedia, dan 11 unit.

10. **Kembali ke mode pembeli dan reset filter**
    - Hasil: 4 kartu, 17 unit, dan 2 penyedia.

11. **Beralih kembali ke mode penyedia**
    - Hasil: Form kembali kosong dan data baru masih tersedia.

12. **Refresh browser**
    - Hasil: Data kembali ke kondisi awal, yaitu 3 kartu, 2 penawaran tersedia, dan 9 unit.

13. **Pemeriksaan logo, ilustrasi, dan badge**
    - Hasil: Aset tampil dengan baik dan harga 0 ditampilkan sebagai Gratis.

14. **Responsivitas dan keyboard**
    - Hasil: Pemeriksaan dilakukan pada ukuran layar 375 px, 768 px, dan 1280 px serta navigasi menggunakan keyboard.

15. **Pengujian batas waktu**
    - Hasil: Setelah pengujian waktu kedaluwarsa, katalog menampilkan 2 kartu dan 11 unit tersedia.

## 3. Hasil Pengujian Form

Pengujian form dilakukan untuk memastikan validasi input berjalan sesuai ketentuan.

1. **Form kosong**
   - Hasil: Ditolak karena seluruh input wajib belum diisi.

2. **Harga normal Rp20.000 dan harga penawaran Rp30.000**
   - Hasil: Ditolak karena harga penawaran lebih tinggi daripada harga normal.

3. **Harga penawaran Rp0**
   - Hasil: Diterima dan ditampilkan sebagai Gratis.

4. **Stok 1,5**
   - Hasil: Ditolak karena stok harus berupa bilangan bulat.

5. **Harga normal dikosongkan**
   - Hasil: Ditolak karena harga wajib diisi.

6. **Tanggal kedaluwarsa menggunakan tanggal kemarin**
   - Hasil: Ditolak karena tanggal kedaluwarsa sudah terlewati.

7. **Nama penawaran kurang dari 3 karakter**
   - Hasil: Ditolak karena nama tidak memenuhi batas minimal karakter.

## 4. Aliran Data Props dan Emits

Aliran data antarkomponen menggunakan pola *props down* dan *events up*.

- `App.vue` menyimpan state utama berupa daftar penawaran, pencarian, filter kategori, dan pilihan tampilan.
- `App.vue` mengirimkan data penawaran dan nilai filter kepada komponen anak melalui props.
- `FilterPenawaran.vue` mengirimkan perubahan pencarian dan kategori melalui event kepada komponen induk.
- `KartuPenawaran.vue` mengirimkan event pemilihan penawaran kepada `App.vue`.
- `FormPenawaran.vue` melakukan validasi input dan mengirimkan data penawaran yang valid melalui event kepada `App.vue`.
- Komponen anak tidak mengubah props secara langsung.

## 5. Perhitungan Ringkasan Katalog

Ringkasan katalog pembeli dihitung berdasarkan penawaran yang aktif, memiliki stok positif, dan belum melewati waktu kedaluwarsa.

**Kondisi awal:**
- Jumlah kartu penawaran: 3.
- Total unit tersedia: 15.
- Jumlah penyedia: 2.

**Mode penyedia Rina:**
- Total penawaran: 3.
- Penawaran tersedia: 2.
- Total unit tersedia: 9.

**Setelah penambahan Paket Gratis Latihan:**
- Total penawaran: 4.
- Penawaran tersedia: 3.
- Total unit tersedia: 11.

**Setelah kembali ke mode pembeli:**
- Jumlah kartu penawaran: 4.
- Total unit tersedia: 17.
- Jumlah penyedia: 2.

## 6. Hasil Build dan Preview

Production build dijalankan menggunakan perintah:

```bash
npm run build
```

Hasil pengujian:
- Vite berhasil melakukan transformasi terhadap 23 modul.
- File `index.html` berhasil dihasilkan.
- Aset CSS, JavaScript, dan SVG berhasil dikompilasi.
- Build berhasil diselesaikan dalam 313 ms.
- Folder `frontend/dist` berhasil dibuat.

Preview dijalankan menggunakan perintah:

```bash
npm run preview
```

Alamat preview:

```text
http://127.0.0.1:4173/
```

Hasil pengujian menunjukkan bahwa aplikasi berhasil dijalankan melalui production preview.

## 7. Catatan Hasil Pengujian

Frontend Chapter 9 telah menggunakan komponen Vue yang dapat digunakan kembali, pengelolaan state, props, emits, computed, dan validasi form.

Data penawaran masih menggunakan fixture lokal yang disimpan dalam memori aplikasi. Browser belum melakukan komunikasi dengan backend API maupun PostgreSQL. Oleh karena itu, data baru yang ditambahkan melalui form akan hilang setelah halaman di-refresh.

## 8. Dokumentasi dan Commit

- File dokumentasi: `docs/hasil-uji-chapter9.md`
- Branch: `feature/vue-components`
- Commit Chapter 9: Diisi setelah proses commit selesai.

## 9. Kesimpulan

Berdasarkan skenario pengujian yang dilakukan, fitur frontend Chapter 9 berjalan sesuai hasil yang diharapkan. Komponen dapat menampilkan data penawaran, melakukan pencarian dan filter, mengelola perubahan state, serta memvalidasi input form.

Proses production build dan preview juga berhasil dijalankan. Integrasi frontend dengan backend API dan penyimpanan PostgreSQL belum dilakukan pada tahap ini.