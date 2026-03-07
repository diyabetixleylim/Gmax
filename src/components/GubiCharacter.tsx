import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils';

export type GubiMood = 'happy' | 'worried' | 'angry' | 'thinking' | 'neutral' | 'witty';

export const GubiCharacter = ({ size = 'md', className = '', mood = 'happy' }: { size?: 'sm' | 'md' | 'lg', className?: string, mood?: GubiMood }) => {
  const sizes = {
    sm: 'w-12 h-16',
    md: 'w-24 h-32',
    lg: 'w-48 h-64'
  };

  const getMoodColors = () => {
    switch (mood) {
      case 'worried': return { body: 'bg-amber-400', border: 'border-amber-300/20', glow: 'bg-amber-500/20' };
      case 'angry': return { body: 'bg-red-400', border: 'border-red-300/20', glow: 'bg-red-500/20' };
      case 'thinking': return { body: 'bg-purple-400', border: 'border-purple-300/20', glow: 'bg-purple-500/20' };
      case 'witty': return { body: 'bg-emerald-400', border: 'border-emerald-300/20', glow: 'bg-emerald-500/20' };
      default: return { body: 'bg-blue-400', border: 'border-blue-300/20', glow: 'bg-blue-500/20' };
    }
  };

  const colors = getMoodColors();

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={cn("relative flex items-center justify-center", sizes[size], className)}
    >
      {/* Ground Glow/Shadow */}
      <div className={cn("absolute -bottom-10 left-1/2 -translate-x-1/2 w-[100%] h-6 blur-2xl rounded-full opacity-40", colors.glow)} />
      
      {/* Body - Pear Shape Blob */}
      <div className={cn(
        "relative w-full h-full rounded-[55%_55%_45%_45%] shadow-[inset_0_-25px_50px_rgba(30,58,138,0.3),inset_0_15px_30px_rgba(255,255,255,0.4),0_20px_40px_rgba(59,130,246,0.15)] overflow-visible flex flex-col items-center justify-center border-t border-white/30", 
        colors.body
      )}>
        
        {/* Visor Area - Recessed */}
        <div className="absolute top-[20%] w-[65%] h-[24%] bg-slate-950 rounded-[40%_40%_35%_35%] border border-blue-400/10 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),0_2px_4px_rgba(255,255,255,0.1)] z-10 overflow-hidden">
          {/* Eyes Container */}
          <div className="absolute top-[25%] left-0 right-0 flex justify-center gap-4">
            <motion.div 
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)]" 
            />
            <motion.div 
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)]" 
            />
          </div>
          
          {/* Mouth - Simple Happy Curve */}
          <div className="absolute bottom-[20%] left-0 right-0 flex justify-center">
            <svg 
              width="12" 
              height="6" 
              viewBox="0 0 12 6" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M3 2C3 2 4.5 4.5 6 4.5C7.5 4.5 9 2 9 2" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Arms - Small rounded nubs */}
        <div className={cn("absolute -left-1 top-[48%] w-5 h-10 rounded-full -rotate-12 shadow-inner opacity-90", colors.body)} />
        <div className={cn("absolute -right-1 top-[48%] w-5 h-10 rounded-full rotate-12 shadow-inner opacity-90", colors.body)} />

        {/* Watch/Sensor - Matches reference image */}
        <div className="absolute -left-5 top-[42%] z-20 rotate-[-12deg] flex items-center">
          {/* Strap */}
          <div className="absolute left-1/2 -translate-x-1/2 w-9 h-11 bg-slate-200 rounded-lg border border-slate-300 shadow-sm" />
          {/* Device Body */}
          <div className="relative w-8 h-9 bg-slate-900 rounded-lg border border-slate-800 shadow-xl flex flex-col items-center justify-center overflow-hidden">
            <div className="text-[9px] text-sky-300 font-mono font-black tracking-tighter leading-none">103</div>
            <div className="w-full h-[1px] bg-slate-800 my-0.5" />
            <div className="flex gap-0.5">
              <div className="w-1 h-1 bg-sky-500 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* Subtle 3D Highlights */}
        <div className="absolute top-2 left-1/4 w-1/2 h-10 bg-white/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-blue-600/10 rounded-full blur-lg pointer-events-none" />
      </div>
    </motion.div>
  );
};
