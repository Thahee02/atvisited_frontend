import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    Plus,
    MoreHorizontal,
    ArrowRight,
    Navigation,
    Mountain,
    Palmtree,
    Umbrella
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Plans = () => {
    // Mock Data for User Plans
    const plans = [
        {
            id: 1,
            title: "Eastern Coast Expedition",
            date: "August 12, 2026",
            places: 5,
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            status: "Upcoming",
            icon: Palmtree
        },
        {
            id: 2,
            title: "Lighthouse Heritage Tour",
            date: "September 05, 2026",
            places: 3,
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            status: "Draft",
            icon: Mountain
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 bg-[#fafbfc]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                            <Navigation size={14} />
                            Your Itineraries
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Plan your <span className="text-blue-600">Legend.</span></h1>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-3xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 group">
                        <Plus size={20} className="transition-transform group-hover:rotate-90" />
                        NEW JOURNEY
                    </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Active Plans List */}
                    <div className="lg:col-span-2 space-y-6">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white border border-slate-100 rounded-[3rem] p-6 flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:shadow-slate-100 transition-all cursor-pointer"
                            >
                                <div className="w-full md:w-64 h-48 rounded-[2.2rem] overflow-hidden flex-shrink-0 relative">
                                    <img src={plan.image} alt={plan.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                                            {plan.status}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow py-2 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{plan.title}</h3>
                                        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                            <MoreHorizontal size={20} className="text-slate-400" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase">
                                            <Calendar size={16} className="text-blue-500" />
                                            {plan.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase">
                                            <MapPin size={16} className="text-indigo-500" />
                                            {plan.places} Stops
                                        </div>
                                    </div>
                                    <div className="mt-auto flex justify-between items-center">
                                        <div className="flex -space-x-3">
                                            {Array(3).fill(0).map((_, j) => (
                                                <div key={j} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?u=${plan.id + j}`} alt="avatar" />
                                                </div>
                                            ))}
                                            <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600 shadow-sm">
                                                +2
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-2 text-slate-900 font-black text-xs group-hover:gap-3 transition-all hover:text-blue-600">
                                            VIEW PATH
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Empty Space / CTA */}
                        <div className="border-2 border-dashed border-slate-200 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-400 hover:bg-blue-50/10 transition-all">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 group-hover:scale-110 group-hover:text-blue-400 transition-all">
                                <Plus size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Create a new journey</h3>
                            <p className="text-slate-500 max-w-xs text-sm">Every epic story starts with a single step. Add your first destination to get started.</p>
                        </div>
                    </div>

                    {/* Sidebar: Tips & Stats */}
                    <div className="space-y-8">
                        <section className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl shadow-slate-200">
                            <h2 className="text-xl font-black mb-8 flex items-center gap-2">
                                <Clock size={24} className="text-blue-400" />
                                Recent Activity
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { text: "Shared 'Eastern Coast' with 3 friends", time: "2h ago" },
                                    { text: "Added 'Oluvil Beach' to your favorites", time: "5h ago" },
                                    { text: "Started a new draft itinerary", time: "Yesterday" },
                                ].map((act, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-1 h-8 bg-blue-600 rounded-full flex-shrink-0" />
                                        <div>
                                            <p className="text-xs font-medium leading-tight mb-1">{act.text}</p>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{act.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white border border-slate-100 rounded-[3rem] p-8 overflow-hidden relative">
                            <div className="relative z-10">
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <Umbrella size={24} className="text-indigo-600" />
                                    Smart Tips
                                </h2>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                                    Did you know August is the best time to visit the Eastern Coast? The weather is perfect for beach photography.
                                </p>
                                <button className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all">
                                    LEARN MORE <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50" />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plans;
