import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState([
        { label: 'Total Universities', value: '0', icon: 'school', color: 'bg-blue-500' },
        { label: 'Active Courses', value: '0', icon: 'book', color: 'bg-indigo-500' },
        { label: 'Applications', value: '0', icon: 'person_search', color: 'bg-emerald-500' },
        { label: 'Contact Leads', value: '0', icon: 'contact_support', color: 'bg-amber-500' },
    ]);
    const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [unis, courses, students, contacts] = await Promise.all([
                    api.getUniversities(true),
                    api.getCourses(true),
                    api.getStudents(1, 5),
                    api.getContacts(1, 5)
                ]);

                setStats([
                    { label: 'Total Universities', value: unis.data?.length.toString() || '0', icon: 'school', color: 'bg-blue-500' },
                    { label: 'Active Courses', value: courses.data?.filter((c: any) => c.isActive).length.toString() || '0', icon: 'book', color: 'bg-indigo-500' },
                    { label: 'Applications', value: students.totalCount?.toString() || '0', icon: 'person_search', color: 'bg-emerald-500' },
                    { label: 'Contact Leads', value: contacts.totalCount?.toString() || '0', icon: 'contact_support', color: 'bg-amber-500' },
                ]);

                // Combine most recent from both
                const combined = [
                    ...(students.data || []).map((s: any) => ({ ...s, type: 'Application' })),
                    ...(contacts.data || []).map((c: any) => ({ ...c, type: 'Contact' }))
                ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5);

                setRecentInquiries(combined);
            } catch (error) {
                console.error('Dashboard fetch failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        onClick={() => {
                            if (stat.label === 'Total Universities') navigate('/admin/universities');
                            if (stat.label === 'Active Courses') navigate('/admin/courses');
                            if (stat.label === 'Applications') navigate('/admin/inquiries', { state: { type: 'students' } });
                            if (stat.label === 'Contact Leads') navigate('/admin/inquiries', { state: { type: 'contacts' } });
                        }}
                        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 active:scale-95 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                <span className="material-symbols-rounded text-xl sm:text-2xl">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">Recent Inquiries</h3>
                        <button onClick={() => navigate('/admin/inquiries')} className="text-primary text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center py-10">
                                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : recentInquiries.length > 0 ? (
                            recentInquiries.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex-shrink-0 flex items-center justify-center font-bold text-slate-600 border border-slate-200 uppercase text-xs sm:text-sm">
                                            {item.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-slate-900 text-sm truncate">{item.name}</p>
                                            <p className="text-[10px] sm:text-xs text-slate-500 truncate">{item.type} • {new Date(item.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary flex-shrink-0 ml-2">Details</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-10 text-slate-400 text-xs sm:text-sm">No recent inquiries.</p>
                        )}
                    </div>
                </div>

                <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {[
                            { name: 'Add University', icon: 'add_business', color: 'text-blue-600', bg: 'bg-blue-50', path: '/admin/universities' },
                            { name: 'New Course', icon: 'library_add', color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/admin/courses' },
                            { name: 'Post Blog', icon: 'post_add', color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/admin/blogs' },
                            { name: 'Update Site', icon: 'auto_fix_high', color: 'text-amber-600', bg: 'bg-amber-50', path: '/admin/settings' },
                        ].map((action) => (
                            <button
                                key={action.name}
                                onClick={() => navigate(action.path)}
                                className={`${action.bg} ${action.color} p-4 sm:p-6 rounded-2xl flex flex-col items-center gap-2 sm:gap-3 hover:scale-105 transition-all font-bold text-xs sm:text-sm`}
                            >
                                <span className="material-symbols-rounded text-2xl sm:text-3xl">{action.icon}</span>
                                {action.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
