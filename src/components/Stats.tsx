import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const Stats: React.FC = () => {
    const [logos, setLogos] = useState<string[]>([]);

    useEffect(() => {
        api.getUniversities().then(res => {
            if (res.success) {
                const fetchedLogos = res.data.map((u: any) => u.logoUrl).filter((l: string) => !!l);
                setLogos(fetchedLogos.length > 0 ? fetchedLogos : [
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuC9OCPMpWIBcEVnkzG721qaNEJeuBbAYQ9tgv-xbUax5Hlc8dkpAsk7fa2-_ciUKxDA_8KYhZfNtxbJMYayZijpZdUvWTlbM7i2N2Smkg686Zjhk9epbMpGWleifbW0ajBMp-KJtnayepj-_MaFwqLsscw9_cX9kLrvmhmblb6vQqEzKqalzQgrIr3glIzW6Qo5D49zDk70e6JoFh-btYBzflI2C-WF9BHtwebvM6bm4CUIzzmSx_RC_TLMYHGccSaXR91Zd0Pj026z",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAiifrfrgR4d0XyxfgXg9hhVtFX5dif2INmGCswtAwawu8ntrzZ2rhFxcZbxCV7N-iMW7CF_AP9zb349NFuTVk9nSYMv0WRQ9k-UDfi6h3hI3ON0dcmPaFvckjf7e43InisaLvpaoTkwph99-IYWvYOIBZCL3e_t-SxIQw91HqBnQeBFIJ23z4_273Ja0pUWWwrjQHzQeT3ojP1Xg1fF-uobJetgOqkb_67Y9Qe0EombPoJ8iyOCb95AtvtTf4oRunw78GpJVt5t_HE"
                ]);
            }
        });
    }, []);

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-10">Our Prestigious Partner Universities</p>
                <div className="relative flex overflow-x-hidden">
                    <div className="animate-scroll flex items-center gap-8 sm:gap-16 min-full">
                        {/* Double the logos for infinite effect */}
                        {[...logos, ...logos, ...logos].map((src, index) => (
                            <img key={index} alt="University Logo" className="h-8 sm:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all max-w-[100px] sm:max-w-[150px]" src={src} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
