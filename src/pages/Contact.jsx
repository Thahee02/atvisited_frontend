import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { cn } from '../utils/utils';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            toast.success("Message sent! We'll explore back to you soon.");
            setIsSubmitting(false);
            e.target.reset();
        }, 1500);
    };

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left Column: Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full font-bold text-xs uppercase tracking-widest mb-8 border border-emerald-100"
                        >
                            <MessageSquare size={14} />
                            Contact Us
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[0.9]"
                        >
                            Let's map out <br />
                            <span className="text-emerald-600">the next chapter</span>
                        </motion.h1>

                        <p className="text-lg text-slate-500 mb-12 max-w-md">
                            Have a landmark to suggest, a technical question, or just want to share a story? Our team is always ready for a journey.
                        </p>

                        <div className="space-y-8">
                            {[
                                { title: 'Email', value: 'hello@atvisited.com', icon: Mail, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { title: 'Phone', value: '+1 (555) 123-4567', icon: Phone, color: 'text-teal-600', bg: 'bg-teal-50' },
                                { title: 'Headquarters', value: '123 Discovery Way, San Francisco', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            ].map((item, i) => (

                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3", item.bg)}>
                                        <item.icon className={item.color} size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
                                        <p className="text-lg font-black text-slate-900">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-slate-50 rounded-[3rem] -z-10 rotate-1" />
                        <div className="bg-white p-10  rounded-[2.5rem] border border-slate-100 shadow-2xl">
                            <h3 className="text-2xl font-black text-slate-900 mb-8">Send us a transmission</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Your explorer name"
                                            className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Email</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="hello@world.com"
                                            className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                                        />
                                    </div>

                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="What's on your map?"
                                        className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Tell us your coordinates..."
                                        className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full group flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-70 disabled:grayscale"
                                >

                                    {isSubmitting ? "Transmitting..." : "Send Transmission"}
                                    {!isSubmitting && <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                                </button>
                            </form>
                        </div>

                        {/* Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
