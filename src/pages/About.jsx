import { motion } from 'framer-motion';
import { Compass, Globe, Users, Target, Rocket, Heart } from 'lucide-react';
import { cn } from '../utils/utils';

const About = () => {
    const stats = [
        { label: 'Destinations', value: '5K+', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Explorers', value: '50K+', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50' },
        { label: 'Journeys', value: '120K+', icon: Compass, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];


    const values = [
        { title: 'Authenticity', desc: 'Real experiences from real people across the globe.', icon: Rocket },
        { title: 'Community', desc: 'Building the largest network of global storytellers.', icon: Heart },
        { title: 'Precision', desc: 'Accurate navigation and curated destination data.', icon: Target },
    ];

    return (
        <div className="pt-32 pb-24 px-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full font-bold text-xs uppercase tracking-widest mb-8 border border-emerald-100"
                    >
                        Our Story
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.9]"
                    >
                        Redefining the <br />
                        <span className="text-emerald-600">art of discovery</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto"
                    >
                        AtVisited is more than a tool—it's a movement to bridge cultures and inspire the explorer in everyone.
                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-emerald-100 rounded-[3rem] -z-10 rotate-3" />
                        <img

                            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Story"
                            className="w-full rounded-[2.5rem] shadow-2xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">How it started</h2>
                        <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                            <p>
                                Founded in 2026, AtVisited began as a simple scratch on a map. We realized that while the world was more connected than ever, the soul of travel—the discovery—was being lost in algorithms and tourist traps.
                            </p>
                            <p>
                                We built AtVisited to return to the essence of exploration: finding beauty in the overlooked, documenting the extraordinary, and sharing knowledge that moves people.
                            </p>
                            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className={cn("text-3xl font-black", stat.color)}>{stat.value}</span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Values Section */}
                <div className="bg-slate-900 rounded-[4rem] px-8 md:px-20 py-24 text-center">
                    <h2 className="text-4xl font-black text-white mb-16">The Values that Drive Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-emerald-500/20">
                                    <v.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {v.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
