import { useParams, useNavigate, Link } from 'react-router-dom';
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
    Shield,
    Compass,
    ArrowRight,
    Phone,
    Globe,
    History,
    Bus,
    ShieldAlert,
    HeartHandshake,
    Baby,
    Utensils,
    Coins,
    Sparkles,
    CheckCircle2,
    Droplets
} from 'lucide-react';
import { usePlaceDetail } from '../hooks/usePlaceDetail';
import Loading from '../components/common/Loading';
import { getFullImageUrl } from '../services/api';

const PlaceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { place, loading, error } = usePlaceDetail(id);

    const imageUrl = getFullImageUrl(place?.imageUrl, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');

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
                className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-emerald-600 transition-colors"
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
                    src={getFullImageUrl(place.imageUrl)}
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
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-600 text-white rounded-full font-bold text-[10px] uppercase tracking-widest mb-4 shadow-lg shadow-emerald-500/30"
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
                                <MapPin size={20} className="text-emerald-500" />
                                {place.address || 'Location Unknown'}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                <Clock size={20} className="text-emerald-500" />
                                {place.openingTime ? `${place.openingTime.substring(0, 5)} - ${place.closingTime.substring(0, 5)}` : 'Open 24 Hours'}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 font-bold">
                                <Star size={20} className="text-yellow-500" fill="currentColor" />
                                {place.rating?.toFixed(1) || '4.5'} ({Math.floor(Math.random() * 500 + 100)} Reviews)
                            </div>
                            {place.estimatedVisitDuration && (
                                <div className="flex items-center gap-2 text-slate-600 font-bold">
                                    <Compass size={20} className="text-emerald-500" />
                                    {place.estimatedVisitDuration}
                                </div>
                            )}
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
                            <Info size={24} className="text-emerald-600" />
                            About this adventure
                        </h2>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg font-medium">
                            <p>
                                {place.description || `Experience the breathtaking beauty of ${place.name}. This destination offers a unique blend of heritage, nature, and modern exploration.Whether you're looking for a peaceful retreat or an adrenaline-pumping journey, this place has everything to make your visit unforgettable.`}
                            </p >
                            <p className="mt-4">
                                Visitors often praise the meticulous maintenance and the welcoming atmosphere. It's truly a must-visit spot for anyone looking to discover the hidden jewels of the region.
                            </p>
                        </div >
                    </section >

                    <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-900 mb-8">What this place offers</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { name: 'Expert Guides', icon: Compass, color: 'emerald', show: true },
                                { name: 'Photo Locations', icon: Camera, color: 'emerald', show: true },
                                { name: 'Safe Exploration', icon: Shield, color: 'emerald', show: true },
                                { name: 'Historical Sites', icon: Star, color: 'purple', show: true },
                                { name: 'Parking Available', icon: CheckCircle2, color: 'emerald', show: place.parkingAvailable },
                                { name: 'Washrooms', icon: Droplets, color: 'cyan', show: place.washroomsAvailable },
                                { name: 'Accessible', icon: Info, color: 'slate', show: !!place.accessibilityInfo },
                            ].filter(f => f.show).map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-colors">
                                    <div className={`w-12 h-12 bg-${feature.color}-50 text-${feature.color}-600 rounded-2xl flex items-center justify-center`}>
                                        <feature.icon size={24} />
                                    </div>
                                    <span className="font-bold text-slate-700">{feature.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Cultural Heritage Section */}
                    {(place.historicalBackground || place.culturalSignificance) && (
                        <section className="bg-amber-50/30 p-8 rounded-[2.5rem] border border-amber-100/50">
                            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <History size={28} className="text-amber-600" />
                                Heritage & Culture
                            </h2>
                            <div className="space-y-6">
                                {place.historicalBackground && (
                                    <div>
                                        <h3 className="font-bold text-amber-900 mb-2">Historical Background</h3>
                                        <p className="text-slate-600 leading-relaxed">{place.historicalBackground}</p>
                                    </div>
                                )}
                                {place.culturalSignificance && (
                                    <div>
                                        <h3 className="font-bold text-amber-900 mb-2">Cultural Significance</h3>
                                        <p className="text-slate-600 leading-relaxed">{place.culturalSignificance}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Backpacker Guide Section */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <Bus size={24} className="text-emerald-600" />
                                Getting There
                            </h2>

                            <p className="text-slate-600 font-medium mb-4">{place.transportOptions || 'Common transport options include local buses, tuk-tuks, and private taxis from Sainthamaruthu or Kalmunai town.'}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 border border-slate-200">Local Bus</span>
                                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 border border-slate-200">Tuk-Tuk</span>
                                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 border border-slate-200">Walking Paths</span>
                            </div>
                        </div>

                        <div className="bg-emerald-50/20 p-8 rounded-[2.5rem] border border-emerald-100/50">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <ShieldAlert size={24} className="text-emerald-600" />
                                Safety & Customs
                            </h2>
                            <div className="space-y-4">
                                {place.safetyGuidelines && (
                                    <div className="flex gap-3">
                                        <div className="mt-1"><CheckCircle2 size={16} className="text-emerald-600" /></div>
                                        <p className="text-slate-600 text-sm">{place.safetyGuidelines}</p>
                                    </div>
                                )}
                                {place.localCustoms && (
                                    <div className="flex gap-3">
                                        <div className="mt-1"><HeartHandshake size={16} className="text-emerald-600" /></div>
                                        <p className="text-slate-600 text-sm">{place.localCustoms}</p>
                                    </div>
                                )}
                                {!place.safetyGuidelines && !place.localCustoms && (
                                    <p className="text-slate-500 text-sm italic">Always respect local traditions and carry water during your visit.</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Family & Facilities Section */}
                    <section className="bg-emerald-50/20 p-8 rounded-[2.5rem] border border-emerald-100/50">
                        <div className="flex flex-col md:flex-row justify-between gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Baby size={28} className="text-emerald-600" />
                                    Family Suitability
                                </h2>

                                <p className="text-slate-600 mb-4">{place.suitableFor || 'This place is generally suitable for all visitors, including families and elderly members.'}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className={`p-4 rounded-2xl border ${place.washroomsAvailable ? 'bg-white border-emerald-200' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Washrooms</p>
                                        <p className="font-bold text-slate-700">{place.washroomsAvailable ? 'Available' : 'Not Available'}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-emerald-200">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Activities</p>
                                        <p className="font-bold text-slate-700">All Ages</p>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Utensils size={28} className="text-orange-500" />
                                    Nearby Facilities
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    {place.nearbyFacilities || 'Various local street food stalls and small restaurants are available within walking distance. Drinking water can be purchased at nearby shops.'}
                                </p>
                            </div>
                        </div>
                    </section>
                </div >

                {/* Right Side: Action Card */}
                < div className="space-y-8" >
                    <div className="bg-slate-900 rounded-[3rem] p-8 text-white sticky top-32 shadow-2xl shadow-slate-200">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1 text-emerald-400">Entry Fee</p>
                                <h3 className="text-4xl font-black">
                                    {place.estimatedCost ? `LKR ${place.estimatedCost.toLocaleString()}` : 'Free'}
                                </h3>
                            </div>

                            <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black border border-white/10 uppercase tracking-widest">
                                {place.categoryName || 'SIGHT'}
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400 font-medium">Visiting Status</span>
                                <span className="text-emerald-400 font-bold">OPEN NOW</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400 font-medium">Visiting Time</span>
                                <span className="font-bold">{place.openingTime || '08:00'} - {place.closingTime || '20:00'}</span>
                            </div>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between text-sm">
                                <span className="text-white font-bold">Total Experience</span>
                                <span className="text-emerald-400 font-bold">PREMIUM</span>
                            </div>
                        </div>

                        <button
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`, '_blank')}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2 mb-4"
                        >
                            <Navigation size={18} />
                            GET DIRECTIONS
                        </button>

                        <button
                            onClick={() => navigate('/build-plan', { state: { initialPlace: place } })}
                            className="w-full bg-white/10 hover:bg-white/20 text-white py-5 rounded-2xl font-black text-sm transition-all border border-white/10 active:scale-95"
                        >
                            PLAN A JOURNEY
                        </button>

                        <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-6">
                            Part of AtVisited Heritage Program
                        </p>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default PlaceDetail;
