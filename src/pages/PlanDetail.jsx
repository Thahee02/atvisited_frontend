import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Clock,
    ArrowLeft,
    Navigation,
    Calculator,
    Info,
    CheckCircle2
} from 'lucide-react';
import { planService } from '../services/planService';
import { toast } from 'react-toastify';
import Loading from '../components/common/Loading';
import MapView from '../components/map/MapView';
import { getFullImageUrl } from '../services/api';

const PlanDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await planService.getPlanById(id);
                setPlan(response.data);
            } catch (err) {
                toast.error("Failed to load plan details.");
                navigate('/plans');
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, [id, navigate]);

    const sortedItems = useMemo(() => {
        if (!plan?.items) return [];
        return [...plan.items].sort((a, b) => Number(a.visitOrder) - Number(b.visitOrder));
    }, [plan?.items]);

    if (loading) return <Loading message="Loading your journey..." />;
    if (!plan) return null;

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#fafbfc]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <button
                        onClick={() => navigate('/plans')}
                        className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex-grow">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                            <Navigation size={14} />
                            Journey Details
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">{plan.title}</h1>
                        <p className="text-slate-500 font-medium">Prepared for <span className="text-slate-900 font-bold">{plan.touristName}</span></p>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest">
                        <CheckCircle2 size={18} />
                        {plan.isFinalized ? 'Completed' : 'Upcoming'}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Stats & Map */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visit Date</div>
                                <div className="flex items-center gap-2 text-slate-900 font-black">
                                    <Calendar size={16} className="text-emerald-500" />
                                    {plan.visitDate}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Cost</div>
                                <div className="flex items-center gap-2 text-slate-900 font-black">
                                    <Calculator size={16} className="text-emerald-500" />
                                    LKR {plan.totalEstimatedCost?.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Distance</div>
                                <div className="flex items-center gap-2 text-slate-900 font-black">
                                    <MapPin size={16} className="text-emerald-500" />
                                    {plan.totalDistance?.toFixed(1)} KM
                                </div>
                            </div>
                        </div>

                        {/* Map Integration */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                    <Navigation size={20} className="text-emerald-600" />
                                    Route Visualization
                                </h2>
                            </div>
                            <MapView
                                places={sortedItems.map(item => ({
                                    id: item.placeId,
                                    name: item.placeName,
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                    imageUrl: item.imageUrl,
                                    visitOrder: item.visitOrder
                                }))}
                                height="500px"
                            />
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                            <h2 className="text-2xl font-black text-slate-900 mb-8">Itinerary Timeline</h2>
                            <div className="space-y-12 relative">
                                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-50" />

                                {sortedItems.map((item, index) => (
                                    <div key={item.id} className="relative pl-12 flex gap-6 group">
                                        <div className="absolute left-0 top-1 w-10 h-10 bg-white border-2 border-slate-100 rounded-full z-10 flex items-center justify-center font-black text-xs text-slate-400 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
                                            {item.visitOrder}
                                        </div>

                                        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-50">
                                            <img
                                                src={getFullImageUrl(item.imageUrl)}
                                                alt={item.placeName}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'; }}
                                            />
                                        </div>

                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-black text-slate-900">{item.placeName}</h3>
                                                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    <Clock size={12} className="text-emerald-500" />
                                                    Arrive @ {item.estimatedArrivalTime || 'TBD'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                                <span>{item.estimatedDurationMinutes} Mins Stay</span>
                                                <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                                <span className="text-emerald-600">LKR {item.cost?.toLocaleString()}</span>
                                            </div>
                                            {item.notes && (
                                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                    <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                                        <Info size={12} />
                                                        Traveler Notes
                                                    </div>
                                                    <p className="text-sm text-slate-600 font-medium italic">"{item.notes}"</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary & Tips */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200">
                            <h2 className="text-xl font-black mb-6">Voyage Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Destinations</span>
                                    <span className="font-black">{plan.items.length}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estimated Budget</span>
                                    <span className="font-black text-emerald-400">LKR {plan.totalEstimatedCost?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Travel Distance</span>
                                    <span className="font-black">{plan.totalDistance?.toFixed(1)} KM</span>
                                </div>
                            </div>
                            <button
                                onClick={() => window.print()}
                                className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white border border-white/10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                            >
                                Export Itinerary
                            </button>
                        </div>

                        <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h2 className="text-xl font-black mb-4">Travel Pro-Tip</h2>
                                <p className="text-sm text-emerald-50 font-medium leading-relaxed">
                                    We recommend starting your journey early at <span className="font-bold">{plan.items[0]?.placeName}</span> to beat the crowds and enjoy the best lighting for photos!
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDetail;
