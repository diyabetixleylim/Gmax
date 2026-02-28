import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, MessageSquare, Heart, Package, ShieldCheck, AlertCircle, ChevronRight, X } from 'lucide-react';
import { cn } from '../utils';

const communityItems = [
  { id: '1', type: 'insulin', title: 'Humalog KwikPen', distance: '450m', status: 'available', user: 'Can B.' },
  { id: '2', type: 'sensor', title: 'Dexcom G6 Sensor', distance: '1.2km', status: 'available', user: 'Elif S.' },
  { id: '3', type: 'strip', title: 'Accu-Chek Strip', distance: '800m', status: 'available', user: 'Mert K.' },
  { id: '4', type: 'meter', title: 'Şeker Ölçüm Cihazı', distance: '2.1km', status: 'available', user: 'Selin Y.' },
];

export const CommunitySection = ({ hideHeader = false, hideChat = false }: { hideHeader?: boolean, hideChat?: boolean }) => {
  const [activeView, setActiveView] = useState<'list' | 'chat' | 'map'>(hideChat ? 'list' : 'list');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEmergency, setIsEmergency] = useState(false);

  const handleRequest = (item: any) => {
    if (hideChat) return;
    setSelectedItem(item);
    setActiveView('chat');
  };

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Toplum</h2>
          <button 
            onClick={() => setIsEmergency(true)}
            className="bg-red-50 border border-red-100 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
          >
            <AlertCircle className="w-3 h-3 text-red-500" />
            <span className="text-[10px] text-red-600 font-bold uppercase">Acil İnsülin</span>
          </button>
        </div>
      )}

      <div className="flex gap-2 p-1 bg-white rounded-2xl border border-sky-100 shadow-sm">
        <button 
          onClick={() => setActiveView('list')}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", activeView === 'list' ? "bg-sky-50 text-sky-600" : "text-slate-400")}
        >
          Askıda
        </button>
        {!hideChat && (
          <button 
            onClick={() => setActiveView('map')}
            className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", activeView === 'map' ? "bg-sky-50 text-sky-600" : "text-slate-400")}
          >
            Harita
          </button>
        )}
      </div>

      {activeView === 'list' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Malzeme ara..." 
              className="w-full bg-white border border-sky-100 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 focus:border-sky-500 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {communityItems.map((item) => (
              <div key={item.id} className="bg-white border border-sky-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-sky-50 p-3 rounded-xl border border-sky-100">
                    <Package className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-sky-900">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-[10px] text-slate-400 font-medium">{item.distance} • {item.user}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleRequest(item)}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-sky-100"
                >
                  İste
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeView === 'chat' && selectedItem && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-xl shadow-sky-200/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center border border-sky-100">
                <User className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-sky-900">{selectedItem.user}</h4>
                <p className="text-[10px] text-emerald-500 font-bold uppercase">Çevrimiçi</p>
              </div>
            </div>
            <button onClick={() => setActiveView('list')} className="p-2 bg-slate-50 rounded-full border border-slate-100">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="space-y-4 h-64 overflow-y-auto p-2">
            <div className="bg-slate-50 rounded-2xl rounded-tl-none p-3 max-w-[80%] border border-slate-100">
              <p className="text-xs text-slate-700">Merhaba, {selectedItem.title} hala mevcut mu?</p>
            </div>
            <div className="bg-sky-600 rounded-2xl rounded-tr-none p-3 max-w-[80%] ml-auto shadow-lg shadow-sky-100">
              <p className="text-xs text-white">Evet, mevcut. Ortak bir noktada buluşabiliriz.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50">
            <button 
              onClick={() => setActiveView('map')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100"
            >
              <MapPin className="w-4 h-4" />
              Güvenli Buluşma Noktası Seç
            </button>
          </div>
        </motion.div>
      )}

      {activeView === 'map' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="relative w-full h-80 bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-inner">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-4 h-4 bg-sky-500 rounded-full animate-ping absolute inset-0" />
                <div className="w-4 h-4 bg-sky-500 rounded-full relative z-10 border-2 border-white" />
              </div>
              <div className="absolute top-1/4 right-1/3">
                <div className="w-4 h-4 bg-emerald-500 rounded-full relative z-10 border-2 border-white" />
                <div className="bg-white px-2 py-1 rounded-full border border-emerald-100 shadow-sm mt-2">
                  <span className="text-[8px] text-emerald-600 font-bold uppercase">Buluşma Noktası</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 shadow-lg">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Seçilen Nokta</p>
              <p className="text-xs text-slate-900 font-bold">Beşiktaş Meydanı - Güvenli Bölge</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center italic">Kişisel verileriniz ve tam konumunuz paylaşılmadan ortak nokta belirlenmiştir.</p>
        </motion.div>
      )}

      {/* Emergency Insulin Modal */}
      <AnimatePresence>
        {isEmergency && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-950/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">ACİL İNSÜLİN TALEBİ</h2>
            <p className="text-red-200 text-sm mb-8">Yakınınızdaki 500m çapındaki tüm kullanıcılara acil durum bildirimi gönderiliyor.</p>
            
            <div className="w-full space-y-4">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-white font-bold mb-2">Talebiniz:</p>
                <p className="text-xl text-white font-black">Hızlı Etkili İnsülin</p>
              </div>
              <button 
                onClick={() => setIsEmergency(false)}
                className="w-full py-4 bg-white text-red-600 rounded-2xl font-bold"
              >
                TALEBİ İPTAL ET
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { User } from 'lucide-react';
