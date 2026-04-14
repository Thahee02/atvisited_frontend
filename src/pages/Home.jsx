import { useState, useMemo } from 'react';
import { Search, MapPin, Sparkles, TrendingUp, Compass, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlaces } from '../hooks/usePlaces';
import { useCategories } from '../hooks/useCategories';
import PlaceCard from '../components/places/PlaceCard';
import { cn } from '../utils/utils';

const Home = () => {
    const { places, loading, searchPlaces, filterByCategory } = usePlaces();
    const { categories } = useCategories();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        searchPlaces(searchTerm);
    };

    const handleCategoryClick = (categoryId) => {
        const newCategory = activeCategory === categoryId ? null : categoryId;
        setActiveCategory(newCategory);
        filterByCategory(newCategory);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 overflow-x-hidden bg-[#fafbfc]">
            {/* Hero Section */}
            <section className="relative px-6 mb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50/50 text-emerald-600 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] mb-8 border border-emerald-100/50 backdrop-blur-sm shadow-sm"
                    >
                        <Sparkles size={12} className="text-emerald-500" />
                        Explore with Intelligence
                    </motion.div>


                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-[7rem] font-black tracking-tighter text-slate-900 mb-10 leading-[0.85] filter drop-shadow-sm"
                    >
                        Where will <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">adventure</span> find you?
                    </motion.h1>


                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-2xl text-slate-500/80 max-w-2xl mb-14 font-medium leading-relaxed"
                    >
                        Discover Sainthamaruthu & Surroundings and Plan your perfect one-day adventure
                    </motion.p>

                    <motion.form
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        onSubmit={handleSearch}
                        className="w-full max-w-3xl relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
                        <div className="relative flex items-center p-2.5 bg-white rounded-[3rem] border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] focus-within:border-emerald-400/50 focus-within:ring-[12px] focus-within:ring-emerald-50/50 transition-all duration-500">

                            <div className="pl-6 text-slate-400">
                                <Search size={24} strokeWidth={2.5} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search cities, landmarks, memories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-grow bg-transparent px-5 py-4 outline-none text-slate-900 font-bold text-lg placeholder:text-slate-400 placeholder:font-medium"
                            />
                            <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-black text-sm hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-emerald-200 active:scale-95 flex items-center gap-2">
                                EXPLORE
                            </button>
                        </div>
                    </motion.form>

                    {/* <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mt-16 opacity-40 hover:opacity-100 transition-opacity duration-700">
                        {['EXPEDIA', 'BOOKING.COM', 'TRIPADVISOR', 'AIRBNB'].map(brand => (
                            <div key={brand} className="text-xs font-black tracking-[0.3em] text-slate-400 hover:text-emerald-600 transition-colors cursor-default">
                                {brand}
                            </div>
                        ))}
                    </div> */}
                </div>

                {/* Ambient Background Lights */}
                <div className="absolute top-1/4 -right-20 -z-10 bg-emerald-100/50 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-20 -left-20 -z-10 bg-teal-100/50 w-[500px] h-[500px] rounded-full blur-[120px]" />
            </section>


            {/* Main Content */}
            <section className="px-6 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Filters Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                                <TrendingUp size={14} />
                                Curated Collections
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Popular right now</h2>
                        </div>

                        {/* Category Filters */}
                        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-xl mr-2">
                                <Filter size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Filter</span>
                            </div>
                            <button
                                onClick={() => handleCategoryClick(null)}
                                className={cn(
                                    "whitespace-nowrap px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300",
                                    !activeCategory
                                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                                        : "bg-white text-slate-600 border border-slate-100 hover:border-slate-300"
                                )}
                            >
                                All Places
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id)}
                                    className={cn(
                                        "whitespace-nowrap px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300",
                                        activeCategory === category.id
                                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                                            : "bg-white text-slate-600 border border-slate-100 hover:border-slate-300"
                                    )}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Results Grid */}
                    <div className="min-h-[400px]">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="space-y-6">
                                        <div className="aspect-[4/3] bg-slate-200/60 rounded-[2.5rem] animate-pulse" />
                                        <div className="space-y-3">
                                            <div className="h-6 bg-slate-200/60 rounded-xl w-3/4 animate-pulse" />
                                            <div className="h-4 bg-slate-200/60 rounded-xl w-1/2 animate-pulse" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : places.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                            >
                                <AnimatePresence mode="popLayout">
                                    {places.map((place) => (
                                        <motion.div
                                            key={place.id}
                                            variants={itemVariants}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <PlaceCard place={place} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
                            >
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                    <Compass size={48} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">No destinations found</h3>
                                <p className="text-slate-500 font-medium">Try broadening your search or choosing a different category.</p>
                                <button
                                    onClick={() => handleCategoryClick(null)}
                                    className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-emerald-600 transition-colors"
                                >
                                    Clear all filters
                                </button>

                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
