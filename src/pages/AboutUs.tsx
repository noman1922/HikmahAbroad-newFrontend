import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <div className="text-center mb-10 sm:mb-16">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 px-2">Empowering Your Educational Journey</h1>
                    <p className="text-lg sm:text-xl text-slate-600">Helping students achieve their dreams of studying in world-class institutions.</p>
                </div>

                <div className="aspect-video rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-16 shadow-2xl mx-2 sm:mx-0">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200" alt="Education" className="w-full h-full object-cover" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-20">
                    <div className="px-2 sm:px-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">Our Mission</h2>
                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                            At HIKMAH ABROAD, our mission is to provide comprehensive and accessible educational consultancy services to students seeking global opportunities. We bridge the gap between aspirations and reality by providing expert guidance, support, and a seamless application process.
                        </p>
                    </div>
                    <div className="px-2 sm:px-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">Our Vision</h2>
                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                            To be the leading global education consultancy, recognized for our commitment to student success, ethical practices, and the quality of our partner institutions.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-3xl p-12 mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Choose Us?</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Expert Consultants', desc: 'Our team has years of experience in international education.' },
                            { title: 'Global Network', desc: 'Direct partnerships with top universities worldwide.' },
                            { title: 'Personalized Support', desc: 'We tailor our services to your unique goals.' },
                            { title: 'High Success Rate', desc: 'Proven track record of successful applications and visas.' },
                            { title: 'Transparent Process', desc: 'No hidden fees or complicated paperwork.' },
                            { title: 'Student First', desc: 'Your success and well-being are our top priorities.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
