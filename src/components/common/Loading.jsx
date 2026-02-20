import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Loading = ({ message = "Discovering new horizons..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-6">
            <div className="relative">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        borderRadius: ["20%", "30%", "20%"]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-blue-600/10 border-2 border-blue-600 rounded-2xl flex items-center justify-center text-blue-600"
                >
                    <Sparkles size={32} />
                </motion.div>

                {/* Orbiting circles */}
                {[0, 120, 240].map((angle, i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                        className="absolute inset-0"
                    >
                        <div
                            className="w-3 h-3 bg-blue-400 rounded-full absolute -top-1 left-1/2 -translate-x-1/2"
                            style={{ opacity: 1 - (i * 0.2) }}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="text-slate-500 font-bold text-sm uppercase tracking-[0.2em]"
            >
                {message}
            </motion.p>
        </div>
    );
};

export default Loading;
