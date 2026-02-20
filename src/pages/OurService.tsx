import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OurService: React.FC = () => {
    const services = [
        { id: 1, title: 'Free Educational Consultation', description: 'Our team provides expert advice without any consultation fees to help you choose the best course and university based on your academic background, interests, and future aspirations. We work closely with you to identify programs that align with your career goals, offering tailored solutions. - Personalized Guidance: Tailored recommendations on the most suitable universities and programs in Malaysia and other top international destinations. - Comprehensive Support: From course selection to application submission, we assist you throughout the process—at no extra cost.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800' },
        { id: 2, title: 'Global Study Opportunities', description: 'Explore a wide range of study destinations across the globe with our extensive network of partner universities.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800' },
        { id: 3, title: 'Visa Assistance', description: 'Our visa experts guide you through the entire application process, ensuring all documentation is correct and submitted on time.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800' },
        { id: 4, title: 'Air Ticketing Service', description: 'We provide competitive airfares and convenient travel arrangements for students traveling abroad.', image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800' },
        { id: 5, title: 'Accommodation & Travel Coordination', description: 'Finding a place to live in a new country can be challenging. We help you find safe and affordable accommodation.', image: 'https://images.unsplash.com/photo-1520277739343-70d30d1d78fc?auto=format&fit=crop&q=80&w=800' },
        { id: 6, title: 'Scholarship & Financial Aid Guidance', description: 'We help you identify and apply for scholarships and financial aid opportunities to make your study abroad journey more affordable.', image: 'https://images.unsplash.com/photo-1532619675605-1dee6c2ed80e?auto=format&fit=crop&q=80&w=800' },
        { id: 7, title: 'Airport Pickup & Welcome Service', description: 'Arriving in a new country is exciting but can be overwhelming. Our team will be there to welcome you at the airport.', image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=800' },
    ];

    const [activeService, setActiveService] = useState(services[0]);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Breadcrumbs */}
                <nav className="text-sm text-slate-500 mb-6">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-900 font-medium">Services</span>
                </nav>

                <div className="flex flex-col md:flex-row gap-8 sm:gap-12">
                    {/* Sidebar / Service Tabs */}
                    <aside className="w-full md:w-80 flex-shrink-0">
                        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-white no-scrollbar">
                            {services.map(service => (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveService(service)}
                                    className={`whitespace-nowrap md:whitespace-normal md:w-full text-left px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold transition-all border-r md:border-r-0 md:border-b border-slate-100 last:border-0 ${activeService.id === service.id
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {service.title}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-xl border border-slate-100">
                            <img
                                src={activeService.image}
                                alt={activeService.title}
                                className="w-full h-[250px] sm:h-[400px] object-cover"
                            />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mb-4 sm:mb-6">{activeService.title}</h1>
                        <div className="prose prose-slate max-w-none">
                            {activeService.description.split('- ').map((text, index) => (
                                <p key={index} className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
                                    {index > 0 ? <strong className="block text-slate-900 mt-2 mb-1">- {text.split(':')[0]}:</strong> : null}
                                    {index > 0 ? text.split(':').slice(1).join(':') : text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurService;
