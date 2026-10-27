import { Head, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const { total_products, total_categories, total_stock, low_stock_products, recent_transactions, chart_data } = usePage().props as any;

    return (
        <AppLayout title="Dashboard Inventaris">
            <Head title="Dashboard" />

            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Total Barang</h3>
                    <p className="text-4xl font-bold text-[#1e4e5f]">{total_products}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Jumlah Kategori</h3>
                    <p className="text-4xl font-bold text-[#1e4e5f]">{total_categories}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Total Unit Stok</h3>
                    <p className="text-4xl font-bold text-[#1e4e5f]">{total_stock}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Stok Menipis</h3>
                    <p className="text-4xl font-bold text-red-600">{low_stock_products.length}</p>
                </div>
            </div>
                        {/* GRAFIK PERGERAKAN STOK */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h2 className="text-lg font-serif font-bold mb-4 text-[#1e4e5f] border-b pb-2">Grafik Pergerakan Stok (7 Hari Terakhir)</h2>
                <div className="h-72 w-full">
                    {chart_data.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-400">Belum ada data transaksi untuk digrafikkan.</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chart_data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="date" tick={{fill: '#6b7280'}} tickLine={false} axisLine={false} />
                                <YAxis tick={{fill: '#6b7280'}} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                                <Bar dataKey="total_in" name="Barang Masuk" fill="#1e4e5f" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="total_out" name="Barang Keluar" fill="#c93b3b" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Peringatan Stok Menipis */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-serif font-bold mb-4 text-[#1e4e5f] border-b pb-2">Peringatan Stok</h2>
                    {low_stock_products.length === 0 ? (
                        <p className="text-gray-500">Semua stok dalam kondisi aman.</p>
                    ) : (
                        <ul className="space-y-3">
                            {low_stock_products.map((product: any) => (
                                <li key={product.id} className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium text-gray-700">{product.name}</span>
                                    <span className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1 rounded-full border border-red-100">Sisa: {product.stock}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Riwayat Transaksi Terakhir */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-serif font-bold mb-4 text-[#1e4e5f] border-b pb-2">Aktivitas Terakhir</h2>
                    {recent_transactions.length === 0 ? (
                        <p className="text-gray-500">Belum ada aktivitas transaksi.</p>
                    ) : (
                        <ul className="space-y-3">
                            {recent_transactions.map((trx: any) => (
                                <li key={trx.id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="font-medium text-gray-700">{trx.product?.name}</p>
                                        <p className="text-xs text-gray-400">{new Date(trx.created_at).toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <span className={`font-bold px-2 py-1 rounded ${trx.type === 'in' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                        {trx.type === 'in' ? '+' : '-'}{trx.quantity}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
