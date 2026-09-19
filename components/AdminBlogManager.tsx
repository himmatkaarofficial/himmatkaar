"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { 
  Plus, Edit, Trash2, Upload, Loader2, X, Filter, Eye, Calendar, User, Clock
} from "lucide-react";

// Dynamically import RichTextEditor to avoid SSR issues
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => <div className="border border-slate-300 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
    <Loader2 className="animate-spin text-[#39894c]" size={24} />
  </div>
});

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  read_time: string;
  image: string;
  category: string;
  content: string;
  published: boolean;
}

export default function AdminBlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    author: "",
    date: "",
    read_time: "",
    image: "",
    category: "",
    content: "",
    published: true
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog', { cache: 'no-store' });
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'blog');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate slug if not provided
    const slug = formData.slug || generateSlug(formData.title);
    const dataToSubmit = { ...formData, slug };
    
    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      });

      if (response.ok) {
        await fetchPosts();
        closeModal();
        alert(editingPost ? 'Blog post updated!' : 'Blog post created!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save blog post');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchPosts();
        alert('Blog post deleted!');
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post');
    }
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      slug: "",
      title: "",
      excerpt: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      read_time: "",
      image: "",
      category: "",
      content: "",
      published: true
    });
    setShowModal(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      read_time: post.read_time,
      image: post.image,
      category: post.category,
      content: post.content,
      published: post.published
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPost(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#39894c]" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium shadow-sm">
            <Filter size={20} />
            Filter
          </button>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-[#39894c] text-white rounded-lg hover:bg-[#2d5f3d] transition-all font-bold shadow-lg shadow-[#39894c]/20"
        >
          <Plus size={20} />
          Create New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Total Posts</p>
          <p className="text-3xl font-extrabold text-slate-900">{posts.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Published</p>
          <p className="text-3xl font-extrabold text-slate-900">{posts.filter(p => p.published).length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Drafts</p>
          <p className="text-3xl font-extrabold text-slate-900">{posts.filter(p => !p.published).length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Categories</p>
          <p className="text-3xl font-extrabold text-slate-900">{new Set(posts.map(p => p.category)).size}</p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-48 overflow-hidden">
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#39894c] text-white px-3 py-1 rounded-full text-xs font-bold">
                {post.category}
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  post.published ? 'bg-green-500/90 text-white' : 'bg-slate-500/90 text-white'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.read_time}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                <Calendar size={14} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => openEditModal(post)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#39894c]/10 text-[#39894c] rounded-lg hover:bg-[#39894c] hover:text-white transition-all font-medium text-sm"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <Trash2 size={16} />
                </button>
                <a 
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
                >
                  <Eye size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingPost ? 'Edit Blog Post' : 'Create New Post'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                    placeholder="5 Ways to Build a Successful Startup"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Slug (auto-generated if empty)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                    placeholder="5-ways-to-build-successful-startup"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Excerpt *</label>
                  <textarea
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                    placeholder="Brief description of the blog post..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Author *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                    placeholder="Ahmed Khan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                    placeholder="Entrepreneurship, Leadership, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Read Time *</label>
                  <input
                    type="text"
                    required
                    value={formData.read_time}
                    onChange={(e) => setFormData({...formData, read_time: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                    placeholder="5 min read"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Content *</label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData({...formData, content})}
                    placeholder="Write your blog content here..."
                  />
                  <p className="text-xs text-slate-500 mt-2">Use the toolbar to format your content with headings, lists, links, and images.</p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Featured Image *</label>
                  <div className="space-y-3">
                    {formData.image && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-300">
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all cursor-pointer font-medium">
                        <Upload size={18} />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                      {uploading && <Loader2 className="animate-spin text-[#39894c]" size={20} />}
                    </div>
                    <p className="text-xs text-slate-500">Max 5MB. Supported: JPEG, PNG, WebP</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({...formData, published: e.target.checked})}
                      className="w-4 h-4 text-[#39894c] border-slate-300 rounded focus:ring-[#39894c]"
                    />
                    <span className="text-sm font-medium text-slate-700">Publish immediately</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-[#39894c] text-white rounded-lg hover:bg-[#2d5f3d] transition-all font-bold disabled:opacity-50 shadow-lg"
                >
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

