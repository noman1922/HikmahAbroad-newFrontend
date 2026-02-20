import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        api.getSettings().then(res => {
            if (res.success) setSettings(res.data);
        });
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = '/#contact';
        }
    };

    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary overflow-hidden p-1">
                                <img src="/images/logo3.png" alt="Hikmah Abroad" className="h-28 w-auto object-contain" />
                            </div>
                            <span className="text-2xl font-display font-extrabold tracking-tight text-white uppercase">{settings?.siteName || 'HIKMAH ABROAD'}</span>
                        </div>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Leading education consultancy for international students in Malaysia. Empowering futures through quality guidance.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.012 3.855.06 1.07.049 1.815.27 2.45.517a4.923 4.923 0 011.745 1.143 4.923 4.923 0 011.142 1.745c.247.636.468 1.38.517 2.45.048 1.07.06 1.425.06 3.855s-.012 2.784-.06 3.855c-.049 1.07-.27 1.815-.517 2.45a4.923 4.923 0 01-1.142 1.745 4.923 4.923 0 01-1.745 1.142c-.636.247-1.38.468-2.45.517-1.07.048-1.425.06-3.855.06s-2.784-.012-3.855-.06c-1.07-.049-1.815-.27-2.45-.517a4.923 4.923 0 011.142-1.745 4.923 4.923 0 011.745-1.142c.636-.247 1.38-.468 2.45-.517 1.07-.048 1.425-.06 3.855-.06zm0 2.25c-2.413 0-2.697.01-3.64.053-.94.043-1.452.193-1.8.33-.459.178-.787.391-1.132.736-.345.345-.558.673-.736 1.132-.136.347-.286.858-.33 1.8-.043.943-.053 1.227-.053 3.64s.01 2.697.053 3.64c.043.94.193 1.452.33 1.8.178.459.391.787.736 1.132.345.345.673.558 1.132.736.347.136.858.286 1.8.33.943.043 1.227.053 3.64.053s2.697-.01 3.64-.053c.94-.043 1.452-.193 1.8-.33.459-.178.787-.391 1.132-.736.345-.345.558-.673.736-1.132.136-.347.286-.858.33-1.8.043-.943.053-1.227.053-3.64s-.01-2.697-.053-3.64c-.043-.94-.193-1.452-.33-1.8-.178-.459-.391-.787-.736-1.132-.345-.345-.673-.558-1.132-.736-.347-.136-.858-.286-1.8-.33-.943-.043-1.227-.053-3.64-.053zm0 2.727a5.023 5.023 0 100 10.046 5.023 5.023 0 000-10.046zm0 8.273a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zm5.222-8.473a1.17 1.17 0 11-2.34 0 1.17 1.17 0 012.34 0z"></path></svg>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-8">Resources</h4>
                        <ul className="space-y-4">
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Partner Universities</button></li>
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Popular Courses</button></li>
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Scholarship Guide</button></li>
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Visa Process</button></li>
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Cost of Living</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-8">Our Services</h4>
                        <ul className="space-y-4">
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Free Consultation</button></li>
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Admission Assistance</button></li>
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Visa Support</button></li>
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Pre-Departure Briefing</button></li>
                            <li><button onClick={scrollToContact} className="hover:text-white transition-colors">Airport Pickup</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-8">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-rounded text-accent">location_on</span>
                                <span>{settings?.footer?.address || 'Bukit Bintang, Kuala Lumpur, Malaysia'}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-rounded text-accent">call</span>
                                <span>{settings?.footer?.phone || '+601139638244'}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-rounded text-accent">mail</span>
                                <span>{settings?.footer?.email || 'hikmahabroad@gmail.com'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm">© {new Date().getFullYear()} All Rights Reserved By {settings?.siteName || 'Hikmah Abroad'}</p>
                    <div className="flex gap-8 text-sm">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
