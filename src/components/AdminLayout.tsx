import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { api } from '../services/api';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
        { name: 'Universities', path: '/admin/universities', icon: 'school' },
        { name: 'Courses', path: '/admin/courses', icon: 'book' },
        { name: 'Services', path: '/admin/services', icon: 'settings_suggest' },
        { name: 'Blogs', path: '/admin/blogs', icon: 'article' },
        { name: 'Inquiries', path: '/admin/inquiries', icon: 'person_search' },
        { name: 'Site Settings', path: '/admin/settings', icon: 'settings' },
    ];

    if (user.role === 'admin') {
        menuItems.push({ name: 'Users', path: '/admin/users', icon: 'person_add' });
    }

    const handleLogout = () => {
        api.logout();
        navigate('/login?type=agent', { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
            {/* Sidebar Backdrop (Mobile only) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`bg-[#06083D] text-white transition-all duration-300 flex flex-col fixed h-full z-50 
                    ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}`}
            >
                <div className="p-6 flex items-center justify-between">
                    {(isSidebarOpen || window.innerWidth < 1024) && (
                        <span className="text-xl font-bold tracking-tight">HIKMAH ADMIN</span>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-rounded">
                            {isSidebarOpen ? 'menu_open' : 'menu'}
                        </span>
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-rounded">{item.icon}</span>
                                {(isSidebarOpen || window.innerWidth < 1024) && <span className="font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-4 text-slate-400 hover:text-red-400 transition-colors w-full p-4 rounded-xl hover:bg-red-400/10 ${!isSidebarOpen && 'lg:justify-center'}`}
                    >
                        <span className="material-symbols-rounded">logout</span>
                        {(isSidebarOpen || window.innerWidth < 1024) && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 min-w-0 
                    ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}
            >
                {/* Header */}
                <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <span className="material-symbols-rounded">menu</span>
                        </button>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800 truncate">
                            {menuItems.find(item => item.path === location.pathname)?.name || 'Admin'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900">{user.name || 'Admin User'}</p>
                            <p className="text-xs text-slate-500">{user.email || 'admin@hikmahabroad.com'}</p>
                        </div>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold border-2 border-slate-200 text-sm">
                            {user.name ? user.name[0].toUpperCase() : 'A'}
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
