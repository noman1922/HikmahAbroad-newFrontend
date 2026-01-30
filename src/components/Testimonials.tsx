import React from 'react';

const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">Student Success Stories</h2>
                        <p className="text-slate-600 dark:text-slate-400">Hear from our students who turned their dreams into reality with our professional guidance.</p>
                    </div>
                    <button className="flex items-center gap-2 font-bold text-primary dark:text-accent hover:gap-4 transition-all">
                        View all stories <span className="material-symbols-rounded">arrow_right_alt</span>
                    </button>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Story 1 */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow">
                        <div className="relative group cursor-pointer">
                            <img alt="Student Video" className="w-full aspect-video object-cover transition-transform group-hover:scale-105 duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnwS3u8LyJLsNq-q9FEf1HpKqiC2kltPg7z_QZouGbJULNaUy9KR5QhobWrojDKTxNI7DDdF8Ca09fCEKFrkhKmJN7kyAqKodsZGx9UgNQ0XSgBP-5adVGQLY88yC0gOBnXqmc9mm6DT1uxlHD4lY9BB-Qc4GbNwbDknw4AggTXIPKY0tUZanvt7_h_8ZnbxIlLDSQwmNCBr4JyvEb7isjGLwJobtuJLfpiQ8FCYjYVWHWO2zQfQE8E6NdLoEYAn1FV-FPck3EOMwb" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-rounded text-4xl">play_arrow</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex text-amber-400 mb-4">
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 italic">"Starting an MBA abroad was a huge decision, but Tawakkul made it feel so achievable. They handled everything from the initial application to my visa."</p>
                            <div className="flex items-center gap-4">
                                <img alt="Student" className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_bu4-e-b2XOWUZkyjFkknna7k_aDB-nHvm-UFCNKLTNy3abf9LAshYHvCl_gQp_up2XaCDM-QlgL1CLaAMOEVosZK7obBc7E5G_SReIeOSQ8QrE_dBdEPdlY9VbjpI2xtRKfOOI6h0MUBvU0lnm-6AQhroJl99hi-MEOhV4bxwmQG_MK7_cx0w7vS48uDtq4bi3pK9J2_CGSOfFfFJmi5LD29yW2I8KrObIlxooUnv-Kszu8qLIRILO64UTZ3WM7KF11Y0cMty7TG" />
                                <div>
                                    <h4 className="font-bold dark:text-white">Saiful Islam</h4>
                                    <p className="text-xs text-slate-500">MBA, Asia Pacific University</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Story 2 */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow">
                        <div className="relative group cursor-pointer">
                            <img alt="Student Video" className="w-full aspect-video object-cover transition-transform group-hover:scale-105 duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxf0F8kKL2tPa5G4A7DpD5H8x4WSxxgeqNH1Ow5UQMv-_woi-iUJtEkrskPrOJVUVQTDJ6bKSZESDMgea3yb8lDLH2D6rZgkmqIHWI_xjrBF6qyCD2FsJ447ny1y2x92yPjd2-c7Sotjqh1ZmDsSSBSQU2nqiXkDZx8taUfcwwjV91l0gPnefaYTWHpOFojQ5OtJnZUbZrH08xtmYsYMHK8O5d7kcP8RIlud9NPqD8yItST0VRgfCkATB_aMYNLJL4bZJQ3m7UYQY6" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-rounded text-4xl">play_arrow</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex text-amber-400 mb-4">
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 italic">"The counselors here are truly professional. They helped me find a research-focused program that fit my career goals perfectly. Highly recommended!"</p>
                            <div className="flex items-center gap-4">
                                <img alt="Student" className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTRjtw3JNeIg1lg28EzpgisO4zLS2VKS0EHtsDlY1XteXh7QkXUGVY4Wsxk7n7XE_A3LTVjkieGkbJC8fx6ilkskNUNDTwPB6IU991jCa1BdAf5RBjXn3oPwUpmnC1Exy6J0yEaqb2ZtDd2MiWydR3uZfJfOKYHbMM55qeznRbFgYqUmO7kQGBCBfzaUtpIEyArh2yf-F3go-V6-yzXE7qE8svOlpoLA_pdXL_qde61UyeNu1o_wrt76cYmLeuRNf0bpszQvtgZXN_" />
                                <div>
                                    <h4 className="font-bold dark:text-white">Mamunur Rashid</h4>
                                    <p className="text-xs text-slate-500">MSc IT, City University</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Story 3 */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow">
                        <div className="relative group cursor-pointer">
                            <img alt="Student Video" className="w-full aspect-video object-cover transition-transform group-hover:scale-105 duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_lSRvXI__zE-4Q6Fs_ppKyNGQ4408MwvzVq4GnrYO8hz-hypP7uxNVCGUPdpS_XqCF0MiCVskvVJ662FUzQWKT5OHAQR7f9xLAsne8-h8n6ZWBXjSfoL1Np-9IB349JFxBw_lMgN_B0uxbC6ArgzF2xbenrY7CP1HtJnjyRhUgb0Y-FFXlJU4mfOYfKopvYV7umqdjtRTQ6sCdbE09MXvQLJfimYMqzdao3P61RPber4vJ0x66AiXjsxUGabDei3mvU8RsHd1Q6Y7" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-rounded text-4xl">play_arrow</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex text-amber-400 mb-4">
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                                <span className="material-symbols-rounded">star</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 italic">"Studying Computer Science in Malaysia was the best decision. The environment is so welcoming, and Tawakkul support made settling in easy."</p>
                            <div className="flex items-center gap-4">
                                <img alt="Student" className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRL7_AVMUF4c0GOshj4v0nr47I5uVI2MFLXAwECaV7rDGgEuiM1S9fF5qbk8JFD5q0_2_tEloyoHZIH7unXYb06hsOJI_9HxaRXpUsnb4HP6I560Bv1EOwpsRrrCRUGALDw30wBqR3cP48lRjPvSc3eDt2OzhkVg213QAudqk-zt84C30mKoqq_nZSMH0I2CAA4c1dqu_376roWhL7lpFdJAtDBCAu6czzEW4sMjrdhiIhM5hw-afU_VOHKdRbOO8j9MDyQI4DyQsS" />
                                <div>
                                    <h4 className="font-bold dark:text-white">Abu Raihan</h4>
                                    <p className="text-xs text-slate-500">BSc SE, Taylor's University</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
