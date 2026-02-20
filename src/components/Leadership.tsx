import React from 'react';

const Leadership: React.FC = () => {
    const leaders = [
        {
            name: "Md Sabbir Islam Sanan",
            role: "Managing Director",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK35BWEASjS6HY58aShaEGyoWzz4pWHY1PTWPSb_L41ckrdr6UMrkFthl-xleHCOD9QAU1JR9Q4iGwhl1CpVUZw8RTzMn9MCk8FZyfG7DCxo9u3DeB_b1Z2ndiZgFg4VMFmdLLjvFrkOo0AhMhSTpgNhxQG_itM4jibgMvE9ECj5a9EGhyPtAxd580mUTv4MXZOkSS6bv-Q8ZmF4QLInfGNgOQ3wWNRaKX6x7rc8y2PdNrvbtnAfFyc6G1zqI1Wg2cwzFO26FinSLn",
            quote: "We don't just process applications; we build futures."
        },
        {
            name: "Aisha Rahman",
            role: "Head of Admissions",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&fit=crop",
            quote: "Your dreams are our priority. We ensure every detail is perfect."
        },
        {
            name: "Dr. Kamal Hassan",
            role: "Senior Education Consultant",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&fit=crop",
            quote: "Education is the passport to the future. Let us guide your way."
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-4">Our Leadership</span>
                <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">Guided by Experts, Driven by Success</h2>
            </div>

            <div className="relative flex">
                <div className="flex animate-scroll gap-6 sm:gap-8 py-4">
                    {[...leaders, ...leaders].map((leader, index) => (
                        <div key={index} className="flex-none w-[280px] sm:w-[500px] lg:w-[800px] bg-primary rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent)]"></div>
                            <div className="flex flex-col sm:grid sm:grid-cols-2 items-center relative z-10 h-full">
                                <div className="p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
                                    <h3 className="text-lg sm:text-2xl lg:text-4xl font-display font-extrabold text-white mb-4 sm:mb-6 leading-tight italic">"{leader.quote}"</h3>
                                    <div>
                                        <p className="font-bold text-white sm:text-xl">{leader.name}</p>
                                        <p className="text-blue-200 text-sm sm:text-base">{leader.role}</p>
                                    </div>
                                </div>
                                <div className="h-48 sm:h-full bg-slate-100">
                                    <img alt={leader.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={leader.image} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;
