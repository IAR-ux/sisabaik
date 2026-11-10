# HASIL PENGUJIAN CHAPTER 10
## Integrasi Frontend Vue dengan Backend SisaBaik

### 1. Identitas Pengujian

Nama Proyek: SisaBaik

Chapter: Chapter 10

Materi: Integrasi Frontend Vue dengan Backend

Framework Frontend: Vue 3

Build Tool: Vite

Backend: Node.js dan Express

Database: PostgreSQL

Frontend: http://127.0.0.1:5173/

Backend: http://127.0.0.1:3000

Branch: feature/fullstack-vue

Tanggal Pengujian: 10 November 2026

### 2. Tujuan Pengujian

Pengujian dilakukan untuk memastikan frontend Vue dapat terhubung dengan backend SisaBaik dan seluruh fitur utama berjalan sesuai fungsinya.

Pengujian mencakup akses halaman, autentikasi pengguna, pengelolaan penawaran, pencarian dan filter katalog, proses pemesanan, pembatalan pesanan, pengelolaan stok, pencatatan pembayaran, serta perhitungan dashboard pembeli dan penyedia.

### 3. Hasil Pengujian

#### 3.1 Pengujian Halaman dan Akses Pengguna

1. Membuka katalog tanpa login: Berhasil.
2. Mengakses halaman pesanan tanpa login: Berhasil, diarahkan ke halaman login.
3. Login sebagai pembeli Imam: Berhasil.
4. Login sebagai penyedia Rina Baru: Berhasil.
5. Mengakses halaman sesuai peran pengguna: Berhasil.

#### 3.2 Pengujian Penawaran

Pengujian dilakukan menggunakan akun penyedia Rina Baru.

1. Membuat penawaran makanan: Berhasil.
2. Mengubah harga penawaran roti menjadi Rp7.000: Berhasil.
3. Mempertahankan foto penawaran setelah perubahan: Berhasil.
4. Memeriksa status aktif dan stok penawaran: Berhasil.
5. Membuat penawaran gratis dengan harga Rp0: Berhasil.

Penawaran gratis yang digunakan bernama Roti Gratis Integrasi, dengan harga normal Rp10.000, harga penawaran Rp0, dan stok awal 3 paket.

#### 3.3 Pengujian Katalog

1. Mencari penawaran berdasarkan nama makanan: Berhasil.
2. Mencari penawaran berdasarkan nama penyedia: Berhasil.
3. Memfilter berdasarkan kategori Roti & kue: Berhasil.
4. Memastikan harga penawaran tampil sesuai data: Berhasil.

#### 3.4 Pengujian Pesanan Berbayar

Pengujian dilakukan menggunakan akun pembeli Imam dan penyedia Rina Baru.

Pesanan pertama:
- ID pesanan: 26.
- Nama penawaran: Roti Cokelat dan Donat Sisa Hari Ini.
- Harga satuan: Rp7.000.
- Jumlah: 2 paket.
- Total: Rp14.000.
- Hasil: Dibatalkan oleh pembeli sebelum dikonfirmasi.

Stok berhasil kembali dari 3 menjadi 5 paket.

Pesanan kedua:
- ID pesanan: 27.
- Harga satuan: Rp7.000.
- Jumlah: 2 paket.
- Total: Rp14.000.
- Hasil: Berhasil diselesaikan.

Pesanan diterima oleh penyedia, diubah menjadi siap diambil, kemudian diselesaikan setelah konfirmasi penyerahan makanan dan pembayaran.

#### 3.5 Pengujian Pengambilan dan Pembayaran

Pada pesanan ID 27, dilakukan pengujian validasi dengan mencoba menyelesaikan pesanan tanpa mencentang konfirmasi penyerahan makanan dan pembayaran.

Sistem berhasil menolak proses tersebut. Setelah kedua konfirmasi dilengkapi, pesanan berhasil diselesaikan.

Hasil akhir:
- Status pesanan selesai.
- Pembayaran diterima.
- Pengambilan tercatat.
- Kode pengembalian muncul pada detail pesanan.

#### 3.6 Pengujian Pesanan Gratis

Pengujian dilakukan menggunakan penawaran Roti Gratis Integrasi.

Pesanan ID 28:
- Total pesanan Rp0.
- Ditolak oleh penyedia sebelum konfirmasi.
- Stok berhasil kembali dari 1 menjadi 3 paket.

Pesanan ID 29:
- Total pesanan Rp0.
- Diterima dan diselesaikan oleh penyedia.
- Tidak menambah pengeluaran maupun pendapatan.
- Jumlah makanan yang dibeli bertambah 2 paket.

Pesanan ID 30:
- Total pesanan Rp0.
- Dikonfirmasi oleh penyedia.
- Kemudian dibatalkan oleh penyedia.
- Stok berhasil kembali dari 0 menjadi 1 paket.

#### 3.7 Pengujian Dashboard

Dashboard pembeli dan penyedia diperiksa setelah transaksi selesai.

Hasil pemeriksaan transaksi berbayar ID 27:

- Pengeluaran pembeli bertambah Rp14.000.
- Penghematan pembeli bertambah Rp26.000.
- Jumlah makanan yang dibeli bertambah 2 paket.
- Pendapatan penyedia bertambah Rp14.000.
- Nilai harga normal bertambah Rp40.000.
- Nilai diskon bertambah Rp26.000.

Pada transaksi gratis ID 29, pengeluaran dan pendapatan tidak bertambah karena nilai transaksi Rp0. Jumlah makanan yang dibeli bertambah 2 paket.

### 4. Pengujian Production Build

Pengujian production build dilakukan melalui terminal pada folder frontend dengan menjalankan perintah:

    npm run build

Hasil pengujian menunjukkan proses build berhasil diselesaikan tanpa error.

### 5. Kesimpulan

Berdasarkan pengujian yang telah dilakukan, frontend Vue SisaBaik berhasil terhubung dengan backend dan dapat menjalankan fitur utama sesuai peran pengguna.

Proses pembuatan penawaran, pencarian katalog, pemesanan berbayar dan gratis, pembatalan pesanan, pengelolaan stok, pencatatan pembayaran, serta pembaruan dashboard berhasil diuji.

Pengujian juga menunjukkan bahwa stok dapat dikembalikan ketika pesanan dibatalkan atau ditolak. Selain itu, sistem dapat membedakan transaksi berbayar dan gratis dalam perhitungan dashboard.

Dengan demikian, pengujian fungsional utama Chapter 10 dinyatakan berhasil berdasarkan skenario yang telah dijalankan.

### 6. Status Akhir

Hasil pengujian: BERHASIL.

Dokumentasi ini disusun berdasarkan hasil pengujian aplikasi SisaBaik pada tanggal 10 November 2026.
