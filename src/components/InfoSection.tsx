import React from 'react';

const InfoSection: React.FC = () => {
    return (
        <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <img alt="Kuala Lumpur" className="rounded-[2.5rem] shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAhgO_9IYdhLTsmrQyv12TT6zRbdfnCcN10nZjorjqPhlM2a01XDY8IhV2i4aiREObngOZYfaVMFcoWWDbHdWZZMfdKcM35WISqvzx8i9JrnZyMFWyW03V7pGPbhQaBrYRwsW--zd3yW9lcwAEGFp2zryILOGrH5w_p5n-_bZpTViHFtmJbkPacCU-L2ZEfzNN-4g3MwSdIefYrWV1ktx_P5IWBkhtkZvcgmjjKG6E5p0__6t0FMYZMlmKOxv49NefyCEr6HFQIWB2" />
                    <div className="absolute -bottom-8 -right-8 bg-accent p-8 rounded-3xl text-white shadow-xl max-w-[200px]">
                        <p className="text-3xl font-bold mb-1">#1</p>
                        <p className="text-sm font-medium opacity-90">Preferred Study Destination in SE Asia</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-6">Why study in Malaysia?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Malaysia has become a popular study destination for students seeking to pursue their education at world-class universities. Several factors contribute to this trend, including the country's rich cultural diversity, affordable cost of living, and high-quality higher education.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-rounded text-accent">check_circle</span>
                            Affordable tuition fees compared to Western countries
                        </li>
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-rounded text-accent">check_circle</span>
                            International recognition of degrees
                        </li>
                        <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-rounded text-accent">check_circle</span>
                            Vibrant multi-cultural environment
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-6">Studying English in Malaysia</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Malaysia is home to numerous English language institutes, particularly in Kuala Lumpur, where options vary in both price and educational quality. English has been widely spoken for many years, establishing itself as the de facto second language of the country.
                    </p>
                    <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all">Learn More About Language Programs</button>
                </div>
                <div className="order-1 lg:order-2 relative">
                    <img alt="Students Studying" className="rounded-[2.5rem] shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSwwWWPrqW1bHspk2YAYdxNN29y2agiyz7mSKSekRMh5dJkTpxXjM1HVzmvMQ_YBYmvmaOyKJaoEhAGYw0JR7UnTraQegfSU34OigztdnUeDtIqEh649IqxXuZBz8sL05OGQrPeTxVG7Z0-iV3v4OHDP9tqVwKA84gBDt_NqEPwqVxHYPgCSIHezVmdHcVgxO081j40gXrJBaupIiMOgMUOG2BNTTAlhw_E3sIN0yTL7EfUEdE-EoEIi8M6lWqDFmgq5Aa5-LrLGaE" />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <img alt="Cultural Malaysia" className="rounded-[2.5rem] shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5kKOsVhqco1mzjGANlw-ebLAdkaekS1euGHcfkxtV4ORaiGzMLz1pXe89_ahFy2oIrwmaOh9gZjgMT_zWvUhMYkjPiyXkaFN1Y450TRgrmRkH7q2qsqXvSvHEQU8YSrQ_Hfhk0ud-LIsbOGqh9AEVQd79RAH-cl25Bx2HRvdaAUEVFjbsGp9ffX9dlfX96GVv-HbbbPHOvzHPJCbAoHC0Q1gUNM7i3Mbkr8ldKxjoXvUY_HTtUNqUxN3dRuTGE8wmvt8YsxPfAybf" />
                </div>
                <div>
                    <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-6">Malaysian Universities</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Studying abroad in Malaysia offers more than just an academic experience; you'll also immerse yourself in the country's stunning natural beauty, including ancient rainforests, national parks, and breathtaking beaches.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <p className="text-2xl font-bold text-primary dark:text-accent mb-1">Global</p>
                            <p className="text-sm text-slate-500">Ranked Institutions</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <p className="text-2xl font-bold text-primary dark:text-accent mb-1">Diverse</p>
                            <p className="text-sm text-slate-500">Social Life</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
