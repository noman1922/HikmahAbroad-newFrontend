import React, { useState, useEffect } from 'react';
import { api, type StudentRequest } from '../services/api';

const ContactUs: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [draftToken, setDraftToken] = useState<string | null>(localStorage.getItem('contact_us_draft_token'));

    useEffect(() => {
        // Load settings for contact info
        api.getSettings().then(res => {
            if (res.success) setSettings(res.data);
        });

        // Load draft if exists
        if (draftToken) {
            api.getDraft(draftToken).then(response => {
                if (response.success && response.data) {
                    const data = response.data;
                    setFormData({
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        address: (data as any).address || '',
                        message: data.message || ''
                    });
                }
            });
        }
    }, []);

    // Auto-save logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.name || formData.email || formData.message) {
                saveDraft();
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [formData]);

    const saveDraft = async () => {
        try {
            const payload: StudentRequest = {
                ...formData,
                isSubmitted: false,
                source: 'contact',
                purpose: 'Contact Us Page Inquiry (Draft)',
                draftToken: draftToken || undefined
            };
            const response = await api.createOrUpdateStudent(payload);
            if (response.success && response.data?.draftToken && !draftToken) {
                setDraftToken(response.data.draftToken);
                localStorage.setItem('contact_us_draft_token', response.data.draftToken);
            }
        } catch (error) {
            console.error("Auto-save failed:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const payload: StudentRequest = {
                ...formData,
                isSubmitted: true,
                source: 'contact',
                purpose: 'Contact Us Page Inquiry',
                draftToken: draftToken || undefined
            };
            const response = await api.createOrUpdateStudent(payload);
            if (response.success) {
                setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
                setFormData({ name: '', email: '', phone: '', address: '', message: '' });
                localStorage.removeItem('contact_us_draft_token');
                setDraftToken(null);
            }
        } catch (error: any) {
            setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pb-16 sm:pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
                    <div>
                        <div className="mb-8 sm:mb-12">
                            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#06083D] mb-4 sm:mb-6">Get in Touch</h1>
                            <p className="text-base sm:text-lg text-slate-600">Have questions about studying in Malaysia? Our experts are here to help you every step of the way.</p>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-start gap-4 sm:gap-6 group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary">
                                    <span className="material-symbols-rounded text-xl sm:text-2xl">location_on</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Office Location</p>
                                    <p className="text-base sm:text-lg font-bold text-slate-800">{settings?.footer?.address || 'Bukit Bintang, Kuala Lumpur, Malaysia'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 sm:gap-6 group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary">
                                    <span className="material-symbols-rounded text-xl sm:text-2xl">call</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us Anywhere</p>
                                    <p className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">{settings?.footer?.phone || '+60 123 456 789'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 sm:gap-6 group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary">
                                    <span className="material-symbols-rounded text-xl sm:text-2xl">mail</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Support</p>
                                    <p className="text-base sm:text-lg font-bold text-slate-800">{settings?.footer?.email || 'hello@hikmahabroad.com'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder/Embed */}
                        <div className="mt-12 rounded-xl overflow-hidden h-64 border border-white/10 shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.196924294!2d90.354!3d23.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c09f9ba3d447%3A0x1cbd2870e281519d!2sTawakkul%20Malaysia%20Education%20Consultancy!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Map Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Section: Form */}
                    <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-slate-200 border border-white">
                        <div className="mb-6 sm:mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Message</h3>
                            <p className="text-sm text-slate-500">Expect a response within 2-4 business hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#06083D]/10 focus:border-[#06083D] transition-all bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#06083D]/10 focus:border-[#06083D] transition-all bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp Number <span className="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#06083D]/10 focus:border-[#06083D] transition-all bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Address <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#06083D]/10 focus:border-[#06083D] transition-all bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Message <span className="text-red-500">*</span></label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#06083D]/10 focus:border-[#06083D] transition-all bg-white resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-[#06083D] text-white py-3 rounded-md font-bold hover:shadow-xl transition-all mt-4 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>

                            {submitStatus && (
                                <div className={`mt-4 p-4 rounded-xl text-center text-sm font-bold ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {submitStatus.message}
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
