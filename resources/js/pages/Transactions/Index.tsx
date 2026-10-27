import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index() {
    // Pastikan auth diambil di sini
    const { transactions, auth } = usePage().props as any;

    return (
        <AppLayout title="Riwayat Transaksi">
            <Head title="Riwayat Transaksi" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif font-bold text-[#1e4e5f]">Riwayat Transaksi Stok</h1>

                {/* Tombol Catat Transaksi hanya muncul untuk Admin */}
                {auth.user.role === 'admin' && (
                    <Link
                        href="/transactions/create"
                        className="bg-[#1e4e5f] hover:bg-[#2a657a] text-white font-semibold py-2 px-4 rounded transition duration-200"
                    >
                        + Catat Transaksi
                    </Link>
                )}
            </div>

            <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tanggal</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Produk</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Tipe</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Jumlah</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Catatan</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Oleh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((trx: any) => (
                            <tr key={trx.id} className="border-b border-gray-100 hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    {new Date(trx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-800">{trx.product?.name}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${trx.type === 'in' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {trx.type === 'in' ? 'Masuk' : 'Keluar'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-gray-800">{trx.quantity}</td>
                                <td className="px-6 py-4 text-gray-600">{trx.note || '-'}</td>
                                <td className="px-6 py-4 text-gray-600">{trx.user?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
