<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockTransactionController;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // --- HALAMAN DASHBOARD ---
    Route::get('/dashboard', function () {
        return \Inertia\Inertia::render('Dashboard', [
            'total_products' => \App\Models\Product::count(),
            'total_categories' => \App\Models\Category::count(),
            'total_stock' => \App\Models\Product::sum('stock'),
            'low_stock_products' => \App\Models\Product::whereColumn('stock', '<=', 'min_stock')->get(),
            'recent_transactions' => \App\Models\StockTransaction::with('product')->latest()->take(5)->get(),
            'chart_data' => \App\Models\StockTransaction::selectRaw('DATE(created_at) as date, SUM(CASE WHEN type = "in" THEN quantity ELSE 0 END) as total_in, SUM(CASE WHEN type = "out" THEN quantity ELSE 0 END) as total_out')->groupBy('date')->orderBy('date', 'asc')->take(7)->get(),
        ]);
    })->name('dashboard');

    // --- RUTE UNTUK SEMUA ROLE (Hanya Melihat) ---
    Route::resource('categories', CategoryController::class)->only(['index']);
    Route::resource('products', ProductController::class)->only(['index']);
    Route::resource('transactions', StockTransactionController::class)->only(['index']);

    // --- RUTE KHUSUS ADMIN (Tambah, Edit, Hapus) ---
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('categories', CategoryController::class)->except(['index']);
        Route::resource('products', ProductController::class)->except(['index']);
        Route::resource('transactions', StockTransactionController::class)->except(['index']);
    });

}); // <--- INI KURUNG PENUTUP GRUP MIDDLEWARE UTAMA

require __DIR__.'/auth.php';
