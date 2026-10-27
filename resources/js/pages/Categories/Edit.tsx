import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit() {
    const { category } = usePage().props as any;

    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/categories/${category.id}`);
    };

    return (
        <>
            <Head title="Edit Kategori" />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Edit Kategori</h1>

                <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nama Kategori</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Deskripsi (Opsional)</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows={3}
                        />
                    </div>

                    <div className="flex items-center space-x-4 mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                        >
                            {processing ? 'Menyimpan...' : 'Update Kategori'}
                        </button>
                        <Link href="/categories" className="text-gray-600 hover:underline">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
