import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin, LayoutGrid, Plus, LogOut, FileText, Settings, Users } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import api from '../../services/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();
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

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const stats = [
        { label: 'Total Places', value: counts.totalPlaces, icon: <MapPin className="w-5 h-5" />, color: 'emerald' },
        { label: 'Categories', value: counts.totalCategories, icon: <LayoutGrid className="w-5 h-5" />, color: 'emerald' },
        { label: 'Active Plans', value: counts.totalPlans, icon: <FileText className="w-5 h-5" />, color: 'emerald' },
        { label: 'Total Users', value: counts.totalUsers, icon: <Users className="w-5 h-5" />, color: 'emerald' },
    ];


    const actions = [
        { title: 'Manage Places', desc: 'Add, update or delete travel destinations', icon: <MapPin />, path: '/admin/places', color: 'bg-emerald-500/10 text-emerald-400' },
        { title: 'Manage Categories', desc: 'Organize places into different categories', icon: <LayoutGrid />, path: '/admin/categories', color: 'bg-teal-500/10 text-teal-400' },
        { title: 'User Analytics', desc: 'View engagement metrics and user growth', icon: <Users />, path: '#', color: 'bg-emerald-500/10 text-emerald-400' },
    ];


    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-6 lg:p-10 font-sans">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Welcome, Admin</h1>
                    <p className="text-white/50 text-sm mt-1">Manage your platform and content from one place</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-white/70 px-4 py-2 rounded-xl border border-white/10 transition-all cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-semibold">Logout</span>
                </button>
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            >
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        variants={item}
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm"
                    >
                        <div className="p-3 rounded-2xl w-fit mb-4 bg-emerald-500/10 text-emerald-400">
                            {stat.icon}
                        </div>

                        <h3 className="text-white/50 text-sm font-medium">{stat.label}</h3>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </motion.div>

            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actions.map((action, idx) => (
                    <motion.button
                        key={idx}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => action.path !== '#' && navigate(action.path)}
                        className="flex items-start gap-5 bg-white/5 border border-white/10 p-6 rounded-3xl text-left hover:border-white/20 transition-all group cursor-pointer"
                    >
                        <div className={`p-4 rounded-2xl ${action.color}`}>
                            {action.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">{action.title}</h3>
                            <p className="text-white/40 text-sm mt-1 leading-relaxed">{action.desc}</p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
