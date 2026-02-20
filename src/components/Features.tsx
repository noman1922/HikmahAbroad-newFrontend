import React from 'react';

const Features: React.FC = () => {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="services" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">Why Students Trust Us?</h2>
                <p className="text-slate-600 dark:text-slate-400">We provide end-to-end support to ensure your journey to Malaysia is smooth, stress-free, and successful.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div onClick={scrollToContact} className="group p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-accent mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-rounded text-4xl">diversity_3</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">Free Consultation</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Our experts offer personalized sessions to help you select the ideal courses and universities in Malaysia tailored to your goals.</p>
                </div>
                <div onClick={scrollToContact} className="group p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-rounded text-4xl">assignment_turned_in</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">University Admission</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">We handle your university application and enrollment process, ensuring all documents are submitted correctly and on time.</p>
                </div>
                <div onClick={scrollToContact} className="group p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-rounded text-4xl">verified</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">Visa Support</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Our dedicated visa team stays updated with latest regulations to guide you through a hassle-free student visa application.</p>
                </div>
            </div>
        </section>
    );
};

export default Features;
