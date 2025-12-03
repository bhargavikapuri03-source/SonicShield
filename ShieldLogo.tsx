import { motion } from 'framer-motion';

export function ShieldLogo() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      {/* Outer glow */}
      <g filter="url(#glow)">
        {/* Shield outline */}
        <motion.path
          d="M100 20 L160 40 L160 90 Q160 140 100 180 Q40 140 40 90 L40 40 Z"
          fill="url(#shieldGradient)"
          stroke="url(#strokeGradient)"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0.3],
            scale: [0.8, 1, 1, 0.95]
          }}
          transition={{ 
            duration: 4,
            times: [0, 0.4, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut"
          }}
        />
        
        {/* Soundwave inside shield */}
        {/* Center line */}
        <motion.path
          d="M100 80 L100 120"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.8, 1, 0.8],
            scaleY: [0, 1, 1.3, 1],
          }}
          transition={{
            opacity: { times: [0, 0.3, 0.5, 1], duration: 2 },
            scaleY: { times: [0, 0.3, 0.5, 1], duration: 2, repeat: Infinity, repeatDelay: 0.5 },
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
        
        {/* Left waves - getting progressively taller */}
        <motion.path
          d="M85 90 L85 110"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.7, 1, 0.7],
            scaleY: [0, 1, 1.4, 1],
          }}
          transition={{
            opacity: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.1 },
            scaleY: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.1, repeat: Infinity, repeatDelay: 0.5 },
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
        <motion.path
          d="M70 85 L70 115"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.6, 0.9, 0.6],
            scaleY: [0, 1, 1.2, 1],
          }}
          transition={{
            opacity: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.2 },
            scaleY: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 0.5 },
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
        <motion.path
          d="M55 95 L55 105"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.5, 0.8, 0.5],
            scaleY: [0, 1, 1.5, 1],
          }}
          transition={{
            opacity: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.3 },
            scaleY: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.3, repeat: Infinity, repeatDelay: 0.5 },
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
        
        {/* Right waves - getting progressively taller */}
        <motion.path
          d="M115 90 L115 110"
          stroke="#60A5FA"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.7, 1, 0.7],
            scaleY: [0, 1, 1.4, 1],
          }}
          transition={{
            opacity: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.1 },
            scaleY: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.1, repeat: Infinity, repeatDelay: 0.5 },
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
        <motion.path
          d="M130 85 L130 115"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.6, 0.9, 0.6],
            scaleY: [0, 1, 1.2, 1],
          }}
          transition={{
            opacity: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.2 },
            scaleY: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 0.5 },
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
        <motion.path
          d="M145 95 L145 105"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 0.5, 0.8, 0.5],
            scaleY: [0, 1, 1.5, 1],
          }}
          transition={{
            opacity: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.3 },
            scaleY: { times: [0, 0.3, 0.5, 1], duration: 2, delay: 0.3, repeat: Infinity, repeatDelay: 0.5 },
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
      </g>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="shieldGradient" x1="100" y1="20" x2="100" y2="180">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#0F172A" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
        </linearGradient>
        
        <linearGradient id="strokeGradient" x1="100" y1="20" x2="100" y2="180">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}