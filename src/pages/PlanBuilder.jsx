import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
    Plus,
    Trash2,
    Save,
    Calendar,
    User,
    Type,
    Clock,
    MapPin,
    Search,
    ChevronRight,
    Calculator,
    Info,
    ArrowLeft,
    GripVertical,
    Navigation
} from 'lucide-react';
import { usePlaces } from '../hooks/usePlaces';
import { usePlanBuilder } from '../hooks/usePlanBuilder';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../components/common/Loading';

const PlanBuilder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { places, loading: placesLoading, searchPlaces } = usePlaces();
    const {
        title, setTitle,
        touristName, setTouristName,
        visitDate, setVisitDate,
        selectedPlaces,
        addPlace,
        removePlace,
        handleReorder,
        updatePlaceDetails,
        optimizeRoute,
        resetPlan,
        totalCost,
        totalDistance,
        savePlan,
        loading: saveLoading
    } = usePlanBuilder();

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (location.state?.initialPlace) {
            addPlace(location.state.initialPlace);
            // Clear location state to avoid re-adding on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state, addPlace]);

    const handleSearch = (e) => {
        e.preventDefault();
        searchPlaces(searchTerm);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#fafbfc]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex-grow">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Plan Builder</h1>
                        <p className="text-slate-500 font-medium">Design your custom itinerary with precision.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={resetPlan}
                            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-4 rounded-3xl font-black text-sm hover:bg-slate-50 transition-all active:scale-95"
                        >
                            RESET
                        </button>
                        <button
                            onClick={savePlan}
                            disabled={saveLoading}
                            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-3xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 disabled:opacity-50"
                        >
                            <Save size={20} />
                            {saveLoading ? 'SAVING...' : 'SAVE ITINERARY'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Sidebar: Details & Place Search */}
                    <div className="lg:col-span-4 space-y-8">
                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                            <h2 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                                <Info size={20} className="text-blue-600" />
                                Trip Details
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Itinerary Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="e.g. Summer Weekend Trip"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Tourist Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Who is exploring?"
                                            value={touristName}
                                            onChange={(e) => setTouristName(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Visit Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="date"
                                            value={visitDate}
                                            onChange={(e) => setVisitDate(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                <MapPin size={20} className="text-blue-600" />
                                Find Destinations
                            </h2>
                            <form onSubmit={handleSearch} className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search places..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-sm"
                                />
                            </form>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
                                {placesLoading ? (
                                    <div className="py-12 flex justify-center"><Loading message="" /></div>
                                ) : places.map(place => (
                                    <motion.div
                                        key={place.id}
                                        whileHover={{ x: 4 }}
                                        className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                                <img src={place.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-slate-900 leading-tight mb-1">{place.name}</h4>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{place.categoryName}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addPlace(place)}
                                            className="p-2 bg-white text-blue-600 rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all outline-none"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Main Canvas: Itinerary */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Cost Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900 p-6 rounded-[2rem] text-white flex items-center justify-between shadow-xl shadow-slate-200"
                            >
                                <div>
                                    <div className="flex items-center gap-2 text-blue-400 font-bold text-[9px] uppercase tracking-[0.2em] mb-1">
                                        <Calculator size={12} />
                                        Estimated Cost
                                    </div>
                                    <div className="text-3xl font-black">LKR {totalCost.toLocaleString()}</div>
                                </div>
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                                    <Calculator size={24} />
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm"
                            >
                                <div>
                                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-[9px] uppercase tracking-[0.2em] mb-1">
                                        <MapPin size={12} />
                                        Total Distance
                                    </div>
                                    <div className="text-3xl font-black text-slate-900">{totalDistance.toFixed(1)} <span className="text-slate-400 text-lg uppercase">KM</span></div>
                                </div>
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                    <MapPin size={24} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Itinerary List */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 min-h-[600px]">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-slate-900">Journey Path</h2>
                                <button
                                    onClick={optimizeRoute}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                                >
                                    <Navigation size={14} />
                                    Optimize Route
                                </button>
                            </div>

                            <div className="space-y-6 relative">
                                {selectedPlaces.length > 0 && (
                                    <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 -z-0" />
                                )}

                                <Reorder.Group
                                    axis="y"
                                    values={selectedPlaces}
                                    onReorder={handleReorder}
                                    className="space-y-6"
                                >
                                    {selectedPlaces.length === 0 ? (
                                        <div className="text-center py-32 space-y-4">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                                <Plus size={40} />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-400">Your itinerary is empty</h3>
                                            <p className="text-slate-300 text-sm max-w-xs mx-auto">Click the (+) button on any destination to start building your story.</p>
                                        </div>
                                    ) : selectedPlaces.map((place, index) => (
                                        <Reorder.Item
                                            key={place.id}
                                            value={place}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="relative pl-20 group"
                                        >
                                            {/* Order Badge */}
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-slate-100 text-slate-900 rounded-full z-10 flex items-center justify-center font-black text-xs shadow-sm group-hover:border-blue-600 group-hover:text-blue-600 transition-colors cursor-grab active:cursor-grabbing">
                                                {index + 1}
                                            </div>

                                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
                                                <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                                    <img src={place.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" />
                                                </div>

                                                <div className="flex-grow space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-center gap-3">
                                                            <GripVertical className="text-slate-300 cursor-grab active:cursor-grabbing" size={20} />
                                                            <div>
                                                                <h3 className="text-lg font-black text-slate-900">{place.name}</h3>
                                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                                    <Clock className="text-blue-500" size={12} />
                                                                    {place.openingTime ? `${place.openingTime} - ${place.closingTime}` : 'Always Open'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removePlace(place.id)}
                                                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Arrival Time</label>
                                                            <input
                                                                type="time"
                                                                value={place.estimatedArrivalTime}
                                                                onChange={(e) => updatePlaceDetails(place.id, { estimatedArrivalTime: e.target.value })}
                                                                className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold outline-none focus:border-blue-400"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Duration (Mins)</label>
                                                            <input
                                                                type="number"
                                                                value={place.estimatedDurationMinutes}
                                                                onChange={(e) => updatePlaceDetails(place.id, { estimatedDurationMinutes: parseInt(e.target.value) })}
                                                                className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold outline-none focus:border-blue-400"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Connector Dot */}
                                            {index < selectedPlaces.length - 1 && (
                                                <div className="absolute left-[37.5px] -bottom-4 w-1.5 h-1.5 bg-slate-200 rounded-full" />
                                            )}
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanBuilder;
