import React from 'react';
import { motion } from 'motion/react';
import { Activity, Utensils, Users } from 'lucide-react';
import { GubiCharacter } from './GubiCharacter';
import { GlucoseChart } from './GlucoseChart';
import { Askida } from './Askida';

export const TwinView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col items-center justify-center py-6 space-y-6">
        <h2 className="text-2xl font-black text-sky-900 tracking-tight uppercase tracking-widest">Metabolik Dijital İkiz</h2>
        <div className="relative">
          <div className="absolute inset-0 bg-sky-100 rounded-full blur-3xl opacity-50" />
          <GubiCharacter size="lg" />
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/50">
            <p className="text-[10px] text-sky-700/50 uppercase font-black tracking-widest mb-1">Metabolik Hız</p>
            <p className="text-2xl text-sky-900 font-black tracking-tighter">%94 Optimal</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/50">
            <p className="text-[10px] text-sky-700/50 uppercase font-black tracking-widest mb-1">İnsülin Duyarlılığı</p>
            <p className="text-2xl text-sky-900 font-black tracking-tighter">Yüksek</p>
          </div>
        </div>
      </div>

      {/* KH Tracking Section */}
      <div className="bg-white border border-sky-100 rounded-[40px] p-8 space-y-6 shadow-2xl shadow-sky-200/50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-sky-900 flex items-center gap-2 uppercase tracking-widest">
            <Utensils className="w-5 h-5 text-sky-500" />
            KH Dengesi
          </h3>
          <span className="text-[10px] text-sky-600 font-black uppercase tracking-widest">Bugün: 145g</span>
        </div>
        <div className="h-40 w-full bg-slate-50 rounded-3xl p-4 border border-slate-100">
          <GlucoseChart />
        </div>
        <button 
          className="w-full py-5 bg-sky-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-sky-700 transition-all shadow-xl shadow-sky-200"
        >
          KH Detaylarını Gör
        </button>
      </div>

      <div className="border-t border-sky-100 pt-10">
        <h3 className="text-xl font-black text-sky-900 mb-2 uppercase tracking-tight">P2P Yardımlaşma</h3>
        <p className="text-xs text-sky-700/60 mb-8 font-medium">Malzeme paylaşımı için güvenli iletişim alanı.</p>
        <Askida />
      </div>
    </motion.div>
  );
};
