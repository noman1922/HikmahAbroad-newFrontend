import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AdminUniversities: React.FC = () => {
    const [universities, setUniversities] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUni, setEditingUni] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        logoUrl: '',
        bannerUrl: '',
        offerLetterApplicable: true,
        isActive: true
    });

    const fetchUniversities = async () => {
        setIsLoading(true);
        try {
            const response = await api.getUniversities(true);
            if (response.success) setUniversities(response.data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    const handleOpenModal = (uni: any = null) => {
        if (uni) {
            setEditingUni(uni);
            setFormData({
                name: uni.name,
                location: uni.location,
                description: uni.description || '',
                logoUrl: uni.logoUrl || uni.imageUrl || '',
                bannerUrl: uni.bannerUrl || '',
                offerLetterApplicable: uni.offerLetterApplicable ?? true,
                isActive: uni.isActive
            });
        } else {
            setEditingUni(null);
            setFormData({
                name: '',
                location: '',
                description: '',
                logoUrl: '',
                bannerUrl: '',
                offerLetterApplicable: true,
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = editingUni
                ? await api.updateUniversity(editingUni.id, formData)
                : await api.createUniversity(formData);

            if (response.success) {
                setIsModalOpen(false);
                fetchUniversities();
            }
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this university?')) return;
        try {
            const response = await api.deleteUniversity(id);
            if (response.success) fetchUniversities();
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Universities</h2>
                    <p className="text-slate-500 text-sm">Manage the list of partner institutions.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#06083D] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                >
                    <span className="material-symbols-rounded">add</span> Add University
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Logo</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Location</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {universities.map((uni) => (
                                <tr key={uni.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
                                            {uni.logoUrl ? (
                                                <img src={uni.logoUrl} alt={uni.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <span className="material-symbols-rounded text-slate-400">image</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">{uni.name}</td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">{uni.location}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${uni.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {uni.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenModal(uni)}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                <span className="material-symbols-rounded text-xl">edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(uni.id)}
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
                </div>

                {/* Mobile View */}
                <div className="md:hidden divide-y divide-slate-100">
                    {universities.map((uni) => (
                        <div key={uni.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {uni.logoUrl ? (
                                        <img src={uni.logoUrl} alt={uni.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <span className="material-symbols-rounded text-slate-300">image</span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-slate-900 text-sm truncate">{uni.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{uni.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleOpenModal(uni)}
                                    className="p-2 text-slate-400 hover:text-primary active:bg-slate-100 rounded-lg"
                                >
                                    <span className="material-symbols-rounded">edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(uni.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 active:bg-red-50 rounded-lg"
                                >
                                    <span className="material-symbols-rounded">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {!isLoading && universities.length === 0 && (
                    <div className="text-center py-20 text-slate-500">No universities found.</div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white sm:rounded-[2rem] w-full max-w-2xl h-full sm:h-auto overflow-y-auto relative shadow-2xl animate-in fade-in zoom-in duration-300">
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                            <div className="flex justify-between items-center mb-6 sm:mb-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{editingUni ? 'Edit University' : 'Add University'}</h3>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">University Name</label>
                                    <input
                                        type="text" required value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                        placeholder="e.g. Asia Pacific University"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Location</label>
                                    <input
                                        type="text" required value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                        placeholder="e.g. Kuala Lumpur"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Status</label>
                                    <select
                                        value={formData.isActive ? 'true' : 'false'}
                                        onChange={e => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Offer Letter</label>
                                    <div className="flex gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border-2 border-slate-50">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio" name="offerLetter" checked={formData.offerLetterApplicable}
                                                onChange={() => setFormData({ ...formData, offerLetterApplicable: true })}
                                            />
                                            <span className="text-xs sm:text-sm font-bold text-slate-700">Free/Processed</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio" name="offerLetter" checked={!formData.offerLetterApplicable}
                                                onChange={() => setFormData({ ...formData, offerLetterApplicable: false })}
                                            />
                                            <span className="text-xs sm:text-sm font-bold text-slate-700">Fees Apply</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Logo URL</label>
                                    <input
                                        type="text" value={formData.logoUrl}
                                        onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-[10px] sm:text-sm"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Banner URL</label>
                                    <input
                                        type="text" value={formData.bannerUrl}
                                        onChange={e => setFormData({ ...formData, bannerUrl: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-[10px] sm:text-sm"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                        placeholder="Brief description of the university..."
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full mt-6 sm:mt-8 py-4 sm:py-5 bg-[#06083D] text-white rounded-[1rem] sm:rounded-[1.25rem] font-black text-base sm:text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                {editingUni ? 'Save Changes' : 'Create University'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUniversities;
