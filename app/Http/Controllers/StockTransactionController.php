<?php

namespace App\Http\Controllers;

use App\Models\StockTransaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StockTransactionController extends Controller
{
    public function index()
    {
        $transactions = StockTransaction::with(['product', 'user'])->latest()->get();
        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions
        ]);
    }

    public function create()
    {
        $products = Product::all();
        return Inertia::render('Transactions/Create', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'type' => 'required|in:in,out',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string'
        ]);

        DB::transaction(function () use ($request) {
            $product = Product::findOrFail($request->product_id);

            // Cek jika stok tidak cukup saat barang keluar
            if ($request->type === 'out' && $product->stock < $request->quantity) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'quantity' => 'Stok tidak mencukupi untuk transaksi keluar.'
                ]);
            }

            // Catat transaksi
            StockTransaction::create([
                'product_id' => $request->product_id,
                'user_id' => Auth::id(),
                'type' => $request->type,
                'quantity' => $request->quantity,
                'note' => $request->note,
            ]);

            // Update stok produk
            if ($request->type === 'in') {
                $product->increment('stock', $request->quantity);
            } else {
                $product->decrement('stock', $request->quantity);
            }
        });

        return redirect()->route('transactions.index')->with('success', 'Transaksi berhasil dicatat.');
    }
}
