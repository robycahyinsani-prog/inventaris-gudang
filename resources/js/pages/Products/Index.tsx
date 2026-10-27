import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index() {

    const { products, auth } = usePage().props as any;

    return (
        <AppLayout title="Daftar Produk">
            <Head title="Daftar Produk" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif font-bold text-[#1e4e5f]">Daftar Produk</h1>

                {/* */}
                {auth.user.role === 'admin' && (
                    <Link
                        href="/products/create"
                        className="bg-[#1e4e5f] hover:bg-[#2a657a] text-white font-semibold py-2 px-4 rounded transition duration-200"
                    >
                        + Tambah Produk
                    </Link>
                )}
            </div>

            <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">SKU</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nama Produk</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Kategori</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Harga</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Stok</th>

                            {/* Kolom Aksi hanya muncul untuk Admin */}
                            {auth.user.role === 'admin' && (
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Aksi</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => (
                            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 font-mono text-sm text-gray-600">{product.sku}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                                <td className="px-6 py-4 text-gray-600">{product.category?.name || '-'}</td>
                                <td className="px-6 py-4 text-right text-gray-800">Rp {Number(product.price).toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.stock <= product.min_stock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {product.stock}
                                    </span>
                                </td>

                                {/* Tombol Edit & Hapus hanya muncul untuk Admin */}
                                {auth.user.role === 'admin' && (
                                    <td className="px-6 py-4 text-center space-x-3">
                                        <Link
                                            href={`/products/${product.id}/edit`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/products/${product.id}`}
                                            method="delete"
                                            as="button"
                                            className="text-red-600 hover:text-red-800 font-medium"
                                            onClick={(e) => { if (!confirm('Yakin ingin menghapus produk ini?')) e.preventDefault(); }}
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
