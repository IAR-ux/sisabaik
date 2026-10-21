# Dokumentasi API SisaBaik

## Base URL

`http://127.0.0.1:3000`

## Format Response

Response API menggunakan JSON dengan struktur yang dapat berisi `success`, `data`, `meta`, atau `error`.

## Health

### GET `/api/health`

Memeriksa status server dan koneksi database. Endpoint ini dapat diakses tanpa login.

- `200`: server berjalan dan database terhubung.

## Autentikasi

Semua endpoint berikut menggunakan prefix `/api/auth`.

### POST `/api/auth/registrasi`

Mendaftarkan akun pembeli. Validasi data dan peran dilakukan oleh server. Klien tidak dapat memilih peran secara bebas.

Middleware pembatasan registrasi diterapkan pada endpoint ini.

### POST `/api/auth/registrasi-penyedia`

Mendaftarkan akun penyedia beserta data profil usaha sesuai validasi server.

Akun penyedia harus melalui proses persetujuan sebelum dapat menggunakan fitur penyedia yang dilindungi, sesuai aturan aplikasi.

Middleware pembatasan registrasi diterapkan pada endpoint ini.

### POST `/api/auth/login`

Memverifikasi kredensial dan menghasilkan token autentikasi apabila berhasil. Endpoint ini dilindungi middleware pembatasan percobaan autentikasi.

Kredensial yang tidak valid menghasilkan respons generik agar tidak membocorkan apakah suatu email terdaftar.

### GET `/api/auth/saya`

Mengambil informasi akun yang sedang terautentikasi. Membutuhkan token autentikasi yang valid.

### POST `/api/auth/logout`

Mengakhiri sesi pengguna yang sedang login. Membutuhkan token autentikasi yang valid.

Token lama harus ditolak setelah logout sesuai mekanisme versi token yang diterapkan server.

## Endpoint Penawaran

### GET `/api/penawaran`

Mengambil daftar penawaran yang boleh dilihat publik.

Query yang didukung:

- `q`: pencarian berdasarkan nama.
- `kategori`: filter kategori.
- `status`: filter status sesuai kebijakan endpoint.
- `tersedia`: filter ketersediaan stok.
- `page`: nomor halaman.
- `limit`: jumlah data per halaman.

Penawaran yang tidak dipublikasikan tidak boleh ditampilkan sebagai penawaran publik.

### GET `/api/penawaran/milik-saya`

Mengambil daftar penawaran milik penyedia yang sedang login.

Membutuhkan autentikasi dan peran penyedia. Hasil dan metadata pagination, termasuk jumlah data, harus dibatasi pada penawaran milik penyedia tersebut.

### GET `/api/penawaran/:id`

Mengambil detail penawaran yang boleh diakses berdasarkan kebijakan publik atau otorisasi endpoint.

- `400`: ID tidak valid.
- `404`: penawaran tidak ditemukan atau tidak boleh diakses melalui endpoint tersebut.

### POST `/api/penawaran`

Membuat penawaran baru.

Membutuhkan autentikasi dan peran penyedia yang telah disetujui. Identitas penyedia diambil dari akun terautentikasi di server, bukan dari `penyediaId` yang dikirim klien.

Jika berhasil, API mengembalikan `201`.

### PUT `/api/penawaran/:id`

Mengubah penawaran milik penyedia yang sedang login.

Membutuhkan autentikasi, peran penyedia yang sesuai, validasi input, dan pemeriksaan kepemilikan di server. Klien tidak dapat mengubah pemilik penawaran dengan mengirim ID penyedia lain.

### DELETE `/api/penawaran/:id`

Menghapus penawaran sesuai aturan bisnis dan pemeriksaan kepemilikan.

- `204`: penghapusan berhasil.
- `404`: penawaran tidak ditemukan atau bukan milik pengguna yang mengakses.
- `409`: konflik bisnis jika penawaran memiliki riwayat pesanan, sesuai implementasi.

## Endpoint Pesanan

Semua endpoint pesanan membutuhkan autentikasi. Peran yang diizinkan adalah pembeli dan penyedia yang telah terverifikasi.

### GET `/api/pesanan`

Mengambil daftar pesanan sesuai cakupan akses pengguna yang login.

- Pembeli hanya dapat melihat pesanan miliknya.
- Penyedia hanya dapat melihat pesanan yang terkait dengan penawarannya sesuai aturan otorisasi server.

### GET `/api/pesanan/:id`

Mengambil detail pesanan berdasarkan ID setelah server memeriksa hak akses pengguna.

- `200`: pesanan ditemukan dan boleh diakses.
- `404`: pesanan tidak ditemukan atau tidak boleh diakses oleh pengguna tersebut.

### POST `/api/pesanan`

Membuat pesanan baru. Endpoint ini hanya boleh diakses oleh pembeli yang telah login.

Request menggunakan JSON berisi daftar `items`. Setiap item memiliki `penawaranId` dan `kuantitas` sesuai validasi server.

Identitas pembeli ditentukan berdasarkan akun yang terautentikasi, bukan berdasarkan `emailPembeli` dari klien. Klien juga tidak dapat menentukan pemilik penawaran melalui `penyediaId`.

Semua penawaran dalam satu pesanan harus berasal dari satu penyedia. Stok divalidasi dan perubahan database dilakukan melalui transaksi.

Jika berhasil, API mengembalikan `201`.

## Profil Penyedia

Profil penyedia terkait dengan akun pengguna yang terdaftar. Data profil usaha dan status persetujuan dikelola sesuai aturan aplikasi.

Akses fitur penyedia memerlukan autentikasi, peran yang sesuai, serta persetujuan jika diwajibkan. Field profil yang dapat dibuat atau diubah mengikuti validasi pada implementasi server.

## Status HTTP dan Error

| Status | Arti |
|---|---|
| `200` | Request berhasil. |
| `201` | Resource berhasil dibuat. |
| `204` | Request berhasil tanpa response body. |
| `400` | Input atau parameter tidak valid. |
| `401` | Token tidak ada, tidak valid, kedaluwarsa, atau sesi tidak lagi berlaku. |
| `403` | Pengguna terautentikasi tetapi tidak memiliki peran atau izin yang diperlukan. |
| `404` | Resource tidak ditemukan atau disembunyikan karena pembatasan akses. |
| `409` | Konflik aturan bisnis. |
| `413` | Ukuran request body melebihi batas. |
| `415` | Content-Type tidak sesuai untuk request yang membutuhkan JSON. |
| `429` | Batas jumlah request terlampaui. |

Struktur pesan error mengikuti format respons yang diterapkan server.

## Keamanan

- Kata sandi disimpan sebagai hash dengan salt dan work factor, bukan teks biasa.
- Token diverifikasi server sebelum identitas pengguna dipercaya.
- Server memeriksa status akun dan versi token sesuai implementasi autentikasi.
- Otorisasi dilakukan di server berdasarkan peran dan kepemilikan data.
- Registrasi pembeli dan penyedia menggunakan endpoint terpisah.
- Endpoint autentikasi memiliki pembatasan jumlah request sesuai konfigurasi.
- Jangan menuliskan token, kata sandi, hash kata sandi, atau nilai rahasia lingkungan dalam dokumentasi dan log.

## Pengujian

Pengujian autentikasi dijalankan menggunakan:

`npm run auth:test`

Catat hasil pengujian aktual pada `docs/hasil-uji-chapter8.md`. Dokumentasikan status HTTP, perilaku penolakan akses, dan bukti pemeriksaan kepemilikan tanpa mencantumkan rahasia.
