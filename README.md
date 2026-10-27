# Sistem Manajemen Inventaris Gudang

Aplikasi web dinamis Full-Stack berbasis server-side untuk sistem manajemen operasional inventaris gudang. Dibuat untuk memenuhi UAS Web Application Development.

## Teknologi yang Digunakan
- **Backend:** Laravel 11 (PHP 8.2)
- **Frontend:** React (Inertia.js) + Tailwind CSS
- **Database:** MySQL

## Fitur Utama
- **Autentikasi:** Login, Register, Logout yang aman.
- **Role-Based Access Control (RBAC):** Admin dapat melakukan CRUD penuh, Staff hanya dapat melihat data.
- **CRUD Kategori:** Tambah, Lihat, Edit, Hapus Kategori.
- **CRUD Produk:** Tambah, Lihat, Edit, Hapus Produk beserta relasi ke Kategori.
- **Transaksi Stok:** Pencatatan barang masuk/keluar yang otomatis memperbarui stok produk.
- **Dashboard Interaktif:** Ringkasan total produk, kategori, stok, dan peringatan stok menipis.

## Informasi Akses (Akun Dummy)
Gunakan akun berikut untuk mencoba aplikasi:
- **Admin:** `admin@example.com` | Password: `password`
- **Staff:** `staff@example.com` | Password: `password`

## Cara Instalasi di Komputer Lokal

Pastikan Anda sudah menginstal **PHP 8.2+**, **Composer**, **Node.js**, dan **MySQL** (XAMPP).

1. Clone repository ini atau ekstrak file project.
2. Buka terminal/CMD di dalam folder project, lalu jalankan:
   ```bash
   composer install
   npm install
3. Copy file .env.example menjadi .env:
    cp .env.example .env
4. Buka phpMyAdmin, buat database baru bernama inventaris_gudang.
5. Buka file .env dan sesuaikan pengaturan database:
    env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=inventaris_gudang
    DB_USERNAME=root
    DB_PASSWORD=
6. Generate application key:
    php artisan key:generate
7. Jalankan migrasi database dan seeder (untuk mengisi data dummy):
    php artisan migrate --seed
8. Jalankan server Laravel:
    php artisan serve
9. Buka terminal baru, jalankan Vite untuk frontend:
    npm run dev
10. Buka browser dan akses http://127.0.0.1:8000.

