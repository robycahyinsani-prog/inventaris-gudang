import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create() {
    const { products } = usePage().props as any;

    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        type: 'in',
        quantity: 1,
        note: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions');
    };

    return (
        <>
            <Head title="Catat Transaksi" />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Catat Transaksi Stok</h1>

                <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Pilih Produk</label>
                        <select value={data.product_id} onChange={(e) => setData('product_id', e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="">-- Pilih Produk --</option>
                            {products.map((p: any) => (
                                <option key={p.id} value={p.id}>{p.name} (Stok: {p.stock})</option>
                            ))}
                        </select>
                        {errors.product_id && <div className="text-red-500 text-sm mt-1">{errors.product_id}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tipe Transaksi</label>
                        <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700">
                            <option value="in">Barang Masuk (+)</option>
                            <option value="out">Barang Keluar (-)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah</label>
                        <input type="number" min="1" value={data.quantity} onChange={(e) => setData('quantity', Number(e.target.value))} className="shadow border rounded w-full py-2 px-3 text-gray-700" />
                        {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Catatan (Opsional)</label>
                        <textarea value={data.note} onChange={(e) => setData('note', e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700" rows={2} />
                    </div>

                    <div className="flex items-center space-x-4 mt-6">
                        <button type="submit" disabled={processing} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            {processing ? 'Menyimpan...' : 'Simpan Transaksi'}
                        </button>
                        <Link href="/transactions" className="text-gray-600 hover:underline">Batal</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
