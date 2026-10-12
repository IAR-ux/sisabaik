# Dokumentasi API SisaBaik

## Base URL
http://127.0.0.1:3000

## Format Response
Semua response API menggunakan format JSON. Response dapat berisi `success`, `data`, `meta`, atau `error` sesuai dengan hasil request.

### Contoh Response Berhasil
Response berhasil menggunakan `success: true` dan hasil request berada pada bagian `data`.

### Contoh Response Error

Response error menggunakan `success: false` dan informasi kesalahan berada pada bagian `error`.

## Endpoint Health
Server dan koneksi database dapat diperiksa melalui endpoint health.

GET /api/health

Response berhasil menggunakan status HTTP 200 dan menunjukkan bahwa API serta database terhubung.

## Endpoint Penawaran

### GET /api/penawaran
Digunakan untuk mengambil daftar penawaran.

Query yang didukung:
- q
- kategori
- status
- tersedia
- page
- limit

Response berhasil menggunakan status HTTP 200.

### GET /api/penawaran/:id
Digunakan untuk mengambil satu penawaran berdasarkan ID.

Jika ID tidak ditemukan, API mengembalikan HTTP 404.
ID yang tidak valid ditolak dengan HTTP 400.

### POST /api/penawaran
Digunakan untuk membuat penawaran baru.

Request menggunakan JSON dan membutuhkan field penawaran sesuai validasi API.

Jika data valid, API mengembalikan HTTP 201 dan Location menuju resource yang dibuat.
Jika data tidak valid, API mengembalikan HTTP 400.

#### Field Request
Field yang digunakan pada request mengikuti validasi penawaran yang diterapkan pada API.

### PUT /api/penawaran/:id
Digunakan untuk mengubah data penawaran berdasarkan ID.

PUT menggunakan data penawaran lengkap sesuai validasi API.
ID dan penyedia dari resource tidak diubah melalui request.

Jika berhasil, API mengembalikan HTTP 200.

#### Field Request
PUT menggunakan data penawaran lengkap sesuai validasi API.

### DELETE /api/penawaran/:id
Digunakan untuk menghapus penawaran.

Jika berhasil, API mengembalikan HTTP 204 tanpa body.
Penawaran yang sudah memiliki riwayat pesanan ditolak dengan HTTP 409.

## Endpoint Pesanan

### GET /api/pesanan
Digunakan untuk mengambil daftar pesanan.
Response berhasil menggunakan HTTP 200.

### POST /api/pesanan
Digunakan untuk membuat pesanan baru.

Request menggunakan JSON dengan emailPembeli dan daftar items.
Setiap item memiliki penawaranId dan kuantitas.

Satu pesanan hanya boleh menggunakan penawaran dari satu penyedia.

Jika berhasil, API mengembalikan HTTP 201.

## Query yang Didukung
Endpoint GET /api/penawaran mendukung query berikut:

- `q` untuk pencarian berdasarkan nama.
- `kategori` untuk filter kategori.
- `status` untuk filter status.
- `tersedia` untuk filter ketersediaan stok.
- `page` untuk menentukan halaman.
- `limit` untuk menentukan jumlah data per halaman.

Query dapat digunakan secara bersamaan.

## Status Error
API menggunakan status HTTP untuk membedakan hasil request.

400 digunakan untuk input atau parameter yang tidak valid.
404 digunakan ketika resource tidak ditemukan.
409 digunakan untuk konflik bisnis seperti stok tidak cukup, satu penyedia tidak terpenuhi, atau penawaran memiliki riwayat pesanan.
415 digunakan ketika Content-Type bukan JSON untuk request yang membutuhkan JSON.
413 digunakan ketika ukuran request body melebihi batas.

## Aturan Pesanan
Pesanan harus memiliki pembeli yang valid.

Item dalam pesanan harus valid dan tidak boleh duplikat.

Semua penawaran dalam satu pesanan harus berasal dari satu penyedia.

Stok harus mencukupi sebelum pesanan dibuat.

Pembuatan pesanan menggunakan transaksi database sehingga perubahan dibatalkan apabila terjadi kegagalan.

Harga pada detail pesanan disimpan sebagai snapshot sehingga perubahan harga penawaran tidak mengubah harga pada pesanan yang sudah dibuat.