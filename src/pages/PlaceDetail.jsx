import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Calendar,
    Clock,
    Star,
    ArrowLeft,
    Share2,
    Heart,
    Navigation,
    Info,
    Camera,
    Shield
} from 'lucide-react';
import { usePlaceDetail } from '../hooks/usePlaceDetail';
import Loading from '../components/common/Loading';

const PlaceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { place, loading, error } = usePlaceDetail(id);

    if (loading) return (
        <div className="min-h-screen pt-32">
            <Loading message="Fetching destination secrets..." />
        </div>
    );

    if (error || !place) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                <Info size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Destination Lost</h2>
            <p className="text-slate-500 mb-8 max-w-sm">We couldn't find the place you're looking for. It might have been moved or removed.</p>
            <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
            >
                Back to Map
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fafbfc] pb-24">
            {/* Header Content */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={place.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
                    alt={place.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fafbfc] via-transparent to-transparent" />

                {/* Actions Overlay */}
                <div className="absolute top-32 left-0 right-0 px-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
                        <motion.button
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            onClick={() => navigate(-1)}
                            className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all border border-white/20"
                        >
                            <ArrowLeft size={24} />
                        </motion.button>
                        <div className="flex gap-4">
                            <motion.button
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all border border-white/20"
                            >
                                <Share2 size={24} />
                            </motion.button>
                            <motion.button
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all border border-white/20 text-red-400"
                            >
                                <Heart size={24} fill="currentColor" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Place Identity */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full font-bold text-[10px] uppercase tracking-widest mb-4 shadow-lg shadow-blue-500/30"
                        >
                            <Star size={12} fill="currentColor" />
                            {place.categoryName || 'Top Destination'}
                        </motion.div>
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-7xl font-black text-slate-900 leading-none mb-6"
                        >
                            {place.name}
                        </motion.h1>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap items-center gap-6"
                        >
                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                <MapPin size={20} className="text-blue-500" />
                                {place.address || 'Location Unknown'}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                <Clock size={20} className="text-indigo-500" />
                                Open 24 Hours
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                <Star size={20} className="text-yellow-500" fill="currentColor" />
                                4.9 (2.4k Reviews)
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Side: Info */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Info size={24} className="text-blue-600" />
                            About this adventure
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg font-medium">
                            <p>
                                {place.description || `Experience the breathtaking beauty of ${place.name}. This destination offers a unique blend of heritage, nature, and modern exploration. Whether you're looking for a peaceful retreat or an adrenaline-pumping journey, this place has everything to make your visit unforgettable.`}
                            </p>
                            <p className="mt-4">
                                Visitors often praise the meticulous maintenance and the welcoming atmosphere. It's truly a must-visit spot for anyone looking to discover the hidden jewels of the region.
                            </p>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-900 mb-8">What this place offers</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { name: 'Expert Guides', icon: Compass, color: 'blue' },
                                { name: 'Photo Locations', icon: Camera, color: 'indigo' },
                                { name: 'Safe Exploration', icon: Shield, color: 'emerald' },
                                { name: 'Historical Sites', icon: Star, color: 'purple' },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-colors">
                                    <div className={`w-12 h-12 bg-${feature.color}-50 text-${feature.color}-600 rounded-2xl flex items-center justify-center`}>
                                        <feature.icon size={24} />
                                    </div>
                                    <span className="font-bold text-slate-700">{feature.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Side: Action Card */}
                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[3rem] p-8 text-white sticky top-32 shadow-2xl shadow-slate-200">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1 text-blue-400">Entry Fee</p>
                                <h3 className="text-4xl font-black">Free</h3>
                            </div>
                            <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/10 uppercase tracking-widest">
                                PUBLIC
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400 font-medium">Visiting Status</span>
                                <span className="text-emerald-400 font-bold">OPEN NOW</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400 font-medium">Estimated Visit</span>
                                <span className="font-bold">2-4 Hours</span>
                            </div>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between text-sm">
                                <span className="text-white font-bold">Total Experience</span>
                                <span className="text-blue-400 font-bold">PREMIUM</span>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2 mb-4">
                            <Navigation size={18} />
                            GET DIRECTIONS
                        </button>

                        <button className="w-full bg-white/10 hover:bg-white/20 text-white py-5 rounded-2xl font-black text-sm transition-all border border-white/10 active:scale-95">
                            PLAN A JOURNEY
                        </button>

                        <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-6">
                            Part of AtVisited Heritage Program
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetail;
