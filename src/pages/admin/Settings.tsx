import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AdminSettings: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        api.getSettings().then(res => {
            if (res.success) setSettings(res.data);
            setIsLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await api.updateSettings(settings);
            if (res.success) {
                setMessage({ type: 'success', text: 'Settings updated successfully!' });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to update settings' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {message && (
                <div className={`${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'} p-4 rounded-xl border font-medium flex items-center justify-between`}>
                    {message.text}
                    <button onClick={() => setMessage(null)} className="opacity-50 hover:opacity-100">
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>
            )}

            {/* Hero Section Settings */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Hero Section</h3>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Homepage</span>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Title</label>
                        <input
                            type="text"
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={settings?.hero?.title || ''}
                            onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Subtitle</label>
                        <textarea
                            rows={3}
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            value={settings?.hero?.subtitle || ''}
                            onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Banners (Image URLs)</label>
                        <div className="space-y-3">
                            {(settings?.hero?.banners || []).map((banner: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="https://images.unsplash.com/..."
                                        value={banner}
                                        onChange={(e) => {
                                            const newBanners = [...settings.hero.banners];
                                            newBanners[index] = e.target.value;
                                            setSettings({ ...settings, hero: { ...settings.hero, banners: newBanners } });
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            const newBanners = settings.hero.banners.filter((_: any, i: number) => i !== index);
                                            setSettings({ ...settings, hero: { ...settings.hero, banners: newBanners } });
                                        }}
                                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                                    >
                                        <span className="material-symbols-rounded">delete</span>
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => setSettings({ ...settings, hero: { ...settings.hero, banners: [...(settings.hero.banners || []), ''] } })}
                                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-primary hover:text-primary transition-all font-bold text-sm flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-rounded">add</span> Add Banner Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* General Site Settings */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8">General Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Site Name</label>
                        <input
                            type="text"
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={settings?.siteName || ''}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        />
                    </div>
                    {/* Logo URL removed as per requirement */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Email</label>
                        <input
                            type="email"
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={settings?.footer?.email || ''}
                            onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, email: e.target.value } })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Phone</label>
                        <input
                            type="text"
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={settings?.footer?.phone || ''}
                            onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, phone: e.target.value } })}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Office Address</label>
                        <input
                            type="text"
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={settings?.footer?.address || ''}
                            onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, address: e.target.value } })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-12 py-4 rounded-xl text-white font-bold shadow-lg transition-all flex items-center gap-2 ${isSaving ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#06083D] hover:shadow-xl'
                        }`}
                >
                    {isSaving ? 'Saving Changes...' : 'Save Settings'}
                    <span className="material-symbols-rounded">save</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;
