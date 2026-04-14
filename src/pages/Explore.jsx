import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Search, SlidersHorizontal, Navigation, Star } from 'lucide-react';
import { usePlaces } from '../hooks/usePlaces';
import MapView from '../components/map/MapView';
import { Link } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { getFullImageUrl } from '../services/api';

const Explore = () => {
    const { places, loading, searchPlaces } = usePlaces();
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredPlaceId, setHoveredPlaceId] = useState(null);
    const [selectedCenter, setSelectedCenter] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        searchPlaces(searchTerm);
    };

    return (
        <div className="min-h-screen pt-24 bg-[#fafbfc] flex flex-col">
            <div className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-6rem)] overflow-hidden">
                {/* Left Side: Places List */}
                <div className="w-full lg:w-[450px] flex flex-col bg-white border-r border-slate-100 z-20 shadow-xl">
                    <div className="p-6 border-b border-slate-50">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Compass size={14} />
                            Interactive Discovery
                        </div>

                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-6">Explore Places</h1>

                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                <Search size={18} />
                            </div>

                            <input
                                type="text"
                                placeholder="Search by name or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 transition-all font-bold text-sm placeholder:font-medium"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all active:scale-95">
                                FIND
                            </button>
                        </form>

                    </div>

                    <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="animate-pulse bg-slate-50 rounded-3xl p-4 h-40" />
                            ))
                        ) : places.length > 0 ? (
                            <AnimatePresence>
                                {places.map((place) => (
                                    <motion.div
                                        key={place.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        whileHover={{ x: 4 }}
                                        onMouseEnter={() => setHoveredPlaceId(place.id)}
                                        onMouseLeave={() => setHoveredPlaceId(null)}
                                        onClick={() => setSelectedCenter([place.latitude, place.longitude])}
                                        className="group relative bg-white border border-slate-100 p-4 rounded-[2rem] hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer"
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={getFullImageUrl(place.imageUrl)}
                                                    alt={place.name}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-grow flex flex-col">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{place.categoryName || 'SIGHT'}</span>
                                                    <div className="flex items-center gap-0.5 text-yellow-500">

                                                        <Star size={10} fill="currentColor" />
                                                        <span className="text-[10px] font-black">{place.rating || '4.5'}</span>
                                                    </div>
                                                </div>
                                                <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-1">{place.name}</h3>
                                                <div className="flex items-start gap-1 text-slate-400 mb-3">
                                                    <MapPin size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-[10px] font-medium line-clamp-2">{place.description || place.address || 'Local Destination'}</span>
                                                </div>

                                                <Link
                                                    to={`/place/${place.id}`}
                                                    className="mt-auto inline-flex items-center gap-1.5 text-[10px] font-black text-slate-900 group-hover:gap-2 transition-all uppercase tracking-widest"
                                                >
                                                    View Details
                                                    <Navigation size={12} className="text-emerald-600" />
                                                </Link>

                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                    <MapPin size={32} />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-1">No results found</h3>
                                <p className="text-xs text-slate-500">Try a different search term or explore the map.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Map */}
                <div className="flex-grow relative h-full">
                    {loading ? (
                        <div className="absolute inset-0 z-30 bg-[#fafbfc] flex items-center justify-center">
                            <Loading message="Positioning explorers..." />
                        </div>
                    ) : null}
                    <div className="absolute inset-0 p-4 lg:p-10">
                        <MapView places={places} height="100%" center={selectedCenter} showRoute={false} />
                    </div>

                    {/* Floating Statistics */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 hidden lg:flex gap-4">
                        <div className="bg-slate-900/90 backdrop-blur px-6 py-3 rounded-full text-white shadow-2xl border border-white/10 flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-xs font-black tracking-widest uppercase">
                                {places.length} Locations Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
