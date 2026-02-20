import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLocation } from 'react-router-dom';

const AdminStudents: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [type, setType] = useState<'students' | 'contacts'>('students');
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.type) {
            setType(location.state.type);
        }
    }, [location.state]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = type === 'students'
                ? await api.getStudents(page)
                : await api.getContacts(page);

            if (response.data) {
                setData(response.data);
                setTotalCount(response.totalCount);
            }
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type, page]);

    const handleToggleStatus = async (id: string, field: 'isRead' | 'isDone', value: boolean) => {
        try {
            console.log(`Toggling status for ${type} ${id}: ${field}=${value}`);
            const res = type === 'students'
                ? await api.updateStudentStatus(id, { [field]: value })
                : await api.updateContactStatus(id, { [field]: value });

            if (res.success) {
                console.log('Status update successful');
                fetchData();
                if (selectedItem?.id === id) {
                    setSelectedItem({ ...selectedItem, [field]: value });
                }
            } else {
                console.warn('Status update returned failure:', res.message);
                alert(`Failed to update status: ${res.message}`);
            }
        } catch (error: any) {
            console.error('Update error:', error);
            alert(`Update error: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Inquiries</h2>
                    <p className="text-slate-500 text-sm">Review student applications and contact requests.</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => { setType('students'); setPage(1); }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${type === 'students' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Applications
                    </button>
                    <button
                        onClick={() => { setType('contacts'); setPage(1); }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${type === 'contacts' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Contact Leads
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name / Email</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Phone</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Details</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        if (!item.isRead) handleToggleStatus(item.id, 'isRead', true);
                                    }}
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900 truncate max-w-[150px]">{item.name}</div>
                                        <div className="text-xs text-slate-500 truncate max-w-[150px]">{item.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">{item.phone}</td>
                                    <td className="px-6 py-4">
                                        {type === 'students' ? (
                                            <div className="text-xs text-slate-600 max-w-xs">
                                                <p className="line-clamp-1 italic text-slate-500">"{item.purpose || 'No purpose stated'}"</p>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-slate-600 max-w-xs">
                                                <p className="font-bold text-primary truncate">{item.subject}</p>
                                                <p className="truncate italic">"{item.message}"</p>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {!item.isRead && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full uppercase">
                                                    Unread
                                                </span>
                                            )}
                                            {item.isDone && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                                                    Done
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                                            {!item.isDone ? (
                                                <button
                                                    onClick={() => handleToggleStatus(item.id, 'isDone', true)}
                                                    className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
                                                    title="Mark as Done"
                                                >
                                                    <span className="material-symbols-rounded text-sm">task_alt</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleToggleStatus(item.id, 'isDone', false)}
                                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all"
                                                    title="Undo"
                                                >
                                                    <span className="material-symbols-rounded text-sm">undo</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-slate-100">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                            onClick={() => {
                                setSelectedItem(item);
                                if (!item.isRead) handleToggleStatus(item.id, 'isRead', true);
                            }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                                    <p className="text-[10px] text-slate-500">{item.email}</p>
                                </div>
                                <div className="flex gap-1">
                                    {!item.isRead && <span className="w-2 h-2 rounded-full bg-amber-500" title="Unread"></span>}
                                    {item.isDone && <span className="material-symbols-rounded text-emerald-500 text-sm">check_circle</span>}
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <p className="text-[10px] text-slate-400 font-medium italic truncate max-w-[200px]">
                                    "{type === 'students' ? (item.purpose || 'No purpose') : item.subject}"
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold">{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {!isLoading && data.length === 0 && (
                    <div className="text-center py-20 text-slate-500">No records found.</div>
                )}
            </div>

            {/* Pagination ... */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 font-medium">Total: {totalCount} records</p>
                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="p-2 border border-slate-200 rounded-lg disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-slate-600 flex items-center gap-1"
                    >
                        <span className="material-symbols-rounded text-sm">chevron_left</span> Previous
                    </button>
                    <button
                        disabled={data.length < 20}
                        onClick={() => setPage(p => p + 1)}
                        className="p-2 border border-slate-200 rounded-lg disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-slate-600 flex items-center gap-1"
                    >
                        Next <span className="material-symbols-rounded text-sm">chevron_right</span>
                    </button>
                </div>
            </div>

            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white sm:rounded-[2.5rem] shadow-2xl w-full max-w-2xl h-full sm:h-auto overflow-y-auto sm:overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-6 sm:p-10 lg:p-12">
                            <div className="flex justify-between items-start mb-6 sm:mb-10">
                                <div>
                                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                        <span className={`px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${type === 'students' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                                            {type === 'students' ? 'Application' : 'Contact Lead'}
                                        </span>
                                        {selectedItem.isDone && (
                                            <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                <span className="material-symbols-rounded text-xs sm:text-sm">verified</span> Done
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 leading-tight">{selectedItem.name}</h3>
                                    <p className="text-sm sm:text-base text-slate-500 font-medium">{selectedItem.email}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all flex-shrink-0"
                                >
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-10">
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label className="block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Phone Number</label>
                                        <p className="text-slate-900 font-bold text-base sm:text-lg">{selectedItem.phone}</p>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Submitted On</label>
                                        <p className="text-slate-900 font-bold text-sm sm:text-base">{new Date(selectedItem.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                {type === 'students' ? (
                                    <div className="space-y-4 sm:space-y-6">
                                        <div>
                                            <label className="block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Target Institution</label>
                                            <div className="space-y-2">
                                                <div className="bg-slate-50 p-3 rounded-xl sm:rounded-2xl border border-slate-100">
                                                    <p className="text-[9px] text-slate-500 font-bold uppercase">ID / Ref</p>
                                                    <p className="text-primary font-bold text-xs sm:text-sm truncate">{selectedItem.universityId || 'General Application'}</p>
                                                </div>
                                                {selectedItem.courseId && (
                                                    <div className="bg-primary/5 p-3 rounded-xl sm:rounded-2xl border border-primary/10">
                                                        <p className="text-[9px] text-primary/60 font-bold uppercase">Course Ref</p>
                                                        <p className="text-primary font-bold text-xs sm:text-sm truncate">{selectedItem.courseId}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Subject</label>
                                        <p className="text-slate-900 font-bold text-base sm:text-lg">{selectedItem.subject}</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 border border-slate-100 mb-6 sm:mb-10">
                                <label className="block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-4">Message / Purpose</label>
                                <p className="text-slate-700 leading-relaxed text-sm sm:text-lg italic">
                                    "{type === 'students' ? selectedItem.purpose : selectedItem.message}"
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                {!selectedItem.isDone ? (
                                    <button
                                        onClick={() => handleToggleStatus(selectedItem.id, 'isDone', true)}
                                        className="order-3 sm:order-none flex-1 bg-slate-900 text-white font-bold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 text-sm sm:text-base"
                                    >
                                        <span className="material-symbols-rounded text-xl">check_circle</span> Mark as Processed
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleToggleStatus(selectedItem.id, 'isDone', false)}
                                        className="order-3 sm:order-none flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <span className="material-symbols-rounded text-xl">undo</span> Reset Status
                                    </button>
                                )}
                                <div className="flex gap-3 sm:gap-4">
                                    <a
                                        href={`mailto:${selectedItem.email}`}
                                        className="flex-1 sm:w-16 h-12 sm:h-14 bg-primary text-white rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                    >
                                        <span className="material-symbols-rounded">mail</span>
                                    </a>
                                    <a
                                        href={`tel:${selectedItem.phone}`}
                                        className="flex-1 sm:w-16 h-12 sm:h-14 bg-accent text-white rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                                    >
                                        <span className="material-symbols-rounded">call</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminStudents;
