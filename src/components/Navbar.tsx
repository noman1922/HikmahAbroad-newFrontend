import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Universities', path: '/universities' },
        { name: 'Courses', path: '/courses' },
        { name: 'About Us', path: '/about' },
        { name: 'Our Service', path: '/services' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24 md:h-28">
                    <Link to="/" className="flex items-center gap-2 group">
                        {/* LOGO PLACEHOLDER: Uncomment the <img> tag below and provide your logo path to replace the icon branding */}
                        <img src="/images/logo3.png" alt="Hikmah Abroad" className="h-24 w-auto object-contain" />



                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="font-medium text-slate-600 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="relative group">
                            <button className="bg-primary hover:bg-opacity-90 text-white px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2">
                                Login <span className="material-symbols-rounded text-sm">expand_more</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                                <Link to="/login?type=agent" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">Agent Login</Link>
                                <Link to="/login?type=student" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">Student Login</Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button className="p-2 text-slate-600" onClick={toggleMenu}>
                            <span className="material-symbols-rounded text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block px-4 py-3 text-lg font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2">
                            <Link
                                to="/login?type=agent"
                                className="w-full bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Agent Login
                            </Link>
                            <Link
                                to="/login?type=student"
                                className="w-full bg-primary text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Student Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
