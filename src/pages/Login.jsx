import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await login(email, password);
            toast.success('Welcome back, explorer!');
            navigate(-1); // Go back to previous page (like Plan Builder)
        } catch (error) {
            toast.error('Invalid credentials. Check your map and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-6 pt-32 pb-24 relative overflow-hidden font-sans">
            {/* Ambient background decoration */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-100/50 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-teal-100/50 blur-[120px] rounded-full -z-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white border border-slate-100 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-6 shadow-sm">
                        <MapPin className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Log In</h1>
                    <p className="text-slate-500 text-sm font-medium">Continue your legendary journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Explorer Email</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                                <User className="w-5 h-5" />
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-50 transition-all font-medium placeholder:text-slate-300"
                                placeholder="explorer@world.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Secret Password</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                                <Lock className="w-5 h-5" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-slate-900 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-50 transition-all font-medium placeholder:text-slate-300"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-emerald-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed uppercase text-sm tracking-widest"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Begin Adventure
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm font-medium">
                        New explorer? {' '}
                        <Link to="/register" className="text-emerald-600 font-black hover:underline underline-offset-4 tracking-tight">
                            Create a Free Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
