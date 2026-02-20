import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AdminCourses: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [universities, setUniversities] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        universityId: '',
        level: 'Bachelor',
        duration: '',
        tuitionFee: '',
        description: '',
        imageUrl: '',
        isActive: true
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [coursesRes, unisRes] = await Promise.all([
                api.getCourses(true),
                api.getUniversities(true)
            ]);
            if (coursesRes.success) setCourses(coursesRes.data);
            if (unisRes.success) setUniversities(unisRes.data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = (course: any = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({
                name: course.name,
                universityId: course.universityId,
                level: course.level,
                duration: course.duration || '',
                tuitionFee: course.tuitionFee || '',
                description: course.description || '',
                imageUrl: course.imageUrl || '',
                isActive: course.isActive
            });
        } else {
            setEditingCourse(null);
            setFormData({
                name: '',
                universityId: universities[0]?.id || '',
                level: 'Bachelor',
                duration: '',
                tuitionFee: '',
                description: '',
                imageUrl: '',
                isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Find selected university name to keep DB consistent
            const selectedUni = universities.find(u => u.id === formData.universityId);
            const dataWithUniName = {
                ...formData,
                universityName: selectedUni?.name || 'Unknown University'
            };

            const response = editingCourse
                ? await api.updateCourse(editingCourse.id, dataWithUniName)
                : await api.createCourse(dataWithUniName);

            if (response.success) {
                setIsModalOpen(false);
                fetchData();
            }
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;
        try {
            const response = await api.deleteCourse(id);
            if (response.success) fetchData();
        } catch (error) {
            alert('Delete failed');
        }
    };

    const getUniversityName = (course: any) => {
        return universities.find(u => u.id === course.universityId)?.name || course.universityName || 'Unknown University';
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Courses</h2>
                    <p className="text-slate-500 text-sm">Manage educational programs across all universities.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#06083D] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                >
                    <span className="material-symbols-rounded">add</span> Add Course
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Course Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">University</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Level</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {course.imageUrl ? (
                                                    <img src={course.imageUrl} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="material-symbols-rounded text-slate-400 text-sm">book</span>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{course.name}</div>
                                                <div className={`mt-0.5 text-[9px] font-bold uppercase ${course.isActive ? 'text-green-500' : 'text-slate-400'}`}>
                                                    {course.isActive ? 'Active' : 'Inactive'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                                            <span className="material-symbols-rounded text-sm">school</span>
                                            {getUniversityName(course)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">{course.level}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenModal(course)}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                <span className="material-symbols-rounded text-xl">edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
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
                    {courses.map((course) => (
                        <div key={course.id} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex gap-3 min-w-0">
                                    <div className="w-10 h-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {course.imageUrl ? (
                                            <img src={course.imageUrl} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="material-symbols-rounded text-slate-300 text-sm">book</span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-900 text-sm truncate">{course.name}</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{course.level}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleOpenModal(course)}
                                        className="p-2 text-slate-400 hover:text-primary active:bg-slate-100 rounded-lg"
                                    >
                                        <span className="material-symbols-rounded text-xl">edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 active:bg-red-50 rounded-lg"
                                    >
                                        <span className="material-symbols-rounded text-xl">delete</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md text-[10px] font-bold truncate max-w-[200px]">
                                    <span className="material-symbols-rounded text-[14px]">school</span>
                                    {getUniversityName(course)}
                                </span>
                                {!course.isActive && (
                                    <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-md text-[10px] font-bold uppercase">Inactive</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {!isLoading && courses.length === 0 && (
                    <div className="text-center py-20 text-slate-500">No courses found.</div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white sm:rounded-[2rem] w-full max-w-2xl h-full sm:h-auto overflow-y-auto relative shadow-2xl animate-in fade-in zoom-in duration-300">
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                            <div className="flex justify-between items-center mb-6 sm:mb-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{editingCourse ? 'Edit Course' : 'Add Course'}</h3>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Course Name</label>
                                    <input
                                        type="text" required value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                        placeholder="e.g. Computer Science"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">University</label>
                                    <select
                                        required value={formData.universityId}
                                        onChange={e => setFormData({ ...formData, universityId: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                    >
                                        <option value="" disabled>Select University</option>
                                        {universities.map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Level</label>
                                    <select
                                        value={formData.level}
                                        onChange={e => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                    >
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Master">Master</option>
                                        <option value="PhD">PhD</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Foundation">Foundation</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Duration</label>
                                    <input
                                        type="text" value={formData.duration}
                                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                        placeholder="e.g. 3 Years"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Tuition Fee</label>
                                    <input
                                        type="text" value={formData.tuitionFee}
                                        onChange={e => setFormData({ ...formData, tuitionFee: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                        placeholder="e.g. $10,000 / year"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Course Image URL</label>
                                    <input
                                        type="text" value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-[10px] sm:text-sm"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Status</label>
                                    <div className="flex gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border-2 border-slate-50">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio" name="isActive" checked={formData.isActive}
                                                onChange={() => setFormData({ ...formData, isActive: true })}
                                            />
                                            <span className="text-xs sm:text-sm font-bold text-slate-700">Active</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio" name="isActive" checked={!formData.isActive}
                                                onChange={() => setFormData({ ...formData, isActive: false })}
                                            />
                                            <span className="text-sm font-bold text-slate-700">Inactive</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-50 rounded-xl sm:rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm sm:text-base"
                                        placeholder="Course details..."
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full mt-6 sm:mt-8 py-4 sm:py-5 bg-[#06083D] text-white rounded-[1rem] sm:rounded-[1.25rem] font-black text-base sm:text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                {editingCourse ? 'Save Changes' : 'Create Course'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCourses;
