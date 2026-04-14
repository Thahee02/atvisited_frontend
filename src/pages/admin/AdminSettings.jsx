import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, ShieldCheck, KeyRound } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import useAuthStore from '../../store/useAuthStore';

const AdminSettings = () => {
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
            toast.error('New password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            await api.post('/auth/change-password', {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });
            toast.success('Password changed successfully!');
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            const msg = error.response?.data?.message
                || error.response?.data
                || 'Failed to change password.';
            toast.error(typeof msg === 'string' ? msg : 'Failed to change password.');
        } finally {
            setLoading(false);
        }
    };

    const PasswordField = ({ label, name, show, onToggle, placeholder }) => (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 block">{label}</label>
            <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-emerald-400 transition-colors" />
                <input
                    type={show ? 'text' : 'password'}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-14 text-white text-sm font-medium focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-white/10"
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors cursor-pointer"
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="p-6 lg:p-10">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-2">Configuration</p>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">Settings</h1>
                    <p className="text-white/40 text-sm mt-1">Manage your admin account security</p>
                </div>

                <div className="max-w-2xl space-y-6">
                    {/* Profile Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 font-black text-xl flex-shrink-0">
                                {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-white">{user?.firstName} {user?.lastName}</h2>
                                <p className="text-white/40 text-sm">{user?.email}</p>
                                <span className="inline-block mt-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Change Password Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                                <KeyRound className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Change Password</h3>
                                <p className="text-white/30 text-xs mt-0.5">Update your admin account password</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <PasswordField
                                label="Current Password"
                                name="currentPassword"
                                show={showCurrent}
                                onToggle={() => setShowCurrent(!showCurrent)}
                                placeholder="Enter current password"
                            />
                            <PasswordField
                                label="New Password"
                                name="newPassword"
                                show={showNew}
                                onToggle={() => setShowNew(!showNew)}
                                placeholder="Enter new password"
                            />
                            <PasswordField
                                label="Confirm New Password"
                                name="confirmPassword"
                                show={showConfirm}
                                onToggle={() => setShowConfirm(!showConfirm)}
                                placeholder="Re-enter new password"
                            />

                            {/* Strength hint */}
                            {form.newPassword && (
                                <div className="flex items-center gap-3 px-1">
                                    <div className="flex gap-1.5 flex-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-all ${
                                                    form.newPassword.length >= i * 3
                                                        ? i <= 1 ? 'bg-red-500' : i <= 2 ? 'bg-orange-500' : i <= 3 ? 'bg-yellow-500' : 'bg-emerald-500'
                                                        : 'bg-white/10'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest w-16 text-right">
                                        {form.newPassword.length < 4 ? 'Weak' : form.newPassword.length < 7 ? 'Fair' : form.newPassword.length < 10 ? 'Good' : 'Strong'}
                                    </span>
                                </div>
                            )}

                            <div className="pt-4 border-t border-white/10">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer text-sm uppercase tracking-widest"
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
        </AdminLayout>
    );
};

export default AdminSettings;
