import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 uppercase tracking-wider">Trusted by 10,000+ Students</span>
                        <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6">
                            Expert Guidance For <span className="text-accent">International Students</span> In Malaysia
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                            We simplify everything—from choosing the perfect university to obtaining your student visa. Your dream education in Malaysia starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <div className="flex-grow flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-2 border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-rounded text-slate-400 ml-4">search</span>
                                <input className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white px-4 py-3 placeholder:text-slate-400 outline-none" placeholder="Search for your ideal university..." type="text" />
                                <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all whitespace-nowrap">Find Now</button>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">39+</p>
                                <p className="text-sm text-slate-500">Partner Universities</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
                            <div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">950+</p>
                                <p className="text-sm text-slate-500">Visas Processed</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
                            <div>
                                <div className="flex -space-x-2">
                                    <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2WYeHrMj4ncgGUqd_lBAKfB2z5fz6RtuO0BA4ZGdhLvk3SgwOQjRLupMxv6b2s9N2aNlUzkIPP7GHKQbhRVv0Wqc2JKPJlLjQPTRyK4WpJmbKT_0284Xw0a5s-36Fl8jYcYiPTjiJOvyCqk9nDQ7Z9P1-nFTmLO6Kl4LNBTiGUo9r6EML6JxWAbQtQpzCAmz-xOJIz0cycATFXfLJxD4BbQgBlD6UZ9TznKaR5tcbvPVdFsuKyH2Y3EB26MocLNeSSRLG8lZmUtQX" />
                                    <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgQBezq5pu6wIjIRmjXBgY12-4NRLhejca9BCxO2gyptmcysd8Bxp5KiOHLGwlhRgs6Vo9IW6sSAm8DBFbYDOgub28d5w5ANbLw35zf18-ErCELihaTgRtgpwIWCL5-YOM19Jt5T5LW-UeL2w5rWbpEYmOqum7WcM2Kn0HdqlDYpxfstbOV7hrPCkJa-5C7BiFQmq8Dsd31kTgyEg2a7MYr9f7Y7E5cW7bs9lEmK3A18qKSqxrnV45DM8x-rvli0ASSRBvhfXsng5-" />
                                    <img alt="Student" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUm8wZMjpTCsGnePsSlasWAt_6WKv2N7XzV3K8uHNEWMfu7_zgIbXTG50aH6_AhzGCr-0OUxbBik1ksppEnHRj6ctPwo92l4NZIMhx2im5DBBYAGU02zQw10Pet--GisD_OEw7Y4J5xZZquInI6V3MPhF3qOVW_fmVDzRxeWLYtwipD9q_JTujfNOlA5KNFzb4Z7dXrd2mivvTw7sGGoCfq8rE3hwmEuEn-FyZuU9hJWL56DoujNmZ_8JyhPVQQ9uW24ZNX0efWZbm" />
                                </div>
                                <p className="text-sm text-slate-500 mt-1">Join our community</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img alt="Modern Campus" className="w-full aspect-[4/5] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApIeh-TgVBMVlqT_Uyg8VIG3EW0Aq4m4JQhm2H3miA-xFHt142smiVZgS2aVJTjJrJPxgdWC3vmpbBhMHu2YmwOL-6raPuBzNgkHZ3e3o-_zi_2b30Nhc4e2GdKwfWyQ8zXKXPxblfFnNPuMzF5k-Hbsus487zg2k4o4nfjqHwj5k2pn-2cCPcmYDCzul0IwgoGZ0VZEpyuimb7vUba1YUouK5gqy7kI-xqcpLw2EpSHgqov7ne2zmA-D6AsVJYq1l3pOmO8-Tvozq" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        </div>
                        <div className="absolute -top-10 -right-10 glass-card p-6 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 max-w-[200px] animate-bounce" style={{ animationDuration: '4s' }}>
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mb-3">
                                <span className="material-symbols-rounded">verified_user</span>
                            </div>
                            <p className="font-bold text-slate-900 dark:text-white">100% Success Rate</p>
                            <p className="text-xs text-slate-500 mt-1">On Student Visa Applications</p>
                        </div>
                        <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 max-w-[220px]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white">
                                    <span className="material-symbols-rounded">chat</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white leading-tight">Live Support</p>
                            </div>
                            <p className="text-sm text-slate-500">Chat with our senior counselors anytime.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
