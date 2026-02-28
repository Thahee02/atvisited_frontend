import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Lock, User, Eye, EyeOff, Loader2, ArrowRight, UserPlus } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const register = useAuthStore((state) => state.register);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        setIsSubmitting(true);
        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            toast.success('Passport issued! Welcome to AtVisited.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data || 'Failed to register. Is this email already in use?');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-6 pt-32 pb-24 relative overflow-hidden font-sans">
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-100/50 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-teal-100/50 blur-[120px] rounded-full -z-10 animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-white border border-slate-100 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-6 shadow-sm">
                        <UserPlus className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Register</h1>
                    <p className="text-slate-500 text-sm font-medium tracking-tight">Begin your global legacy with AtVisited</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">First Name</label>
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-slate-900 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-50 transition-all font-medium placeholder:text-slate-300"
                                placeholder="Frodo"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Last Name</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-slate-900 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-50 transition-all font-medium placeholder:text-slate-300"
                                placeholder="Baggins"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-slate-900 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-50 transition-all font-medium placeholder:text-slate-300"
                            placeholder="frodo@shire.com"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-slate-900 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-50 transition-all font-medium placeholder:text-slate-300"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Confirm</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-slate-900 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-50 transition-all font-medium placeholder:text-slate-300"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end px-1">
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-tighter"
                        >
                            {showPassword ? "Hide Passwords" : "Show Passwords"}
                        </button>
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
                                Claim My Passport
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm font-medium">
                        Already an explorer? {' '}
                        <Link to="/login" className="text-emerald-600 font-black hover:underline underline-offset-4 tracking-tight">
                            Sign In Here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
