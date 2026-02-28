import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils';

export const GubiCharacter = ({ size = 'md', className = '', mood = 'happy' }: { size?: 'sm' | 'md' | 'lg', className?: string, mood?: 'happy' | 'thinking' | 'neutral' }) => {
  const sizes = {
    sm: 'w-12 h-16',
    md: 'w-24 h-32',
    lg: 'w-48 h-64'
  };

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={cn("relative flex items-center justify-center", sizes[size], className)}
    >
      {/* Ground Glow (as seen in image) */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-blue-500/20 blur-xl rounded-full" />
      
      {/* Body - Smooth pill shape */}
      <div className="relative w-full h-full bg-blue-400 rounded-[45%] shadow-[inset_0_-20px_40px_rgba(30,58,138,0.4),0_20px_50px_rgba(59,130,246,0.2)] border border-blue-300/20 overflow-visible flex flex-col items-center justify-center">
        
        {/* Visor Area (Almond shape from image) */}
        <div className="absolute top-[15%] w-[75%] h-[28%] bg-slate-950 rounded-[50%_50%_45%_45%] flex flex-col items-center justify-center border border-blue-400/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
          <div className="flex justify-around w-full px-4 mb-0.5">
            {/* Glowing Eyes */}
            <motion.div 
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 5, times: [0, 0.05, 0.1] }}
              className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1),0_0_20px_rgba(59,130,246,0.5)]" 
            />
            <motion.div 
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 5, times: [0, 0.05, 0.1] }}
              className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1),0_0_20px_rgba(59,130,246,0.5)]" 
            />
          </div>
          
          {/* Simple Curved Smile (u shape from image) */}
          <div className="flex justify-center w-full mt-0.5">
            <svg 
              width={size === 'sm' ? "8" : size === 'md' ? "12" : "24"} 
              height={size === 'sm' ? "4" : size === 'md' ? "6" : "12"} 
              viewBox="0 0 12 6" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="opacity-90"
            >
              <path d="M2 2C2 2 4 4.5 6 4.5C8 4.5 10 2 10 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Arms (Stubby extensions from image) */}
        <div className="absolute -left-2 top-[45%] w-6 h-12 bg-blue-400 rounded-full -rotate-12 shadow-inner" />
        <div className="absolute -right-2 top-[45%] w-6 h-12 bg-blue-400 rounded-full rotate-12 shadow-inner" />

        {/* Watch/Sensor on the left arm (from viewer's perspective) */}
        <div className="absolute -left-4 top-[42%] w-8 h-10 bg-slate-900 rounded-lg border border-slate-700 shadow-2xl flex flex-col items-center justify-center z-20 rotate-[-15deg]">
          <div className="text-[8px] text-blue-300 font-mono font-black tracking-tighter">103</div>
          <div className="w-full h-[1px] bg-slate-800 my-0.5" />
          <div className="flex gap-0.5">
            <div className="w-1 h-1 bg-blue-500/50 rounded-full" />
            <div className="w-1 h-1 bg-slate-700 rounded-full" />
          </div>
        </div>

        {/* Subtle body highlights */}
        <div className="absolute top-4 left-1/4 w-1/2 h-8 bg-white/10 rounded-full blur-lg" />
      </div>
    </motion.div>
  );
};
