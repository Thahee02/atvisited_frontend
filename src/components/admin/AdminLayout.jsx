import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, LayoutGrid, Settings, LogOut, ChevronLeft,
    ChevronRight, LayoutDashboard, Menu, X
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Manage Places', icon: MapPin, path: '/admin/places' },
    { label: 'Categories', icon: LayoutGrid, path: '/admin/categories' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const SidebarContent = ({ onLinkClick }) => (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className={`flex items-center gap-3 px-6 py-7 border-b border-white/10 ${collapsed ? 'justify-center px-4' : ''}`}>
                <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                    <MapPin className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <span className="text-white font-black text-lg tracking-tight">AtVisited</span>
                )}
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 py-2 space-y-1 mt-2">
                {navItems.map(({ label, icon: Icon, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        onClick={onLinkClick}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                            }
                            ${collapsed ? 'justify-center px-3' : ''}`
                        }
                        title={collapsed ? label : undefined}
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                            <span className="text-sm font-bold truncate">{label}</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className={`p-4 border-t border-white/10 ${collapsed ? 'flex justify-center' : ''}`}>
                <button
                    onClick={handleLogout}
                    title={collapsed ? 'Logout' : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all w-full cursor-pointer
                        ${collapsed ? 'justify-center px-3' : ''}`}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="text-sm font-bold">Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0F172A] text-white flex font-sans">
            {/* Desktop sidebar */}
            <aside
                className={`hidden lg:flex flex-col flex-shrink-0 bg-[#080F1E] border-r border-white/10 relative transition-all duration-300 ease-in-out
                    ${collapsed ? 'w-20' : 'w-64'}`}
            >
                <SidebarContent />

                {/* Collapse toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3.5 top-20 w-7 h-7 bg-[#0F172A] border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer shadow-lg z-10"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </aside>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-72 bg-[#080F1E] border-r border-white/10 z-50 lg:hidden"
                        >
                            <SidebarContent onLinkClick={() => setMobileOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile top bar */}
                <div className="lg:hidden flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-[#080F1E]">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black text-white tracking-tight">AtVisited Admin</span>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
