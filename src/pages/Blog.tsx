import React from 'react';

const Blog: React.FC = () => {
    const posts = [
        { id: 1, title: 'How to Choose the Right University in Malaysia', date: 'Oct 24, 2023', category: 'Guide', excerpt: 'Choosing a university is one of the most important decisions you will make. Here is what to look for.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800' },
        { id: 2, title: 'Top 5 Scholarships for International Students', date: 'Nov 12, 2023', category: 'Scholarships', excerpt: 'Financial aid can significantly reduce your education costs. Explore the top options available.', image: 'https://images.unsplash.com/photo-1523050853064-db086a30002.jpeg?auto=format&fit=crop&q=80&w=800' },
        { id: 3, title: 'Student Life in Kuala Lumpur: What to Expect', date: 'Dec 05, 2023', category: 'Lifestyle', excerpt: 'KL is a vibrant city with a rich culture. Here is a guide to living as a student in the capital.', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc183f27?auto=format&fit=crop&q=80&w=800' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <div className="text-center mb-10 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mb-4 px-2 tracking-tight">Latest from Our Blog</h1>
                    <p className="text-base sm:text-lg text-slate-600">Insights, guides, and news for international students.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {posts.map(post => (
                        <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">{post.category}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-slate-500 mb-2">{post.date}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                                <button className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
                                    Read More <span className="material-symbols-rounded text-base">arrow_forward</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
