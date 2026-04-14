import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin, LayoutGrid, FileText, Users, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({
        totalPlaces: 0,
        totalCategories: 0,
        totalPlans: 0,
        totalUsers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/stats');
                setCounts(res.data);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        { label: 'Total Places', value: counts.totalPlaces, icon: <MapPin className="w-5 h-5" />, gradient: 'from-emerald-500/20 to-emerald-500/5', iconBg: 'bg-emerald-500/20 text-emerald-400' },
        { label: 'Categories', value: counts.totalCategories, icon: <LayoutGrid className="w-5 h-5" />, gradient: 'from-teal-500/20 to-teal-500/5', iconBg: 'bg-teal-500/20 text-teal-400' },
        { label: 'Active Plans', value: counts.totalPlans, icon: <FileText className="w-5 h-5" />, gradient: 'from-cyan-500/20 to-cyan-500/5', iconBg: 'bg-cyan-500/20 text-cyan-400' },
        { label: 'Total Users', value: counts.totalUsers, icon: <Users className="w-5 h-5" />, gradient: 'from-emerald-500/20 to-emerald-500/5', iconBg: 'bg-emerald-500/20 text-emerald-400' },
    ];

    const actions = [
        { title: 'Manage Places', desc: 'Add, update or delete travel destinations', icon: <MapPin className="w-6 h-6" />, path: '/admin/places', color: 'bg-emerald-500/10 text-emerald-400', border: 'hover:border-emerald-500/40' },
        { title: 'Manage Categories', desc: 'Organize places into different categories', icon: <LayoutGrid className="w-6 h-6" />, path: '/admin/categories', color: 'bg-teal-500/10 text-teal-400', border: 'hover:border-teal-500/40' },
        { title: 'User Analytics', desc: 'View engagement metrics and user growth', icon: <Users className="w-6 h-6" />, path: '#', color: 'bg-cyan-500/10 text-cyan-400', border: 'hover:border-cyan-500/40' },
    ];

    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

    return (
        <AdminLayout>
            <div className="p-6 lg:p-10">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-2">Overview</p>
                    <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
                    <p className="text-white/40 text-sm mt-1">Welcome back — here's what's happening on your platform.</p>
                </div>

                {/* Stats Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className={`bg-gradient-to-br ${stat.gradient} border border-white/10 p-6 rounded-3xl backdrop-blur-sm`}
                        >
                            <div className={`p-3 rounded-2xl w-fit mb-4 ${stat.iconBg}`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
                            <p className="text-4xl font-black mt-2 tracking-tighter">{stat.value}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Actions */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-white/70 uppercase tracking-widest text-xs mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {actions.map((action, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ y: -4, scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => action.path !== '#' && navigate(action.path)}
                                className={`flex items-start gap-5 bg-white/5 border border-white/10 ${action.border} p-6 rounded-3xl text-left transition-all group cursor-pointer`}
                            >
                                <div className={`p-4 rounded-2xl flex-shrink-0 ${action.color}`}>
                                    {action.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-base group-hover:text-emerald-400 transition-colors">{action.title}</h3>
                                    <p className="text-white/30 text-sm mt-1 leading-relaxed">{action.desc}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0 mt-1" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
