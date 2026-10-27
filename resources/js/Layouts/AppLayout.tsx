import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function AppLayout({ children, title }: { children: ReactNode, title: string }) {
    const { auth } = usePage().props as any;
    const currentUrl = window.location.pathname;

    const menuItems = [
        { name: 'Dashboard', url: '/dashboard' },
        { name: 'Kategori', url: '/categories' },
        { name: 'Produk', url: '/products' },
        { name: 'Transaksi', url: '/transactions' },
    ];

    return (
        <div className="min-h-screen flex bg-[#f4f7f6] font-sans">
            {/* SIDEBAR KIRI */}
            <aside className="w-64 bg-[#1e4e5f] text-white flex flex-col shadow-lg">
                <div className="h-16 flex items-center px-6 border-b border-[#2a657a]">
                    <h1 className="text-2xl font-serif font-bold tracking-wider">Inventaris</h1>
                </div>
                <nav className="flex-1 py-4">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = currentUrl.startsWith(item.url);
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.url}
                                        className={`block px-6 py-3 transition-colors duration-200 ${
                                            isActive 
                                            ? 'bg-[#2a657a] font-bold border-l-4 border-white' 
                                            : 'hover:bg-[#2a657a] opacity-80 hover:opacity-100'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="p-4 border-t border-[#2a657a] text-sm opacity-75">
                    <p>Login sebagai:</p>
                    <p className="font-bold">{auth?.user?.name} ({auth?.user?.role})</p>
                </div>
            </aside>

            {/* KONTEN UTAMA */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* HEADER ATAS */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
                    <h2 className="text-xl font-serif font-bold text-[#1e4e5f]">{title}</h2>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="bg-[#c93b3b] hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-200"
                    >
                        Keluar
                    </Link>
                </header>

                {/* ISI HALAMAN */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}