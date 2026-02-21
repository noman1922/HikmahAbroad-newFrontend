import React, { useState, useEffect } from 'react';

const Leadership: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(1);
    const [isResetting, setIsResetting] = useState(false);

    const leaders = [
        {
            name: "MD Mahmudul Hasan Alim",
            role: "Co-Founder",
            image: "/images/alim.png",
            quote: "Mahmudul Hasan Alim, the Co-Founder of Hikmah Abroad, is a visionary leader dedicated to expanding educational opportunities for students worldwide. His strategic approach and commitment to excellence have been pivotal in enhancing the company's reputation as a trusted educational consultancy."
        },
        {
            name: "Rakib Sikdar",
            role: "Co-Founder",
            image: "/images/rakib.png",
            quote: "Rakib Sikdar, the Co-Founder of Hikmah Abroad, champions values of transparency and collaboration, ensuring every decision aligns with the mission to empower students in their educational pursuits. Under his guidance, Hikmah Abroad has set new benchmarks for quality and innovation."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsResetting(false);
            setPreviousIndex(currentIndex);
            setCurrentIndex((prev) => (prev === 0 ? 1 : 0));

            // After transition finishes (1s), move the old card back to the left (hidden)
            setTimeout(() => {
                setIsResetting(true);
            }, 1000);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const getSlideClass = (index: number) => {
        if (index === currentIndex) {
            return 'opacity-100 translate-x-0 pointer-events-auto scale-100';
        }
        if (index === previousIndex && !isResetting) {
            return 'opacity-0 -translate-x-24 pointer-events-none scale-95'; // Left Out
        }
        return 'opacity-0 translate-x-24 pointer-events-none scale-95'; // Right Hidden (Waiting)
    };

    return (
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
            {/* Background Stripes Pattern */}
            <div className="absolute inset-0 bg-stripes opacity-30 md:opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                        Meet Our <span className="text-primary italic">Counselors</span>
                    </h2>
                </div>

                <div className="relative min-h-[750px] sm:min-h-[700px] md:min-h-[600px] flex items-center justify-center">
                    {leaders.map((leader, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between transition-all ease-in-out ${isResetting && index !== currentIndex ? 'duration-0' : 'duration-1000'
                                } ${getSlideClass(index)}`}
                        >
                            {/* Leader Image - Appears on top on mobile */}
                            <div className="w-full md:w-2/5 flex justify-center md:justify-end relative order-1 md:order-2 px-4 md:px-0">
                                <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[4/5] md:aspect-[4/5]">
                                    {/* Decorative background for image */}
                                    <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl"></div>

                                    <img
                                        alt={leader.name}
                                        className="w-full h-full object-cover rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative z-10 border-4 border-white dark:border-slate-800"
                                        src={leader.image}
                                    />
                                </div>
                            </div>

                            {/* Text Content (Glass Card) - Overlaps slightly on mobile */}
                            <div className="w-full md:w-3/5 z-20 md:pr-12 order-2 md:order-1 -mt-12 md:mt-0 px-2 sm:px-4 md:px-0">
                                <div className="glass-card p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl dark:border dark:border-white/10 relative backdrop-blur-md">
                                    <span className="absolute -top-4 -left-1 md:-top-6 md:-left-2 text-6xl md:text-8xl text-primary/20 font-serif leading-none italic pointer-events-none">"</span>
                                    <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 md:mb-8 relative z-10 italic">
                                        {leader.quote}
                                    </p>
                                    <div className="border-t border-slate-200 dark:border-slate-800 pt-4 md:pt-6">
                                        <p className="text-xl md:text-2xl font-bold text-primary">{leader.name}</p>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-xs md:text-sm">{leader.role}</p>
                                    </div>
                                    <span className="absolute -bottom-8 -right-1 md:-bottom-10 md:-right-2 text-6xl md:text-8xl text-primary/20 font-serif leading-none italic rotate-180 pointer-events-none">"</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modern Indicator Dots */}
                <div className="flex justify-center gap-4 mt-16 md:mt-20">
                    {leaders.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (index !== currentIndex) {
                                    setIsResetting(false);
                                    setPreviousIndex(currentIndex);
                                    setCurrentIndex(index);
                                    setTimeout(() => setIsResetting(true), 1000);
                                }
                            }}
                            className={`group relative py-2`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <div className={`h-1.5 transition-all duration-500 rounded-full ${currentIndex === index ? 'w-10 md:w-12 bg-primary' : 'w-3 md:w-4 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400'
                                }`}></div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;
