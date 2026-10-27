import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit() {
    const { product, categories } = usePage().props as any;

    const { data, setData, put, processing, errors } = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        sku: product.sku || '',
        stock: product.stock || 0,
        price: product.price || 0,
        min_stock: product.min_stock || 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <>
            <Head title="Edit Produk" />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>

                <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                        >
                            <option value="">-- Pilih Kategori --</option>
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nama Produk</label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">SKU (Kode Unik)</label>
                        <input type="text" value={data.sku} onChange={(e) => setData('sku', e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
                        {errors.sku && <div className="text-red-500 text-sm mt-1">{errors.sku}</div>}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Stok</label>
                            <input type="number" value={data.stock} onChange={(e) => setData('stock', Number(e.target.value))} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Harga (Rp)</label>
                            <input type="number" value={data.price} onChange={(e) => setData('price', Number(e.target.value))} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Min. Stok</label>
                            <input type="number" value={data.min_stock} onChange={(e) => setData('min_stock', Number(e.target.value))} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-6">
                        <button type="submit" disabled={processing} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                            {processing ? 'Menyimpan...' : 'Update Produk'}
                        </button>
                        <Link href="/products" className="text-gray-600 hover:underline">Batal</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
