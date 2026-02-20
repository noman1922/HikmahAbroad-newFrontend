import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Hero: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        api.getSettings().then(res => {
            if (res.success && res.data) setSettings(res.data);
        });
    }, []);

    const heroData = settings?.hero || {
        title: "Expert Guidance For International Students In Malaysia",
        subtitle: "We simplify everything—from choosing the perfect university to obtaining your student visa. Your dream education in Malaysia starts here.",
        banners: ["https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1974&auto=format&fit=crop"]
    };

    const mainBanner = (heroData.banners && heroData.banners.length > 0 && heroData.banners[0])
        ? heroData.banners[0]
        : "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1974&auto=format&fit=crop";

    return (
        <section className="relative pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0 text-[#06083D]">
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 uppercase tracking-wider">Trusted by 10,000+ Students</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold text-slate-900 border-none leading-[1.1] mb-6">
                            {heroData.title.split('Malaysia')[0]}
                            <span className="text-accent">Malaysia</span>
                            {heroData.title.split('Malaysia')[1]}
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
                            {heroData.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <div className="flex-grow flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-2 border border-slate-100 gap-2">
                                <div className="flex items-center w-full px-4">
                                    <span className="material-symbols-rounded text-slate-400">search</span>
                                    <input className="w-full bg-transparent border-none focus:ring-0 text-slate-900 px-4 py-3 placeholder:text-slate-400 outline-none" placeholder="Search for your ideal university..." type="text" />
                                </div>
                                <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 sm:py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all whitespace-nowrap" onClick={() => window.location.href = "/universities"}>Find Now</button>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-3xl font-bold text-slate-900">39+</p>
                                <p className="text-sm text-slate-500">Partner Universities</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div>
                                <p className="text-3xl font-bold text-slate-900">950+</p>
                                <p className="text-sm text-slate-500">Visas Processed</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div>
                                <div className="flex -space-x-2">
                                    <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2WYeHrMj4ncgGUqd_lBAKfB2z5fz6RtuO0BA4ZGdhLvk3SgwOQjRLupMxv6b2s9N2aNlUzkIPP7GHKQbhRVv0Wqc2JKPJlLjQPTRyK4WpJmbKT_0284Xw0a5s-36Fl8jYcYiPTjiJOvyCqk9nDQ7Z9P1-nFTmLO6Kl4LNBTiGUo9r6EML6JxWAbQtQpzCAmz-xOJIz0cycATFXfLJxD4BbQgBlD6UZ9TznKaR5tcbvPVdFsuKyH2Y3EB26MocLNeSSRLG8lZmUtQX" />
                                    <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgQBezq5pu6wIjIRmjXBgY12-4NRLhejca9BCxO2gyptmcysd8Bxp5KiOHLGwlhRgs6Vo9IW6sSAm8DBFbYDOgub28d5w5ANbLw35zf18-ErCELihaTgRtgpwIWCL5-YOM19Jt5T5LW-UeL2w5rWbpEYmOqum7WcM2Kn0HdqlDYpxfstbOV7hrPCkJa-5C7BiFQmq8Dsd31kTgyEg2a7MYr9f7Y7E5cW7bs9lEmK3A18qKSqxrnV45DM8x-rvli0ASSRBvhfXsng5-" />
                                    <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUm8wZMjpTCsGnePsSlasWAt_6WKv2N7XzV3K8uHNEWMfu7_zgIbXTG50aH6_AhzGCr-0OUxbBik1ksppEnHRj6ctPwo92l4NZIMhx2im5DBBYAGU02zQw10Pet--GisD_OEw7Y4J5xZZquInI6V3MPhF3qOVW_fmVDzRxeWLYtwipD9q_JTujfNOlA5KNFzb4Z7dXrd2mivvTw7sGGoCfq8rE3hwmEuEn-FyZuU9hJWL56DoujNmZ_8JyhPVQQ9uW24ZNX0efWZbm" />
                                </div>
                                <p className="text-sm text-slate-500 mt-1">Join our community</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img alt="Modern Campus" className="w-full aspect-[4/5] object-cover" src={mainBanner} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        </div>
                        <div className="absolute -top-6 -right-4 sm:-top-10 sm:-right-10 glass-card p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 max-w-[150px] sm:max-w-[200px] animate-bounce" style={{ animationDuration: '4s' }}>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mb-3">
                                <span className="material-symbols-rounded text-xl sm:text-2xl">verified_user</span>
                            </div>
                            <p className="font-bold text-slate-900 text-sm sm:text-base leading-tight">100% Success Rate</p>
                            <p className="text-[10px] sm:text-xs text-slate-500 mt-1">On Student Visa Applications</p>
                        </div>
                        <div className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-10 glass-card p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 max-w-[170px] sm:max-w-[220px]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-full flex items-center justify-center text-white">
                                    <span className="material-symbols-rounded text-lg sm:text-xl">chat</span>
                                </div>
                                <p className="font-bold text-slate-900 leading-tight text-sm sm:text-base">Live Support</p>
                            </div>
                            <p className="text-[10px] sm:text-sm text-slate-500">Chat with our senior counselors anytime.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
