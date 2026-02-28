import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Tag, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import { toast } from 'react-toastify';

const ManageCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (error) {
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                description: category.description || '',
                icon: category.icon || ''
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                description: '',
                icon: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This might affect places in this category.')) return;
        try {
            await api.delete(`/categories/${id}`);
            toast.success('Category removed');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory.id}`, formData);
                toast.success('Category updated');
            } else {
                await api.post('/categories', formData);
                toast.success('Category created');
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            toast.error('Failed to save category');
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-6 lg:p-10 font-sans">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 cursor-pointer">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-3xl font-extrabold tracking-tight">Main Categories</h1>
                    <p className="text-white/50 text-sm mt-1">Organize your destinations into logical groups</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 w-64 text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                        />
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        <span>New Category</span>
                    </button>

                </div>
            </header>

            {loading && categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <p className="text-white/40 mt-4 font-medium italic">Loading categories...</p>
                </div>

            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm relative group hover:border-emerald-500/30 transition-all"
                        >

                            <div className="flex items-start justify-between">
                                <div className="p-5 bg-emerald-500/10 text-emerald-400 rounded-[1.25rem] mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                                    <Tag className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleOpenModal(category)}
                                        className="p-2.5 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-white/30 rounded-xl transition-all border border-white/10 cursor-pointer"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="p-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/30 rounded-xl transition-all border border-white/10 cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{category.name}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{category.description || 'No description provided for this category.'}</p>

                            <div className="mt-8 flex items-center justify-between">
                                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                                    System Category
                                </div>
                                <span className="text-white/20 text-xs font-mono">ID: {category.id}</span>
                            </div>
                        </motion.div>
                    ))}

                    {filteredCategories.length === 0 && !loading && (
                        <div className="col-span-full p-20 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-10 h-10 text-white/20" />
                            </div>
                            <p className="text-white/30 font-medium">No categories found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#1E293B] border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 p-10"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-extrabold tracking-tight">{editingCategory ? 'Edit Category' : 'New Category'}</h2>
                                    <p className="text-white/40 text-sm mt-1 uppercase tracking-widest font-bold">Classification Settings</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-3 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-2xl transition-all cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Category Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold placeholder:text-white/10"
                                            placeholder="e.g. Beaches, Mountains, Heritage"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Icon Name (Lucide)</label>
                                        <input
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono text-sm"
                                            placeholder="e.g. MapPin, Church, Waves"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Description</label>
                                        <textarea
                                            rows="3"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all resize-none text-sm leading-relaxed"
                                            placeholder="Short description of this category..."
                                        />
                                    </div>

                                </div>

                                <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-white font-bold opacity-30 hover:opacity-100 transition-opacity cursor-pointer text-sm"
                                    >
                                        Cancel Changes
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                                        {editingCategory ? 'Update Category' : 'Create Category'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageCategories;
