import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ShieldCheck } from 'lucide-react';

export const Map = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Harita</h2>
      </div>

      <div className="relative w-full h-[500px] bg-white rounded-[40px] border border-sky-100 overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-6 h-6 bg-sky-500 rounded-full animate-ping absolute inset-0" />
            <div className="w-6 h-6 bg-sky-500 rounded-full relative z-10 border-4 border-white shadow-lg" />
          </div>
          
          {/* Meeting Points */}
          <div className="absolute top-1/4 right-1/3 cursor-pointer group">
            <div className="w-8 h-8 bg-emerald-500 rounded-full relative z-10 border-4 border-white shadow-xl group-hover:scale-110 transition-transform" />
            <div className="bg-white px-3 py-1.5 rounded-full border border-emerald-100 shadow-lg mt-2 whitespace-nowrap">
              <span className="text-[10px] text-emerald-600 font-black uppercase tracking-tighter">Beşiktaş Meydan</span>
            </div>
          </div>

          <div className="absolute bottom-1/3 left-1/4 cursor-pointer group">
            <div className="w-8 h-8 bg-emerald-500 rounded-full relative z-10 border-4 border-white shadow-xl group-hover:scale-110 transition-transform" />
            <div className="bg-white px-3 py-1.5 rounded-full border border-emerald-100 shadow-lg mt-2 whitespace-nowrap">
              <span className="text-[10px] text-emerald-600 font-black uppercase tracking-tighter">Kadıköy İskele</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-sky-100 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Güvenli Buluşma Bölgeleri</p>
          </div>
          <p className="text-sm text-slate-900 font-bold">Resmi Güvenlik Noktaları Haritada İşaretlenmiştir</p>
          <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
            Sistemimiz otomatik olarak en yakın "Güvenli Bölge"yi (Polis noktası, hastane bahçesi vb.) seçer. Lütfen bu noktaların dışına çıkmayın.
          </p>
        </div>
      </div>
    </div>
  );
};
