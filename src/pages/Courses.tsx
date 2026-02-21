import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Courses: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get('search') || '');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [courses, setCourses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applyFormData, setApplyFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [draftToken, setDraftToken] = useState<string | null>(localStorage.getItem('course_apply_draft_token'));

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const res = await api.getCourses();
                if (res.success) setCourses(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();

        // Load draft if exists
        if (draftToken) {
            api.getDraft(draftToken).then(response => {
                if (response.success && response.data) {
                    const data = response.data;
                    setApplyFormData({
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || ''
                    });
                }
            }).catch(err => console.error("Error loading draft:", err));
        }
    }, []);

    // Auto-save logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (applyFormData.name || applyFormData.email || applyFormData.phone) {
                try {
                    const payload = {
                        ...applyFormData,
                        courseId: selectedCourse?.id,
                        universityId: selectedCourse?.universityId,
                        purpose: selectedCourse ? `Draft: Applied for ${selectedCourse.name}` : 'Course Inquiry Draft',
                        source: 'application',
                        isSubmitted: false,
                        draftToken: draftToken || undefined
                    };
                    const res = await api.createOrUpdateStudent(payload);
                    if (res.success && res.data?.draftToken && !draftToken) {
                        setDraftToken(res.data.draftToken);
                        localStorage.setItem('course_apply_draft_token', res.data.draftToken);
                    }
                } catch (err) {
                    console.error("Auto-save failed:", err);
                }
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [applyFormData, selectedCourse]);

    const levels = [
        'Diploma', 'Bachelor Degree', 'Masters Degree', 'Doctoral Degree (PhD)', 'Advance Diploma', 'Certificate', 'Foundation / A-level'
    ];

    const handleOpenDetails = (course: any) => {
        setSelectedCourse(course);
        setIsDetailsOpen(true);
    };

    const handleOpenApply = (course: any) => {
        setSelectedCourse(course);
        setIsApplyOpen(true);
    };

    const handleSubmitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await api.createOrUpdateStudent({
                ...applyFormData,
                courseId: selectedCourse.id,
                universityId: selectedCourse.universityId,
                purpose: `Applied for ${selectedCourse.name} at ${selectedCourse.universityName || 'Partner Uni'}`,
                source: 'application',
                isSubmitted: true,
                draftToken: draftToken || undefined
            });
            if (res.success) {
                alert('Application submitted successfully! We will contact you soon.');
                setIsApplyOpen(false);
                setApplyFormData({ name: '', email: '', phone: '' });
                localStorage.removeItem('course_apply_draft_token');
                setDraftToken(null);
            }
        } catch (err: any) {
            alert(err.message || 'Failed to submit application');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 font-bold text-slate-900"
                    >
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-rounded text-primary">filter_list</span>
                            Filter
                        </span>
                        <span className={`material-symbols-rounded transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}>
                            expand_more
                        </span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar / Collapsible Filter */}
                    <aside className={`w-full lg:w-80 bg-white p-6 rounded-xl shadow-sm h-fit transition-all duration-300 overflow-hidden lg:block ${isFilterOpen ? 'block mb-6' : 'hidden'}`}>
                        <h2 className="text-xl font-bold mb-6 hidden lg:block">Filter Your Best Course</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 font-semibold">Search by name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Type Course Name"
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pl-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 font-semibold">Course Level</label>
                                <div className="space-y-2.5">
                                    {levels.map(level => (
                                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" />
                                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 font-semibold">Search by location</label>
                                <div className="relative">
                                    <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer appearance-none">
                                        <option>All Locations</option>
                                        <option>Selangor</option>
                                        <option>Kuala Lumpur</option>
                                    </select>
                                    <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-slate-900">Course List</h1>
                            <div className="text-sm text-slate-500 font-medium hidden sm:block">
                                Showing {courses.filter(course =>
                                    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    course.universityName?.toLowerCase().includes(searchTerm.toLowerCase())
                                ).length} results
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-slate-500 font-medium">Fetching courses...</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {courses.filter(course =>
                                    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    course.universityName?.toLowerCase().includes(searchTerm.toLowerCase())
                                ).length > 0 ? (
                                    courses.filter(course =>
                                        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        course.universityName?.toLowerCase().includes(searchTerm.toLowerCase())
                                    ).map(course => (
                                        <div key={course.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-all duration-300 group">
                                            <div className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center p-4 overflow-hidden border border-slate-100 shadow-inner group-hover:scale-105 transition-transform">
                                                {course.imageUrl ? (
                                                    <img src={course.imageUrl} alt={course.name} className="max-w-full max-h-full object-cover rounded-xl" />
                                                ) : (
                                                    <span className="material-symbols-rounded text-4xl text-slate-300">book_5</span>
                                                )}
                                            </div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{course.name}</h3>
                                                <p className="text-primary font-bold mt-1 uppercase text-[10px] tracking-widest bg-primary/5 w-fit px-2 py-0.5 rounded sm:mx-0 mx-auto">
                                                    {course.universityName || course.university || "Hikmah Partner University"}
                                                </p>
                                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 text-slate-600 text-sm">
                                                    <span className="flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-sm">
                                                        <span className="material-symbols-rounded text-lg text-primary">layers</span>
                                                        {course.level}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-sm">
                                                        <span className="material-symbols-rounded text-lg text-primary">schedule</span>
                                                        {course.duration || 'Flexible'}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-sm font-bold text-slate-900">
                                                        <span className="material-symbols-rounded text-lg text-emerald-500">payments</span>
                                                        {course.tuitionFee || 'Contact'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                                                <button
                                                    onClick={() => handleOpenApply(course)}
                                                    className="flex-1 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-sm whitespace-nowrap"
                                                >
                                                    Apply
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDetails(course)}
                                                    className="flex-1 bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition-colors text-sm whitespace-nowrap"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm px-6">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <span className="material-symbols-rounded text-4xl text-slate-300">search_off</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No Courses Found</h3>
                                        <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any courses matching your search criteria. Please try a different name or location.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {isDetailsOpen && selectedCourse && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsDetailsOpen(false)}></div>
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="h-48 relative">
                            <div className="w-full h-full bg-[#06083D] flex items-center justify-center">
                                <span className="material-symbols-rounded text-6xl text-white/20">book_5</span>
                            </div>
                            <button onClick={() => setIsDetailsOpen(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
                                <span className="material-symbols-rounded">close</span>
                            </button>
                        </div>
                        <div className="p-8 -mt-12 relative">
                            <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center p-4 mb-6 border border-slate-100 overflow-hidden">
                                {selectedCourse.imageUrl ? (
                                    <img src={selectedCourse.imageUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-rounded text-4xl text-slate-300">book</span>
                                )}
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedCourse.name}</h3>
                            <p className="text-primary font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-rounded text-lg">school</span>
                                {selectedCourse.universityName || "Hikmah Partner University"}
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                                    <span className="material-symbols-rounded text-primary block mb-1">layers</span>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Level</p>
                                    <p className="text-sm font-bold text-slate-700">{selectedCourse.level}</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                                    <span className="material-symbols-rounded text-primary block mb-1">schedule</span>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
                                    <p className="text-sm font-bold text-slate-700">{selectedCourse.duration || 'Flexible'}</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                                    <span className="material-symbols-rounded text-emerald-500 block mb-1">payments</span>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Tuition</p>
                                    <p className="text-sm font-bold text-slate-700">{selectedCourse.tuitionFee || 'TBA'}</p>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Course Description</h4>
                                <p className="text-slate-600 leading-relaxed italic border-l-4 border-primary/20 pl-4 py-2">
                                    {selectedCourse.description || "Advance your career with this comprehensive program designed for international students seeking global excellence."}
                                </p>
                            </div>

                            <button
                                onClick={() => { setIsDetailsOpen(false); handleOpenApply(selectedCourse); }}
                                className="w-full mt-8 py-4 bg-[#06083D] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Apply Modal */}
            {isApplyOpen && selectedCourse && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsApplyOpen(false)}></div>
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <form onSubmit={handleSubmitApplication} className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Course Application</h3>
                                    <p className="text-slate-500 text-sm">Applying for {selectedCourse.name}</p>
                                </div>
                                <button type="button" onClick={() => setIsApplyOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                                    <input
                                        type="text" required value={applyFormData.name}
                                        onChange={e => setApplyFormData({ ...applyFormData, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                                        <input
                                            type="email" required value={applyFormData.email}
                                            onChange={e => setApplyFormData({ ...applyFormData, email: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">WhatsApp</label>
                                        <input
                                            type="tel" required value={applyFormData.phone}
                                            onChange={e => setApplyFormData({ ...applyFormData, phone: e.target.value })}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                            placeholder="+60..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit" disabled={isSubmitting}
                                className="w-full mt-8 py-5 bg-[#06083D] text-white rounded-2xl font-black text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-slate-400"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
