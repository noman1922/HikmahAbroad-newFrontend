import React from 'react';

const Leadership: React.FC = () => {
    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-[3rem] overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent)]"></div>
                <div className="grid lg:grid-cols-2 items-center relative z-10">
                    <div className="p-12 lg:p-20 order-2 lg:order-1">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm block mb-4">Our Leadership</span>
                        <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-white mb-8 leading-tight">"We don't just process applications; we build futures."</h2>
                        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                            Md Sabbir Islam Sanan, the Managing Director of Tawakkul Malaysia Education Consultancy, is a visionary leader dedicated to expanding educational opportunities for students worldwide. His strategic approach ensures every student receives ethical and personalized counseling.
                        </p>
                        <div>
                            <p className="text-xl font-bold text-white">Md Sabbir Islam Sanan</p>
                            <p className="text-blue-200">Managing Director</p>
                        </div>
                        <div className="flex gap-4 mt-12">
                            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
                                <span className="material-symbols-rounded">chevron_left</span>
                            </button>
                            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
                                <span className="material-symbols-rounded">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    <div className="h-full order-1 lg:order-2">
                        <img alt="Counselor Portrait" className="w-full h-full object-cover min-h-[400px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK35BWEASjS6HY58aShaEGyoWzz4pWHY1PTWPSb_L41ckrdr6UMrkFthl-xleHCOD9QAU1JR9Q4iGwhl1CpVUZw8RTzMn9MCk8FZyfG7DCxo9u3DeB_b1Z2ndiZgFg4VMFmdLLjvFrkOo0AhMhSTpgNhxQG_itM4jibgMvE9ECj5a9EGhyPtAxd580mUTv4MXZOkSS6bv-Q8ZmF4QLInfGNgOQ3wWNRaKX6x7rc8y2PdNrvbtnAfFyc6G1zqI1Wg2cwzFO26FinSLn" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leadership;
