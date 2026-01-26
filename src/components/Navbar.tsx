import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-rounded">school</span>
                        </div>
                        <span className="text-2xl font-display font-extrabold tracking-tight text-primary dark:text-white uppercase">HIKMAH ABROAD</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a className="font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors" href="#services">Services</a>
                        <a className="font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors" href="#about">About</a>
                        <a className="font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors" href="#contact">Contact</a>
                        <button className="bg-primary hover:bg-opacity-90 text-white px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2">
                            Get Started <span className="material-symbols-rounded text-sm">arrow_forward</span>
                        </button>
                        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={toggleDarkMode}>
                            {darkMode ? (
                                <span className="material-symbols-rounded block text-amber-400">light_mode</span>
                            ) : (
                                <span className="material-symbols-rounded block">dark_mode</span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={toggleDarkMode}>
                            {darkMode ? (
                                <span className="material-symbols-rounded block text-amber-400">light_mode</span>
                            ) : (
                                <span className="material-symbols-rounded block">dark_mode</span>
                            )}
                        </button>
                        <button className="p-2 text-slate-600 dark:text-slate-300" onClick={toggleMenu}>
                            <span className="material-symbols-rounded text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <a className="block px-4 py-3 text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all" href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
                        <a className="block px-4 py-3 text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all" href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                        <a className="block px-4 py-3 text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                        <div className="pt-4">
                            <button className="w-full bg-primary hover:bg-opacity-90 text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                Get Started <span className="material-symbols-rounded text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
