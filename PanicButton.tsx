import { motion } from "framer-motion";
import { useState } from "react";
import { triggerSOS, getLocation } from "../utils/sosLogic";
import { useSafety } from "../context/SafetyContext";

export function PanicButton() {
    const { settings } = useSafety();
    const [isPressing, setIsPressing] = useState(false);

    const handlePanic = async () => {
        try {
            const location = await getLocation();
            triggerSOS(settings.sosContacts, location);
        } catch (e) {
            // Fallback without location
            triggerSOS(settings.sosContacts);
        }
    };

    return (
        <motion.button
            className="relative w-32 h-32 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] border-4 border-red-500 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={() => setIsPressing(true)}
            onMouseUp={() => setIsPressing(false)}
            onMouseLeave={() => setIsPressing(false)}
            onClick={handlePanic}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-700" />

            {/* Pulse effect */}
            <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/30"
                animate={{
                    scale: [1, 1.5],
                    opacity: [1, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
            />

            <div className="relative z-10 flex flex-col items-center">
                <span className="text-2xl font-bold text-white tracking-wider">SOS</span>
                <span className="text-[10px] text-red-200 uppercase tracking-widest mt-1">Panic</span>
            </div>

            {/* Press overlay */}
            {isPressing && (
                <div className="absolute inset-0 bg-black/20" />
            )}
        </motion.button>
    );
}
