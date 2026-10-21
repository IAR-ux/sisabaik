# Hasil Pengujian Chapter 8 — Autentikasi dan Otorisasi

## 1. Tujuan
Menguji autentikasi, validitas token, sesi, dan pembatasan akses akun pada API SisaBaik.

## 2. Hasil Pengujian

### Pengujian 1 — Pengujian Otomatis
- **Skenario:** Menjalankan `npm run auth:test`.
- **Hasil aktual:** Semua pengujian lulus.
- **Status:** LULUS.

### Pengujian 2 — Token Valid Rina
- **Skenario:** Mengakses `/api/auth/saya` menggunakan token Rina.
- **Hasil aktual:** HTTP 200.
- **Status:** LULUS.

### Pengujian 3 — Token Setelah Logout
- **Skenario:** Menggunakan token lama setelah logout.
- **Hasil aktual:** HTTP 401.
- **Status:** LULUS.

### Pengujian 4 — Token Kedaluwarsa
- **Skenario:** Menggunakan token setelah 15 menit.
- **Hasil aktual:** HTTP 401.
- **Status:** LULUS.

### Pengujian 5 — Akun Dinonaktifkan
- **Skenario:** Menggunakan token Andi saat akun dinonaktifkan.
- **Hasil aktual:** HTTP 401.
- **Status:** LULUS.

### Pengujian 6 — Login Setelah Akun Diaktifkan
- **Skenario:* Login kembali sebagai Andi setelah akun diaktifkan.
- **Hasil aktual:** Login berhasil berdasarkan konfirmasi pengujian.
- **Status:** LULUS, berdasarkan konfirmasi pengguna.

### Pengujian 7 — Pembatasan Daftar Pesanan Pembeli
- **Skenario:** Mengakses `GET /api/pesanan` menggunakan token Andi Baru.
- **Hasil aktual:** HTTP 200, `success: true`, `data: []`, dan `meta.jumlah: 0`.
- **Analisis:** API mengembalikan daftar kosong karena tidak ada pesanan dalam cakupan Andi. Pesanan milik pembeli lain tidak ditampilkan.
- **Status:** LULUS.

### Pengujian 8 — Budi Mengubah Penawaran Milik Rina
- **Skenario:** Budi mengirim permintaan `PUT /api/penawaran/20` untuk mengubah harga penawaran milik Rina.
- **Hasil aktual:** HTTP 404 dengan kode `OFFER_NOT_FOUND`.
- **Respons:** `Penawaran tidak ditemukan.`
- **Analisis:** API menolak perubahan karena penawaran tersebut bukan milik Budi.
- **Status:** LULUS.

### Pengujian 9 — Pembatasan Akses Pesanan Milik Pengguna Lain
- **Skenario:** Login sebagai Andi (`andi.baru@example.test`), lalu mengakses `GET /api/pesanan/11`, yaitu pesanan milik Siti.
- **Hasil aktual:** HTTP 404 Not Found dengan kode `ORDER_NOT_FOUND` dan pesan `Pesanan tidak ditemukan.`
- **Analisis:** API tidak memberikan akses kepada Andi untuk membaca pesanan milik Siti.
- **Status:** LULUS.

### Pengujian 10 — Akses Daftar Pesanan Tanpa Token
- **Skenario:** Mengakses `GET /api/pesanan` tanpa menyertakan token autentikasi.
- **Hasil aktual:** HTTP 401 Unauthorized dengan kode `AUTH_REQUIRED` dan pesan `Silakan login terlebih dahulu.`
- **Analisis:** API menolak permintaan karena pengguna belum melakukan autentikasi.
- **Status:** LULUS.

### Pengujian 11 — Penolakan Token Tidak Valid
- **Skenario:** Mengakses `GET /api/pesanan` menggunakan token palsu `token-palsu-123`.
- **Hasil aktual:** HTTP 401 Unauthorized dengan kode `TOKEN_INVALID` dan pesan `Token tidak valid.`
- **Analisis:** API menolak token yang tidak valid dan tidak memberikan akses ke data pesanan.
- **Status:** LULUS.

### Pengujian 12 — Login dengan Kata Sandi Salah
- **Skenario:** Login menggunakan email Rina (`rina.baru@example.test`) dengan kata sandi yang salah.
- **Hasil aktual:** HTTP 401 Unauthorized dengan kode `LOGIN_FAILED` dan pesan `Email atau kata sandi tidak valid.`
- **Analisis:** API menolak autentikasi dan tidak memberikan akses kepada pengguna dengan kredensial yang salah.
- **Status:** LULUS.

### Pengujian 13 — Login dengan Email Tidak Terdaftar
- **Skenario:** Login menggunakan email `tidak.terdaftar@example.test` yang tidak terdaftar di database.
- **Hasil aktual:** HTTP 401 Unauthorized dengan kode `LOGIN_FAILED` dan pesan `Email atau kata sandi tidak valid.`
- **Analisis:** API menolak autentikasi dan menggunakan pesan kesalahan yang sama seperti ketika kata sandi salah.
- **Status:** LULUS.

### Pengujian 14 — Pembeli Tidak Diizinkan Membuat Penawaran
- **Skenario:** Login sebagai Andi (`andi.baru@example.test`) dengan peran `pembeli`, lalu mengirim permintaan `POST /api/penawaran`.
- **Hasil aktual:** HTTP 403 Forbidden dengan kode `ROLE_FORBIDDEN` dan pesan `Peran Anda tidak diizinkan.`
- **Analisis:** API menolak pembuatan penawaran karena akun Andi memiliki peran pembeli, bukan penyedia.
- **Status:** LULUS.

### Pengujian 15 — Penyedia Tidak Diizinkan Membuat Pesanan
- **Skenario:** Login sebagai Rina (`rina.baru@example.test`) dengan peran `penyedia`, lalu mengirim permintaan `POST /api/pesanan`.
- **Hasil aktual:** HTTP 403 Forbidden dengan kode `ROLE_FORBIDDEN` dan pesan `Peran Anda tidak diizinkan.`
- **Analisis:** API menolak pembuatan pesanan karena akun Rina memiliki peran penyedia.
- **Status:** LULUS.

### Pengujian 16 — Penolakan Identitas Palsu dalam Pesanan
- **Skenario:** Login sebagai Andi (`andi.baru@example.test`), lalu mengirim `POST /api/pesanan` dengan item penawaran 20 dan properti tambahan `emailPembeli` serta `penyediaId`.
- **Hasil aktual:** HTTP 400 Bad Request dengan kode `VALIDATION_ERROR` dan pesan `Body mengandung kolom yang tidak didukung.`
- **Analisis:** API menolak kolom tambahan yang tidak didukung sehingga pembeli tidak dapat menetapkan identitas pembeli atau penyedia melalui properti tersebut.
- **Status:** LULUS.

### Pengujian 17 — Penawaran Draft Tidak Dapat Diakses Publik
- **Skenario:** Mengakses `GET /api/penawaran/19`, yaitu penawaran milik Rina yang berstatus `draft`.
- **Hasil aktual:** HTTP 404 Not Found dengan kode `OFFER_NOT_FOUND` dan pesan `Penawaran tidak ditemukan.`
- **Analisis:** API tidak menampilkan penawaran draft melalui endpoint publik.
- **Status:** LULUS.

### Pengujian 18 — Penyedia Melihat Penawaran Miliknya
- **Skenario:** Login sebagai Rina (`rina.baru@example.test`), lalu mengakses `GET /api/penawaran/milik-saya`.
- **Hasil aktual:** HTTP 200 dengan `success: true`. Respons menampilkan dua penawaran milik penyedia Rina, yaitu penawaran ID 20 berstatus aktif dan penawaran ID 19 berstatus draft.
- **Analisis:** Endpoint menampilkan penawaran yang terkait dengan penyedia yang sedang login. Penawaran draft tetap terlihat melalui endpoint milik sendiri, tetapi tidak ditampilkan melalui endpoint publik.
- **Status:** LULUS.



## 3. Kesimpulan Sementara
Pengujian menunjukkan bahwa API dapat menerima token yang valid dan menolak token yang telah dicabut, kedaluwarsa, atau terkait dengan akun nonaktif.

## 4. Catatan
Hasil pengujian lainnya akan ditambahkan setelah setiap skenario selesai diuji.