import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AdminBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        author: '',
        isPublished: true
    });

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await api.getBlogs(true);
            if (response.success) setBlogs(response.data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleOpenModal = (blog: any = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                excerpt: blog.excerpt || '',
                content: blog.content || '',
                imageUrl: blog.imageUrl || '',
                author: blog.author || '',
                isPublished: blog.isPublished
            });
        } else {
            setEditingBlog(null);
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                imageUrl: '',
                author: user.name || 'Admin',
                isPublished: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = editingBlog
                ? await api.updateBlog(editingBlog.id, formData)
                : await api.createBlog(formData);

            if (response.success) {
                setIsModalOpen(false);
                fetchBlogs();
            }
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;
        try {
            const response = await api.deleteBlog(id);
            if (response.success) fetchBlogs();
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Blog Posts</h2>
                    <p className="text-slate-500 text-sm">Manage news and updates on your website.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#06083D] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                >
                    <span className="material-symbols-rounded">post_add</span> Create Post
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Title</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Author</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900 truncate max-w-xs">{blog.title}</div>
                                    <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Slug: {blog.slug}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium">{blog.author}</td>
                                <td className="px-6 py-4 text-slate-500 text-sm">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {blog.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleOpenModal(blog)}
                                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        >
                                            <span className="material-symbols-rounded text-xl">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
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
                {!isLoading && blogs.length === 0 && (
                    <div className="text-center py-20 text-slate-500">No blog posts found.</div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-[2rem] w-full max-w-4xl relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <form onSubmit={handleSubmit} className="p-8 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-900">{editingBlog ? 'Edit Post' : 'Create New Post'}</h3>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                                    <input
                                        type="text" required value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                        placeholder="Enter blog title..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Author</label>
                                    <input
                                        type="text" required value={formData.author}
                                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                                    <select
                                        value={formData.isPublished ? 'true' : 'false'}
                                        onChange={e => setFormData({ ...formData, isPublished: e.target.value === 'true' })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                    >
                                        <option value="true">Published</option>
                                        <option value="false">Draft</option>
                                    </select>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Image URL</label>
                                    <input
                                        type="text" value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 text-sm"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Excerpt (Short Summary)</label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                        rows={2}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700"
                                        placeholder="Brief summary for list view..."
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Content (Supports HTML/Markdown)</label>
                                    <textarea
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                        rows={10}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-slate-700 font-mono text-sm"
                                        placeholder="Full blog content content..."
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full mt-8 py-5 bg-[#06083D] text-white rounded-[1.25rem] font-black text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                {editingBlog ? 'Save Changes' : 'Publish Blog'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogs;
