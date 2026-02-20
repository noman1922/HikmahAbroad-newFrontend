import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AdminServices: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSvc, setEditingSvc] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'settings_suggest',
        videoYouTubeUrl: '',
        isActive: true
    });

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const response = await api.getServices(true);
            if (response.success) setServices(response.data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleOpenModal = (svc: any = null) => {
        if (svc) {
            setEditingSvc(svc);
            setFormData({
                title: svc.title,
                description: svc.description || '',
                icon: svc.icon || 'settings_suggest',
                videoYouTubeUrl: svc.videoYouTubeUrl || '',
                isActive: svc.isActive
            });
        } else {
            setEditingSvc(null);
            setFormData({
                title: '',
                description: '',
                icon: 'settings_suggest',
                videoYouTubeUrl: '',
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = editingSvc
                ? await api.updateService(editingSvc.id, formData)
                : await api.createService(formData);

            if (response.success) {
                setIsModalOpen(false);
                fetchServices();
            }
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            const response = await api.deleteService(id);
            if (response.success) fetchServices();
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Services</h2>
                    <p className="text-slate-500 text-sm">Manage the services offered by Hikmah Abroad.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#06083D] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                >
                    <span className="material-symbols-rounded">add</span> Add Service
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Icon</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Title</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Video</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {services.map((svc) => (
                            <tr key={svc.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <span className="material-symbols-rounded">{svc.icon}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">{svc.title}</td>
                                <td className="px-6 py-4 text-slate-500 text-sm">
                                    {svc.videoYouTubeId ? 'YouTube Attached' : 'No Video'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${svc.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {svc.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleOpenModal(svc)}
                                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        >
                                            <span className="material-symbols-rounded text-xl">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(svc.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <span className="material-symbols-rounded text-xl">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {!isLoading && services.length === 0 && (
                    <div className="text-center py-20 text-slate-500">No services found.</div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-[2rem] w-full max-w-2xl relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-900">{editingSvc ? 'Edit Service' : 'Add Service'}</h3>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Service Title</label>
                                    <input
                                        type="text" required value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                        placeholder="e.g. Visa Assistance"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Icon Name (Material)</label>
                                    <input
                                        type="text" required value={formData.icon}
                                        onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                        placeholder="e.g. settings_suggest"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                                    <select
                                        value={formData.isActive ? 'true' : 'false'}
                                        onChange={e => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">YouTube Video URL (Optional)</label>
                                    <input
                                        type="text" value={formData.videoYouTubeUrl}
                                        onChange={e => setFormData({ ...formData, videoYouTubeUrl: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                        placeholder="Brief description of the service..."
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full mt-8 py-5 bg-[#06083D] text-white rounded-[1.25rem] font-black text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                {editingSvc ? 'Save Changes' : 'Create Service'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminServices;
