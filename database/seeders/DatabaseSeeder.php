<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Akun Admin dan Staff
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Staff Gudang',
            'email' => 'staff@example.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        // 2. Buat Kategori
        $elektronik = Category::create([
            'name' => 'Elektronik',
            'description' => 'Barang-barang elektronik dan aksesoris'
        ]);

        $atk = Category::create([
            'name' => 'Alat Tulis Kantor',
            'description' => 'Perlengkapan ATK'
        ]);

        // 3. Buat Produk Contoh
        Product::create([
            'category_id' => $elektronik->id,
            'name' => 'Mouse Wireless',
            'sku' => 'ELK-001',
            'stock' => 50,
            'price' => 150000,
            'min_stock' => 10,
        ]);

        Product::create([
            'category_id' => $elektronik->id,
            'name' => 'Keyboard Mekanik',
            'sku' => 'ELK-002',
            'stock' => 20,
            'price' => 450000,
            'min_stock' => 5,
        ]);

        Product::create([
            'category_id' => $atk->id,
            'name' => 'Pulpen Gel',
            'sku' => 'ATK-001',
            'stock' => 100,
            'price' => 5000,
            'min_stock' => 20,
        ]);
    }
}
