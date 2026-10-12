# Dokumentasi API SisaBaik

## Base URL
[http://127.0.0.1:3000](http://127.0.0.1:3000)

## Format Response
Semua response API menggunakan format JSON. Response dapat berisi `success`, `data`, `meta`, atau `error` sesuai dengan hasil request.

### Contoh Response Berhasil

Contoh response dari endpoint GET /api/health:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "database": "connected",
    "waktu": "2026-10-12T09:24:33.356Z"
  }
}
```

### Contoh Response Error

Response ketika request gagal, misalnya karena data yang dikirim tidak valid:

```json
{
  "success": false,
  "error": {
    "message": "Data tidak valid"
  }
}
```

## Endpoint Health

Server dan koneksi database dapat diperiksa melalui endpoint health.

GET /api/health

Response berhasil menggunakan status HTTP 200 dan menunjukkan bahwa API serta database terhubung.

## Endpoint Penawaran

### GET /api/penawaran

Digunakan untuk mengambil daftar penawaran.

Query yang didukung:

\- q

\- kategori

\- status

\- tersedia

\- page

\- limit

Response berhasil menggunakan status HTTP 200.

### GET /api/penawaran/:id

Digunakan untuk mengambil satu penawaran berdasarkan ID.

Jika ID tidak ditemukan, API mengembalikan HTTP 404. ID yang tidak valid ditolak dengan HTTP 400.

### POST /api/penawaran

Digunakan untuk membuat penawaran baru.

Request menggunakan JSON dan membutuhkan field penawaran sesuai validasi API.

Jika data valid, API mengembalikan HTTP 201 dan Location menuju resource yang dibuat. Jika data tidak valid, API mengembalikan HTTP 400.

#### Field Request

Field yang digunakan pada request mengikuti validasi penawaran yang diterapkan pada API.

### PUT /api/penawaran/:id

Digunakan untuk mengubah data penawaran berdasarkan ID.

PUT menggunakan data penawaran lengkap sesuai validasi API. ID dan penyedia dari resource tidak diubah melalui request.

Jika berhasil, API mengembalikan HTTP 200.

#### Field Request

PUT menggunakan data penawaran lengkap sesuai validasi API.

### DELETE /api/penawaran/:id

Digunakan untuk menghapus penawaran.

Jika berhasil, API mengembalikan HTTP 204 tanpa body. Penawaran yang sudah memiliki riwayat pesanan ditolak dengan HTTP 409.

## Endpoint Pesanan

### GET /api/pesanan

Digunakan untuk mengambil daftar pesanan.

Response berhasil menggunakan HTTP 200.

### GET /api/pesanan/:id

Digunakan untuk mengambil satu pesanan berdasarkan ID.

Response berhasil menggunakan HTTP 200 jika pesanan ditemukan. Status ketika pesanan tidak ditemukan harus disesuaikan dengan implementasi API.

### POST /api/pesanan

Digunakan untuk membuat pesanan baru.

Request menggunakan JSON dengan `emailPembeli` dan daftar `items`. Setiap item memiliki `penawaranId` dan `kuantitas`.

Satu pesanan hanya boleh menggunakan penawaran dari satu penyedia.

Jika berhasil, API mengembalikan HTTP 201.

## Query yang Didukung

Endpoint GET /api/penawaran mendukung query berikut:

\- `q` untuk pencarian berdasarkan nama.

\- `kategori` untuk filter kategori.

\- `status` untuk filter status.

\- `tersedia` untuk filter ketersediaan stok.

\- `page` untuk menentukan halaman.

\- `limit` untuk menentukan jumlah data per halaman.

Query dapat digunakan secara bersamaan.

### Ketentuan Pagination

\- `page` dimulai dari 1, dengan rentang 1–10000.

\- `limit` memiliki nilai default 10, dengan rentang 1–50.

\- `tersedia=true` digunakan untuk menampilkan penawaran yang berstatus aktif, memiliki stok lebih dari nol, dan belum melewati tanggal kedaluwarsa.

Contoh penggunaan:

`GET /api/penawaran?q=roti&kategori=roti&tersedia=true&page=1&limit=2`

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

## Pengujian API

Pengujian dilakukan untuk memastikan endpoint dan aturan bisnis API berjalan sesuai harapan.

Pengujian mencakup:

\- Pemeriksaan status server dan koneksi database.

\- Pengambilan, pembuatan, perubahan, dan penghapusan penawaran.

\- Pengujian pencarian, filter, dan pagination.

\- Pembuatan pesanan dengan input valid dan tidak valid.

\- Pengujian validasi stok dan konflik penyedia.

\- Pemeriksaan snapshot harga pada detail pesanan.

\- Pengujian penolakan penghapusan penawaran yang memiliki riwayat pesanan.

Hasil pengujian harus dicatat berdasarkan hasil aktual dari API.