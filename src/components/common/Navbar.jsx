import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Search, User, LogOut, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/utils';
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Plans', path: '/plans' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
            scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                        <MapPin size={24} />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                        AtVisited
                    </span>
                </Link>


                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-semibold transition-colors hover:text-emerald-600",
                                location.pathname === link.path ? "text-emerald-600" : "text-slate-600"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            {user?.role === 'ADMIN' && (
                                <Link to="/admin/dashboard" className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                                    <Layout size={20} />
                                </Link>
                            )}
                            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] font-black text-emerald-600">
                                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                                </div>
                                <span className="text-xs font-black text-slate-900 uppercase tracking-tighter">{user?.firstName}</span>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-100 uppercase tracking-widest">
                            Sign In
                        </Link>
                    )}
                </div>



                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-lg font-bold p-2 rounded-xl transition-colors",
                                    location.pathname === link.path ? "bg-emerald-50 text-emerald-600" : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="pt-4 border-t border-slate-50 space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-[2rem]">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black">
                                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 uppercase tracking-tight">{user?.firstName} {user?.lastName}</p>
                                        <p className="text-xs text-slate-400 font-medium">{user?.email}</p>
                                    </div>
                                </div>
                                {user?.role === 'ADMIN' && (
                                    <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-sm uppercase tracking-widest">
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={() => { logout(); setIsOpen(false); navigate('/'); }}
                                    className="w-full py-4 text-red-500 font-black text-sm uppercase tracking-widest"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 text-center">
                                Sign In
                            </Link>
                        )}


                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
