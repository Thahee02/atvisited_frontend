import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit2, Trash2, X, MapPin, Tag,
    Image as ImageIcon, Loader2, Upload,
    Clock, DollarSign, Info, Shield, Coffee, Users,
    Car, Bath, History, Globe
} from 'lucide-react';
import api, { getFullImageUrl } from '../../services/api';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';

const ManagePlaces = () => {
    const fileInputRef = useRef(null);
    const [places, setPlaces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPlace, setEditingPlace] = useState(null);
    const [uploading, setUploading] = useState(false);

    const initialFormState = {
        name: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        imageUrl: '',
        categoryId: '',
        estimatedCost: '',
        openingTime: '',
        closingTime: '',
        bestTimeToVisit: '',
        parkingAvailable: false,
        washroomsAvailable: false,
        historicalBackground: '',
        culturalSignificance: '',
        transportOptions: '',
        safetyGuidelines: '',
        localCustoms: '',
        nearbyFacilities: '',
        suitableFor: '',
        estimatedVisitDuration: '',
        accessibilityInfo: '',
        contactNumber: '',
        websiteUrl: ''
    };

    const [formData, setFormData] = useState(initialFormState);

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

    const handleOpenModal = async (place = null) => {
        if (place) {
            setLoading(true);
            try {
                // Fetch full details for editing
                const res = await api.get(`/places/${place.id}`);
                const fullPlace = res.data;
                setEditingPlace(fullPlace);
                setFormData({
                    ...initialFormState,
                    ...fullPlace,
                    // Ensure times are in HH:mm format for input type="time"
                    openingTime: fullPlace.openingTime ? fullPlace.openingTime.substring(0, 5) : '',
                    closingTime: fullPlace.closingTime ? fullPlace.closingTime.substring(0, 5) : '',
                    estimatedCost: fullPlace.estimatedCost || '',
                    categoryId: fullPlace.categoryId || ''
                });
            } catch (error) {
                toast.error('Failed to fetch place details');
            } finally {
                setLoading(false);
            }
        } else {
            setEditingPlace(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('file', file);

        setUploading(true);
        try {
            const res = await api.post('/files/upload', uploadData);
            setFormData(prev => ({ ...prev, imageUrl: res.data }));
            toast.success('Image uploaded successfully');
        } catch (error) {
            let errorMsg = error.response?.data;
            if (typeof errorMsg === 'object') {
                errorMsg = errorMsg.message || JSON.stringify(errorMsg);
            }
            errorMsg = errorMsg || error.message;
            toast.error(`Upload failed: ${errorMsg}`);
            console.error('Upload error details:', error);
        } finally {
            setUploading(false);
        }
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

        // Sanitize data before sending (e.g., ensure openingTime is HH:mm:ss if backend needs it)
        const payload = {
            ...formData,
            // Convert to HH:mm:00 if needed, though LocalTime often accepts HH:mm
            openingTime: formData.openingTime ? `${formData.openingTime}:00` : null,
            closingTime: formData.closingTime ? `${formData.closingTime}:00` : null,
        };

        try {
            if (editingPlace) {
                await api.put(`/places/${editingPlace.id}`, payload);
                toast.success('Place updated successfully');
            } else {
                await api.post('/places', payload);
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
        (p.address && p.address.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getFullImageUrlWrapper = (path) => getFullImageUrl(path, null);

    return (
        <AdminLayout>
        <div className="p-6 lg:p-10 text-white font-sans">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-2">Management</p>
                    <h1 className="text-3xl font-extrabold tracking-tight">Manage Places</h1>
                    <p className="text-white/50 text-sm mt-1">Total {places.length} destinations available</p>
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
                    <p className="text-white/40 mt-4 font-medium italic">Synchronizing database...</p>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10">
                                <tr>
                                    <th className="px-8 py-6">Destination</th>
                                    <th className="px-8 py-6">Category</th>
                                    <th className="px-8 py-6">Address</th>
                                    <th className="px-8 py-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredPlaces.map((place) => (
                                    <tr key={place.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 group-hover:ring-emerald-500/30 transition-all flex-shrink-0">
                                                    {place.imageUrl ? (
                                                        <img src={getFullImageUrl(place.imageUrl)} alt={place.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/10">
                                                            <ImageIcon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight text-sm">{place.name}</div>
                                                    <div className="text-white/30 text-[10px] mt-1 line-clamp-1 italic max-w-xs">{place.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20 uppercase tracking-widest">
                                                {place.categoryName || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                                                <MapPin className="w-3.5 h-3.5 text-emerald-500/40" />
                                                <span className="text-xs font-medium truncate max-w-[200px]">{place.address?.toUpperCase() || 'No address set'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => handleOpenModal(place)}
                                                    className="p-3 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-white/40 rounded-xl transition-all border border-white/5 cursor-pointer"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(place.id)}
                                                    className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/40 rounded-xl transition-all border border-white/5 cursor-pointer"
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
                            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6">
                                <Search className="w-10 h-10 text-white/10" />
                            </div>
                            <p className="text-white/30 font-bold uppercase tracking-widest text-xs italic">No matching destinations found</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            className="bg-[#0F172A] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl relative z-10 p-8 sm:p-12"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                                        {editingPlace ? 'Update Place' : 'Create Place'}
                                    </h2>
                                    <p className="text-emerald-500/60 text-[10px] mt-2 font-black uppercase tracking-[0.3em]">
                                        Destination Management
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-4 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-[1.5rem] transition-all cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-12">
                                {/* Visual Upload Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-1">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Visual Representation</label>
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="aspect-[4/5] rounded-[2.5rem] bg-white/5 border-2 border-dashed border-white/10 hover:border-emerald-500/50 transition-all group relative overflow-hidden cursor-pointer"
                                            >
                                                {formData.imageUrl ? (
                                                    <img src={getFullImageUrl(formData.imageUrl)} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                                        <Upload className="w-10 h-10 text-white/20 group-hover:text-emerald-500 transition-colors" />
                                                        <span className="text-[10px] font-black text-white/20 group-hover:text-white/40 uppercase tracking-widest">Select Image File</span>
                                                    </div>
                                                )}
                                                {uploading && (
                                                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                                                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    hidden
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                />
                                            </div>
                                            <p className="text-[10px] text-white/20 italic text-center uppercase tracking-tighter font-medium">JPG, PNG, WEBP (Max 5MB)</p>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2 space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Primary Identity</label>
                                                <div className="relative">
                                                    <Info className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                    <input
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/10"
                                                        placeholder="PLACE NAME"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Classification</label>
                                                <div className="relative">
                                                    <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                    <select
                                                        required
                                                        value={formData.categoryId}
                                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                                                    >
                                                        <option value="" className="bg-[#0F172A]">SELECT CATEGORY</option>
                                                        {categories.map(cat => (
                                                            <option key={cat.id} value={cat.id} className="bg-[#0F172A] uppercase">{cat.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Strategic Narrative</label>
                                            <textarea
                                                rows="5"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 px-8 text-white text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all resize-none leading-relaxed placeholder:text-white/10"
                                                placeholder="DESCRIBE THE ESSENCE OF THIS DESTINATION..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Parameters Section */}
                                <div className="space-y-12 pt-12 border-t border-white/10">
                                    <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em] flex items-center gap-4">
                                        <div className="h-px w-8 bg-emerald-500/30"></div>
                                        Technical Parameters
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Geospatial: Latitude</label>
                                            <div className="relative">
                                                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                <input type="number" step="any" required
                                                    value={formData.latitude}
                                                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                                                    placeholder="0.000000"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Geospatial: Longitude</label>
                                            <div className="relative">
                                                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                <input type="number" step="any" required
                                                    value={formData.longitude}
                                                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                                                    placeholder="0.000000"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Geo-Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                <input
                                                    required
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all uppercase"
                                                    placeholder="PHYSICAL LOCATION ADDRESS"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Protocol: Start</label>
                                            <div className="relative">
                                                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                <input type="time"
                                                    value={formData.openingTime}
                                                    onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-400/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Protocol: End</label>
                                            <div className="relative">
                                                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                <input type="time"
                                                    value={formData.closingTime}
                                                    onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-400/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Unit Cost (LKR)</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                <input type="number"
                                                    value={formData.estimatedCost}
                                                    onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Duration Delta</label>
                                            <div className="relative">
                                                <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                <input
                                                    value={formData.estimatedVisitDuration}
                                                    onChange={(e) => setFormData({ ...formData, estimatedVisitDuration: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/10"
                                                    placeholder="e.g. 2 HOURS"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience & Facilities Section */}
                                <div className="space-y-12 pt-12 border-t border-white/10">
                                    <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em] flex items-center gap-4">
                                        <div className="h-px w-8 bg-emerald-500/30"></div>
                                        Experience Profile
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Historic Context</label>
                                                <div className="relative group">
                                                    <History className="absolute left-6 top-6 w-4 h-4 text-white/20 group-focus-within:text-emerald-500/50 transition-colors" />
                                                    <textarea
                                                        rows="3"
                                                        value={formData.historicalBackground}
                                                        onChange={(e) => setFormData({ ...formData, historicalBackground: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-6 pl-16 pr-8 text-white text-xs font-medium focus:outline-none focus:border-emerald-500/50 transition-all resize-none leading-relaxed"
                                                        placeholder="UNVEIL THE ANCIENT TALES..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Cultural Significance</label>
                                                <div className="relative group">
                                                    <Users className="absolute left-6 top-6 w-4 h-4 text-white/20 group-focus-within:text-emerald-500/50 transition-colors" />
                                                    <textarea
                                                        rows="3"
                                                        value={formData.culturalSignificance}
                                                        onChange={(e) => setFormData({ ...formData, culturalSignificance: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-6 pl-16 pr-8 text-white text-xs font-medium focus:outline-none focus:border-emerald-500/50 transition-all resize-none leading-relaxed"
                                                        placeholder="VITALITY TO THE LOCAL IDENTITY..."
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Safety Protocols</label>
                                                <div className="relative group">
                                                    <Shield className="absolute left-6 top-6 w-4 h-4 text-white/20 group-focus-within:text-emerald-500/50 transition-colors" />
                                                    <textarea
                                                        rows="3"
                                                        value={formData.safetyGuidelines}
                                                        onChange={(e) => setFormData({ ...formData, safetyGuidelines: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-6 pl-16 pr-8 text-white text-xs font-medium focus:outline-none focus:border-emerald-500/50 transition-all resize-none leading-relaxed"
                                                        placeholder="RISK MITIGATION STRATEGIES..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">Logistics: Transport</label>
                                                <div className="relative group">
                                                    <Car className="absolute left-6 top-6 w-4 h-4 text-white/20 group-focus-within:text-emerald-500/50 transition-colors" />
                                                    <textarea
                                                        rows="3"
                                                        value={formData.transportOptions}
                                                        onChange={(e) => setFormData({ ...formData, transportOptions: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-6 pl-16 pr-8 text-white text-xs font-medium focus:outline-none focus:border-emerald-500/50 transition-all resize-none leading-relaxed"
                                                        placeholder="ACCESS VECTORS & TRANSIT MODES..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Binary Status Attributes */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div
                                            onClick={() => setFormData(p => ({ ...p, parkingAvailable: !p.parkingAvailable }))}
                                            className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center gap-5 ${formData.parkingAvailable ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${formData.parkingAvailable ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/20'}`}>
                                                <Car size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Parking</div>
                                                <div className="text-xs font-bold uppercase">{formData.parkingAvailable ? 'Secured' : 'Restricted'}</div>
                                            </div>
                                        </div>

                                        <div
                                            onClick={() => setFormData(p => ({ ...p, washroomsAvailable: !p.washroomsAvailable }))}
                                            className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center gap-5 ${formData.washroomsAvailable ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${formData.washroomsAvailable ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/20'}`}>
                                                <Bath size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Sanitary</div>
                                                <div className="text-xs font-bold uppercase">{formData.washroomsAvailable ? 'Verified' : 'N/A'}</div>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-5 group">
                                            <div className="w-10 h-10 rounded-2xl bg-white/5 text-white/20 flex items-center justify-center group-focus-within:bg-emerald-500 transition-all">
                                                <Coffee size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Nearby Support</div>
                                                <input
                                                    value={formData.nearbyFacilities}
                                                    onChange={e => setFormData(p => ({ ...p, nearbyFacilities: e.target.value }))}
                                                    className="bg-transparent border-none p-0 text-xs font-bold uppercase focus:ring-0 w-full placeholder:text-white/10"
                                                    placeholder="E.G. CAFES, ATM"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-5 group">
                                            <div className="w-10 h-10 rounded-2xl bg-white/5 text-white/20 flex items-center justify-center group-focus-within:bg-emerald-500 transition-all">
                                                <Users size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Target Persona</div>
                                                <input
                                                    value={formData.suitableFor}
                                                    onChange={e => setFormData(p => ({ ...p, suitableFor: e.target.value }))}
                                                    className="bg-transparent border-none p-0 text-xs font-bold uppercase focus:ring-0 w-full placeholder:text-white/10"
                                                    placeholder="E.G. COUPLES, FAMILIES"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Final Verification Actions */}
                                <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-10 py-5 text-white/30 font-black uppercase tracking-widest hover:text-white transition-colors cursor-pointer text-xs"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || uploading}
                                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black px-16 py-6 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.2)] active:scale-95 transition-all flex items-center justify-center gap-4 cursor-pointer disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed uppercase text-sm tracking-[0.2em]"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                {editingPlace ? 'Update Place' : 'Register Place'}
                                                <ArrowLeft className="w-5 h-5 opacity-50 rotate-180" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
        </AdminLayout>
    );
};

export default ManagePlaces;
