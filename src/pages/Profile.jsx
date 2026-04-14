import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, ShieldCheck, KeyRound, MapPin, User } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';
import useAuthStore from '../store/useAuthStore';

const Profile = () => {
    const { user } = useAuthStore();
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            toast.error('New passwords do not match.');
            return;
        }
        if (form.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            await api.post('/auth/change-password', {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });
            toast.success('Password updated successfully!');
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            const msg = error.response?.data?.message
                || error.response?.data
                || 'Failed to update password.';
            toast.error(typeof msg === 'string' ? msg : 'Failed to update password.');
        } finally {
            setLoading(false);
        }
    };

    const PasswordField = ({ label, name, show, onToggle, placeholder }) => (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">{label}</label>
            <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <input
                    type={show ? 'text' : 'password'}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    placeholder={placeholder}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-14 text-slate-900 text-sm font-medium focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-50 transition-all placeholder:text-slate-300"
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer"
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );

    const getInitials = () => `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`;

    return (
        <div className="min-h-screen bg-[#fafbfc] pt-32 pb-24 px-6 font-sans">
            {/* Ambient blobs */}
            <div className="fixed top-[-10%] left-[-5%] w-[35%] h-[35%] bg-emerald-100/40 blur-[120px] rounded-full -z-10" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-teal-100/40 blur-[120px] rounded-full -z-10" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Page title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-2"
                >
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-[0.3em] mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        My Account
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Profile</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your explorer account settings</p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm"
                >
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg shadow-emerald-100">
                            {getInitials()}
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                {user?.firstName} {user?.lastName}
                            </h2>
                            <p className="text-slate-400 text-sm">{user?.email}</p>
                            <span className="inline-block mt-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                Explorer
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">First Name</p>
                            <p className="text-slate-900 font-bold text-sm">{user?.firstName}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Name</p>
                            <p className="text-slate-900 font-bold text-sm">{user?.lastName}</p>
                        </div>
                        <div className="col-span-2 bg-slate-50 rounded-2xl p-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                            <p className="text-slate-900 font-bold text-sm">{user?.email}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Change Password Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center">
                            <KeyRound className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 font-black text-lg uppercase tracking-tight">Change Password</h3>
                            <p className="text-slate-400 text-xs mt-0.5">Keep your explorer account secure</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <PasswordField
                            label="Current Password"
                            name="currentPassword"
                            show={showCurrent}
                            onToggle={() => setShowCurrent(!showCurrent)}
                            placeholder="Enter your current password"
                        />
                        <PasswordField
                            label="New Password"
                            name="newPassword"
                            show={showNew}
                            onToggle={() => setShowNew(!showNew)}
                            placeholder="Choose a new password"
                        />
                        <PasswordField
                            label="Confirm New Password"
                            name="confirmPassword"
                            show={showConfirm}
                            onToggle={() => setShowConfirm(!showConfirm)}
                            placeholder="Re-enter your new password"
                        />

                        {/* Password strength bar */}
                        {form.newPassword && (
                            <div className="flex items-center gap-3 px-1 pt-1">
                                <div className="flex gap-1.5 flex-1">
                                    {[1,2,3,4].map(i => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                                form.newPassword.length >= i * 3
                                                    ? i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-orange-400' : i <= 3 ? 'bg-yellow-400' : 'bg-emerald-500'
                                                    : 'bg-slate-100'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest w-14 text-right">
                                    {form.newPassword.length < 4 ? 'Weak' : form.newPassword.length < 7 ? 'Fair' : form.newPassword.length < 10 ? 'Good' : 'Strong'}
                                </span>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:shadow-emerald-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer text-sm uppercase tracking-widest"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <ShieldCheck className="w-5 h-5" />
                                )}
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
