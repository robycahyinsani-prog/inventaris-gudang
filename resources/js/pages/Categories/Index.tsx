import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index() {
    const { categories, auth } = usePage().props as any; // <-- Ambil data auth

    return (
        <AppLayout title="Daftar Kategori">
            <Head title="Daftar Kategori" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif font-bold text-[#1e4e5f]">Daftar Kategori</h1>
                {/* Tombol Tambah hanya muncul untuk Admin */}
                {auth.user.role === 'admin' && (
                    <Link href="/categories/create" className="bg-[#1e4e5f] hover:bg-[#2a657a] text-white font-semibold py-2 px-4 rounded transition duration-200">
                        + Tambah Kategori
                    </Link>
                )}
            </div>

            <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nama Kategori</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Deskripsi</th>
                            {/* Kolom Aksi hanya muncul untuk Admin */}
                            {auth.user.role === 'admin' && (
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Aksi</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category: any) => (
                            <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 text-gray-700">{category.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">{category.name}</td>
                                <td className="px-6 py-4 text-gray-600">{category.description || '-'}</td>
                                {/* Tombol Edit & Hapus hanya muncul untuk Admin */}
                                {auth.user.role === 'admin' && (
                                    <td className="px-6 py-4 text-center space-x-3">
                                        <Link href={`/categories/${category.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                                        <Link href={`/categories/${category.id}`} method="delete" as="button" className="text-red-600 hover:text-red-800 font-medium" onClick={(e) => { if (!confirm('Yakin ingin menghapus?')) e.preventDefault(); }}>
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
