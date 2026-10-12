# SisaBaik API

## Deskripsi

REST API untuk aplikasi SisaBaik pada Chapter 7 Pengembangan Web.

## Prasyarat

- Node.js
- PostgreSQL
- Database SisaBaik dari Chapter 6

## Menjalankan Server

Gunakan perintah:

npm run dev

## Database

Project menggunakan PostgreSQL dengan database sisabaik_dev.

## Menjalankan Pengujian

Pengujian API dapat dijalankan menggunakan:

node scripts/uji-api.js

Pengujian konkurensi dapat dijalankan menggunakan:

node scripts/uji-konkurensi.js

## Catatan API

Request pembuatan pesanan menggunakan emailPembeli.

## Batasan Aplikasi

Aplikasi masih berjalan secara lokal dan belum menggunakan autentikasi.