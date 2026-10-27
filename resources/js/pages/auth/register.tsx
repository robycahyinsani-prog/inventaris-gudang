import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f7f6] py-10">
            <Head title="Register" />

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-[#1e4e5f] tracking-wider mb-2">Inventaris</h1>
                    <p className="text-gray-500">Buat akun baru</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#1e4e5f] focus:border-[#1e4e5f] outline-none transition"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#1e4e5f] focus:border-[#1e4e5f] outline-none transition"
                            required
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#1e4e5f] focus:border-[#1e4e5f] outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#1e4e5f] focus:border-[#1e4e5f] outline-none transition"
                            required
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#1e4e5f] hover:bg-[#2a657a] text-white font-bold py-2.5 rounded transition duration-200 mt-4"
                    >
                        {processing ? 'Memproses...' : 'Daftar'}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Sudah punya akun?{' '}
                    <Link href={route('login')} className="text-[#1e4e5f] font-semibold hover:underline">
                        Masuk di sini
                    </Link>
                </div>
            </div>
        </div>
    );
}
