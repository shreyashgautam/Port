import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("FETCHING SAKSHI PANDEY // PORTFOLIO...");
  const [isDone, setIsDone] = useState(false);

  // Update Loading Progress
  useEffect(() => {
    const duration = 2800; // 2.8s load
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }

        // Sequential high-tech boot states
        if (next < 25) {
          setStatus("FETCHING SAKSHI PANDEY // PORTFOLIO...");
        } else if (next < 55) {
          setStatus("SYNAPSE_INIT // SYNCING AI/ML MODELS...");
        } else if (next < 80) {
          setStatus("CALIBRATING CONSTELLATION GRAPH // READY...");
        } else {
          setStatus("LAUNCHING SYSTEM TERMINAL...");
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020617] text-white font-sans overflow-hidden"
        >
          {/* Top Info Tags */}
          <div className="absolute top-8 inset-x-8 flex justify-between items-center text-[9px] font-mono tracking-[0.25em] text-gray-500 select-none z-10">
            <span className="text-[#22d3ee] font-bold">SYSTEM_BOOT</span>
            <span>STABLE_V1.0.1 // (76)</span>
          </div>

          {/* Bottom Info Tags */}
          <div className="absolute bottom-8 inset-x-8 flex justify-between items-center text-[9px] font-mono tracking-[0.25em] text-gray-500 select-none z-10">
            <span>SAKSHI_PANDEY</span>
            <span>PORT_5173 // IN</span>
          </div>

          {/* Central HUD Center Ring */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            
            {/* Dashed outer target ring that rotates */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Rotating Dashed Circle */}
              <div className="absolute inset-0 border border-dashed border-[#22d3ee]/30 rounded-full animate-spin-slow" />
              
              {/* Top & Bottom Cyan Pins */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" />

              {/* Central Glass Circle */}
              <div className="w-36 h-36 flex flex-col items-center justify-center bg-[#070b19]/60 backdrop-blur-md rounded-full border border-white/5 shadow-[0_0_50px_rgba(34,211,238,0.05)] select-none">
                <span className="text-[8px] text-[#22d3ee] tracking-[0.3em] font-mono font-bold">BOOT</span>
                
                {/* Large Serif Number matching reference */}
                <div className="text-5xl font-serif text-white tracking-tighter my-0.5 flex items-baseline">
                  {Math.round(progress)}
                  <span className="text-xs text-[#22d3ee] font-mono font-black ml-0.5">%</span>
                </div>
                
                <span className="text-[8px] text-gray-500 tracking-[0.2em] font-mono">SYS_LNK // 76</span>
              </div>
            </div>

            {/* Glowing active monospace sub-message */}
            <div className="mt-10 font-mono text-[10px] tracking-[0.2em] text-[#22d3ee] select-none text-shadow-glow">
              &gt;&gt; {status}
            </div>

          </div>

          {styleCode}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Add animations for custom spin speed
const styleCode = (
  <style>{`
    .animate-spin-slow {
      animation: spin 12s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .text-shadow-glow {
      text-shadow: 0 0 12px rgba(34, 211, 238, 0.4);
    }
  `}</style>
);

export default Preloader;
