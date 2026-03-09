import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, MapPin, Plus, X, AlertCircle } from 'lucide-react';
import { CommunityItem } from '../types';
import { cn } from '../utils';

const initialItems: CommunityItem[] = [
  { id: '1', type: 'insulin', title: 'Humalog KwikPen', distance: '0.45km', status: 'available', user: 'Can B.', description: 'Son kullanma tarihi 2025. Soğuk zincir korundu.' },
  { id: '2', type: 'sensor', title: 'Dexcom G6 Sensor', distance: '1.20km', status: 'available', user: 'Elif S.', description: 'Kutusu açılmamış yedek sensör.' },
  { id: '3', type: 'strip', title: 'Accu-Chek Strip', distance: '0.80km', status: 'available', user: 'Mert K.', description: '50lik paket, ihtiyacı olana verebilirim.' },
  { id: '4', type: 'insulin', title: 'Lantus SoloStar', distance: '2.10km', status: 'available', user: 'Zeynep A.', description: 'Yedek kalem, buzdolabında saklanıyor.' },
  { id: '5', type: 'meter', title: 'FreeStyle Optium Neo', distance: '3.50km', status: 'available', user: 'Burak T.', description: 'Yeni cihaza geçtiğim için boşa çıktı.' },
];

export const Askida = () => {
  const [items, setItems] = useState<CommunityItem[]>(initialItems);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', type: 'insulin' as any, description: '' });

  const [isEmergency, setIsEmergency] = useState(false);

  const handleAddItem = () => {
    const item: CommunityItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newItem.title,
      type: newItem.type,
      distance: '0.1km',
      status: 'available',
      user: 'Sen',
      description: newItem.description
    };
    setItems([item, ...items]);
    setIsAdding(false);
    setNewItem({ title: '', type: 'insulin', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Askıda Malzeme</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-sky-600 px-4 py-2 rounded-xl text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-sky-100 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ürün Bırak
          </button>
          <button 
            onClick={() => setIsEmergency(true)}
            className="bg-red-600 px-4 py-2 rounded-xl text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-red-100 flex items-center gap-2 animate-pulse"
          >
            <AlertCircle className="w-4 h-4" />
            Acil
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isEmergency && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-950/95 backdrop-blur-xl z-[120] flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">ACİL TALEBİ</h2>
            <p className="text-red-200 text-sm mb-8 font-medium">Yakınınızdaki tüm kullanıcılara acil durum bildirimi gönderiliyor.</p>
            <button 
              onClick={() => setIsEmergency(false)}
              className="w-full py-4 bg-white text-red-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl"
            >
              İPTAL ET
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isAdding ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-xl"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-sky-900">Ürün Paylaş</h3>
            <button onClick={() => setIsAdding(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ürün Adı</label>
              <input 
                type="text" 
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                placeholder="Örn: Humalog KwikPen"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:border-sky-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</label>
              <select 
                value={newItem.type}
                onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:border-sky-500"
              >
                <option value="insulin">İnsülin</option>
                <option value="sensor">Sensör</option>
                <option value="strip">Strip</option>
                <option value="meter">Ölçüm Cihazı</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Açıklama</label>
              <textarea 
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                placeholder="SKT, saklama koşulları vb."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:border-sky-500 h-24 resize-none"
              />
            </div>
            <button 
              onClick={handleAddItem}
              className="w-full bg-sky-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-sky-200"
            >
              Askıya Ekle
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Malzeme ara..." 
              className="w-full bg-white border border-sky-100 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 focus:border-sky-500 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
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
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-sky-100">
                  Askıdan Al
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
