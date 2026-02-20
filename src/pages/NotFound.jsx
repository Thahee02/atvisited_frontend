import { motion } from 'framer-motion';
import { Compass, Home, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#fafbfc] overflow-hidden">
            <div className="text-center relative max-w-2xl w-full">
                {/* Decorative Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-blue-100/30 w-[600px] h-[600px] rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-indigo-100/30 w-[400px] h-[400px] rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 relative inline-block"
                >
                    <div className="text-[12rem] font-black leading-none text-slate-900/5 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="w-32 h-32 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl flex items-center justify-center text-blue-600"
                        >
                            <Compass size={64} strokeWidth={1.5} />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                >
                    Lost in the <span className="text-blue-600">Great Unknown?</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-500 mb-12 font-medium"
                >
                    The page you're searching for has vanished into the horizon. Let's redirect your compass back to familiar territory.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 group"
                    >
                        <Home size={20} className="transition-transform group-hover:-translate-y-1" />
                        BACK TO HOME
                    </button>
                    <button
                        onClick={() => navigate('/explore')}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-3xl font-black text-sm hover:border-blue-200 hover:text-blue-600 transition-all active:scale-95 group"
                    >
                        <MapPin size={20} className="text-blue-500" />
                        EXPLORE DESTINATIONS
                    </button>
                </motion.div>

                {/* Breadcrumbs for decoration */}
                <div className="mt-20 flex justify-center gap-4 opacity-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                </div>
            </div>
        </div>
    );
};

export default NotFound;
