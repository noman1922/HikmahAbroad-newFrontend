import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        passwordHash: '',
        role: 'agent'
    });

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await api.getUsers();
            if (response.success) setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpenModal = (user: any = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                email: user.email,
                passwordHash: '', // Clear for security
                role: user.role
            });
        } else {
            setEditingUser(null);
            setFormData({
                name: '',
                email: '',
                passwordHash: '',
                role: 'agent'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = editingUser
                ? await api.updateUser(editingUser.id, formData)
                : await api.createUser(formData);

            if (response.success) {
                setIsModalOpen(false);
                fetchUsers();
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this account?')) return;
        try {
            const response = await api.deleteUser(id);
            if (response.success) fetchUsers();
            else alert(response.message);
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                    <p className="text-slate-500 text-sm">Admins can create and manage agent accounts.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                >
                    <span className="material-symbols-rounded">person_add</span> Add New Account
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Email</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleOpenModal(user)}
                                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        >
                                            <span className="material-symbols-rounded text-xl">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
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
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-[2rem] w-full max-w-md relative shadow-2xl animate-in fade-in zoom-in duration-300">
                        <form onSubmit={handleSubmit} className="p-8">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">{editingUser ? 'Edit Account' : 'Create Agent'}</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                                    <input
                                        type="text" required value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                                    <input
                                        type="email" required value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Password {editingUser && '(Leave blank to keep current)'}</label>
                                    <input
                                        type="password" required={!editingUser} value={formData.passwordHash}
                                        onChange={e => setFormData({ ...formData, passwordHash: e.target.value })}
                                        className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold"
                                    >
                                        <option value="agent">Agent</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="w-full mt-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                                {editingUser ? 'Save Changes' : 'Create Account'}
                            </button>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="w-full mt-2 py-4 text-slate-400 font-bold text-sm">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
