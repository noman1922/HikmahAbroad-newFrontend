import React from 'react';

const Testimonials: React.FC = () => {
    const stories = [
        {
            name: "Md. Tanvir Ahmed",
            course: "PhD in Business Administration",
            university: "University of Malaya (UM)",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop",
            text: "Securing admission for a PhD at UM seemed daunting, but the team at Hikmah Abroad guided me through the research proposal and visa process flawlessly. Their expertise is unmatched."
        },
        {
            name: "Junaid Hossen",
            course: "PhD in Computer Science",
            university: "Universiti Teknologi Malaysia (UTM)",
            image: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=200&h=200&fit=crop",
            text: "The research environment in Malaysia is fantastic. Hikmah Abroad helped me find the right supervisor and navigate the application process seamlessly. They are the best in the business."
        },
        {
            name: "Fatima Al-Zahra",
            course: "Master of Computer Science",
            university: "Asia Pacific University (APU)",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop",
            text: "From my initial free consultation to my first day at APU, everything was handled professionally. I highly recommend them to any student looking to study in Malaysia."
        }
    ];

    return (
        <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">Student Success Stories</h2>
                        <p className="text-slate-600 dark:text-slate-400">Hear from our students who turned their dreams into reality with our professional guidance.</p>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow group flex flex-col h-full">
                            <div className="flex text-amber-400 mb-6">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span key={star} className="material-symbols-rounded text-xl">star</span>
                                ))}
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed flex-grow">"{story.text}"</p>

                            <div className="border-t border-slate-100 dark:border-slate-700 pt-6 mt-auto">
                                <div className="flex items-center gap-4">
                                    <img alt={story.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700" src={story.image} />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1">{story.name}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-tight">
                                            {story.course}, {story.university}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
