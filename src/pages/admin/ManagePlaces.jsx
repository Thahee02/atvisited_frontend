import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, MapPin, Tag, Globe, Image as ImageIcon, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import api from '../../services/api';
import { toast } from 'react-toastify';

const ManagePlaces = () => {
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPlace, setEditingPlace] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        imageUrl: '',
        categoryId: '',
        rating: 0,
        openingHours: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [placesRes, catsRes] = await Promise.all([
                api.get('/places'),
                api.get('/categories')
            ]);
            setPlaces(placesRes.data);
            setCategories(catsRes.data);
        } catch (error) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (place = null) => {
        if (place) {
            setEditingPlace(place);
            setFormData({
                name: place.name,
                description: place.description,
                address: place.address,
                latitude: place.latitude,
                longitude: place.longitude,
                imageUrl: place.imageUrl,
                categoryId: place.categoryId,
                rating: place.rating,
                openingHours: place.openingHours
            });
        } else {
            setEditingPlace(null);
            setFormData({
                name: '',
                description: '',
                address: '',
                latitude: '',
                longitude: '',
                imageUrl: '',
                categoryId: '',
                rating: 0,
                openingHours: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this place?')) return;
        try {
            await api.delete(`/places/${id}`);
            toast.success('Place deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete place');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingPlace) {
                await api.put(`/places/${editingPlace.id}`, formData);
                toast.success('Place updated successfully');
            } else {
                await api.post('/places', formData);
                toast.success('Place created successfully');
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            toast.error('Failed to save place');
        } finally {
            setLoading(false);
        }
    };

    const filteredPlaces = places.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-6 lg:p-10 font-sans">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 cursor-pointer">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-3xl font-extrabold tracking-tight">Manage Places</h1>
                    <p className="text-white/50 text-sm mt-1">Found {places.length} places in your database</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search places..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 w-64 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Place</span>
                    </button>
                </div>
            </header>

            {loading && places.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <p className="text-white/40 mt-4 font-medium italic">Loading your database...</p>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-white/50 text-xs font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-5">Place</th>
                                    <th className="px-6 py-5">Category</th>
                                    <th className="px-6 py-5">Location</th>
                                    <th className="px-6 py-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredPlaces.map((place) => (
                                    <tr key={place.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 ring-1 ring-white/10 group-hover:ring-emerald-500/30 transition-all">
                                                    {place.imageUrl ? (
                                                        <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                                            <ImageIcon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight text-sm">{place.name}</div>
                                                    <div className="text-white/40 text-xs mt-0.5 line-clamp-1 italic">{place.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest leading-none">
                                                {place.categoryName || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-white/60 group-hover:text-white/80 transition-colors">
                                                <MapPin className="w-3.5 h-3.5 text-emerald-400/60" />
                                                <span className="text-xs font-medium uppercase truncate max-w-[200px]">{place.address}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(place)}
                                                    className="p-2.5 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-white/50 rounded-xl transition-all border border-white/10 cursor-pointer"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(place.id)}
                                                    className="p-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/50 rounded-xl transition-all border border-white/10 cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredPlaces.length === 0 && !loading && (
                        <div className="p-20 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-10 h-10 text-white/20" />
                            </div>
                            <p className="text-white/30 font-medium tracking-wide">No places found matching your search.</p>
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
                            className="bg-[#1E293B] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative z-10 p-8 sm:p-10"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-extrabold tracking-tight">{editingPlace ? 'Edit Destination' : 'New Destination'}</h2>
                                    <p className="text-white/40 text-sm mt-1 uppercase tracking-widest font-bold">Location Details & Configuration</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-3 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-2xl transition-all cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Place Name</label>
                                            <input
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                                placeholder="e.g. Ella Nine Arch Bridge"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Category</label>
                                            <select
                                                required
                                                value={formData.categoryId}
                                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none"
                                            >
                                                <option value="" className="bg-[#1E293B]">Select a category</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id} className="bg-[#1E293B]">{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Address</label>
                                            <input
                                                required
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="Full location address"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Latitude</label>
                                                <input
                                                    type="number" step="any" required
                                                    value={formData.latitude}
                                                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Longitude</label>
                                                <input
                                                    type="number" step="any" required
                                                    value={formData.longitude}
                                                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Image URL</label>
                                            <input
                                                value={formData.imageUrl}
                                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono text-sm"
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Description</label>
                                            <textarea
                                                rows="4"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                                                placeholder="Tell us about this amazing place..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest block ml-1">Opening Hours</label>
                                            <input
                                                value={formData.openingHours}
                                                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                                placeholder="e.g. 8:00 AM - 6:00 PM"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-8 py-4 text-white font-bold opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        Discard Changes
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                                        {editingPlace ? 'Update Entity' : 'Finalize & Save'}
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

export default ManagePlaces;
