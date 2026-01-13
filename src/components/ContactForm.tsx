import React, { useState, useEffect } from 'react';
import { api, type StudentRequest } from '../services/api';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [draftToken, setDraftToken] = useState<string | null>(localStorage.getItem('contact_draft_token'));

    // Load draft if exists
    useEffect(() => {
        if (draftToken) {
            api.getDraft(draftToken).then(response => {
                if (response.success && response.data) {
                    const data = response.data;
                    setFormData({
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        subject: data.subject || '',
                        message: data.message || ''
                    });
                }
            }).catch(err => console.error("Error loading draft:", err));
        }
    }, []);

    // Auto-save logic (debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            // Only auto-save if we have at least some data
            if (formData.name || formData.email || formData.phone || formData.message) {
                saveDraft();
            }
        }, 3000); // 3 seconds debounce

        return () => clearTimeout(timer);
    }, [formData]);

    const saveDraft = async () => {
        try {
            const payload: StudentRequest = {
                ...formData,
                isSubmitted: false,
                source: 'contact',
                draftToken: draftToken || undefined
            };
            const response = await api.createOrUpdateStudent(payload);
            if (response.success && response.data?.draftToken) {
                const token = response.data.draftToken;
                setDraftToken(token);
                localStorage.setItem('contact_draft_token', token);
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
                draftToken: draftToken || undefined
            };
            const response = await api.createOrUpdateStudent(payload);
            if (response.success) {
                setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                localStorage.removeItem('contact_draft_token');
                setDraftToken(null);
            }
        } catch (error: any) {
            setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-6">Get in touch</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Have questions about studying in Malaysia? Our expert counselors are here to help you every step of the way. Send us a message and we'll get back to you within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-rounded">mail</span>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email us at</p>
                                    <p className="font-bold text-slate-900 dark:text-white">hello@hikmahabroad.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                                    <span className="material-symbols-rounded">call</span>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Call/WhatsApp</p>
                                    <p className="font-bold text-slate-900 dark:text-white">+60 123 456 789</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-700">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+60..."
                                        className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Admission inquiry"
                                        className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">How can we help?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell us about your study goals..."
                                    className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none dark:text-white resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 rounded-2xl font-bold text-white transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-90'
                                    }`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <span className="material-symbols-rounded">send</span>
                            </button>

                            {submitStatus && (
                                <div className={`p-4 rounded-xl text-center text-sm font-semibold ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <p className="text-center text-xs text-slate-500 italic">
                                Your progress is automatically saved.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
