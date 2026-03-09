import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Video, Award, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

const videos = [
  { id: 1, title: 'Karbonhidrat Sayımı Temelleri', duration: '12:45', category: 'Eğitim', thumbnail: 'https://picsum.photos/seed/edu1/400/225' },
  { id: 2, title: 'Gizli Şeker Kaynakları', duration: '08:20', category: 'İleri Seviye', thumbnail: 'https://picsum.photos/seed/edu2/400/225' },
  { id: 3, title: 'Öğün Planlama Stratejileri', duration: '15:10', category: 'Pratik', thumbnail: 'https://picsum.photos/seed/edu3/400/225' },
];

export const DietitianArea = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-sky-900 tracking-tight">Diyetisyen Köşesi</h2>
        <p className="text-sm text-slate-400 font-medium">KH sayımı ve beslenme eğitimleri</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-900">Rehberler</span>
        </div>
        <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-900">Sertifikalar</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Eğitim Videoları</h3>
          <button className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">Tümünü Gör</button>
        </div>

        <div className="space-y-4">
          {videos.map(video => (
            <motion.div 
              key={video.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-sky-100 rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
            >
              <div className="relative aspect-video">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sky-600 shadow-xl">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-bold">
                  {video.duration}
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-black text-sky-600 uppercase tracking-widest">{video.category}</span>
                  <h4 className="text-sm font-bold text-slate-900">{video.title}</h4>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-sky-600 rounded-[32px] p-6 text-white shadow-xl shadow-sky-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Video className="w-12 h-12" />
        </div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-lg font-black uppercase tracking-tight">Canlı Soru-Cevap</h3>
          <p className="text-xs text-sky-100 font-medium leading-relaxed">Her Salı saat 20:00'de uzman diyetisyenimizle canlı yayında KH sayımı pratikleri yapıyoruz.</p>
          <button className="bg-white text-sky-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">Hatırlatıcı Ekle</button>
        </div>
      </div>
    </div>
  );
};
