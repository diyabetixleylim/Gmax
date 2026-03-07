import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, MessageSquare, Heart, Package, ShieldCheck, AlertCircle, ChevronRight, X, Plus, User, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '../utils';
import { CommunityItem } from '../types';

const initialItems: CommunityItem[] = [
  { id: '1', type: 'insulin', title: 'Humalog KwikPen', distance: '0.45km', status: 'available', user: 'Can B.', description: 'Son kullanma tarihi 2025. Soğuk zincir korundu.' },
  { id: '2', type: 'sensor', title: 'Dexcom G6 Sensor', distance: '1.20km', status: 'available', user: 'Elif S.', description: 'Kutusu açılmamış yedek sensör.' },
  { id: '3', type: 'strip', title: 'Accu-Chek Strip', distance: '0.80km', status: 'available', user: 'Mert K.', description: '50lik paket, ihtiyacı olana verebilirim.' },
  { id: '4', type: 'insulin', title: 'Lantus SoloStar', distance: '2.10km', status: 'available', user: 'Zeynep A.', description: 'Yedek kalem, buzdolabında saklanıyor.' },
  { id: '5', type: 'meter', title: 'FreeStyle Optium Neo', distance: '3.50km', status: 'available', user: 'Burak T.', description: 'Yeni cihaza geçtiğim için boşa çıktı.' },
];

export const Community = ({ hideHeader = false, hideChat = false, initialView = 'list' }: { hideHeader?: boolean, hideChat?: boolean, initialView?: 'list' | 'chat' | 'map' | 'add' | 'emergency' }) => {
  const [items, setItems] = useState<CommunityItem[]>(initialItems);
  const [activeView, setActiveView] = useState<'list' | 'chat' | 'map' | 'add'>(initialView === 'emergency' ? 'list' : initialView);
  const [selectedItem, setSelectedItem] = useState<CommunityItem | null>(null);
  const [isEmergency, setIsEmergency] = useState(initialView === 'emergency');
  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);
  const [securityStep, setSecurityStep] = useState(0);
  
  // New Item State
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'insulin' as any,
    description: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('gmax_community_items');
    if (saved) setItems(JSON.parse(saved));

    // Mock proximity update
    const interval = setInterval(() => {
      setItems(current => current.map(item => ({
        ...item,
        distance: (parseFloat(item.distance) + (Math.random() * 0.1 - 0.05)).toFixed(2) + 'km'
      })));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
    const updated = [item, ...items];
    setItems(updated);
    localStorage.setItem('gmax_community_items', JSON.stringify(updated));
    setActiveView('list');
    setNewItem({ title: '', type: 'insulin', description: '' });
  };

  const handleRequest = (item: CommunityItem) => {
    setSelectedItem(item);
    setShowSecurityQuestions(true);
    setSecurityStep(0);
  };

  const nextSecurityStep = () => {
    if (securityStep < 2) {
      setSecurityStep(securityStep + 1);
    } else {
      setShowSecurityQuestions(false);
      setActiveView('map');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {!hideHeader && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Topluluk</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveView('add')}
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
      )}

      <div className="flex gap-2 p-1 bg-white rounded-2xl border border-sky-100 shadow-sm sticky top-0 z-20">
        <button 
          onClick={() => setActiveView('list')}
          className={cn("flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeView === 'list' ? "bg-sky-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50")}
        >
          Askıda
        </button>
        <button 
          onClick={() => setActiveView('map')}
          className={cn("flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeView === 'map' ? "bg-sky-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50")}
        >
          Harita
        </button>
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
                <button 
                  onClick={() => handleRequest(item)}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-sky-100"
                >
                  Askıdan Al
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeView === 'add' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-xl"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-sky-900">Ürün Paylaş</h3>
            <button onClick={() => setActiveView('list')} className="p-2 bg-slate-50 rounded-xl text-slate-400">
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
      )}

      {activeView === 'map' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="relative w-full h-80 bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-4 h-4 bg-sky-500 rounded-full animate-ping absolute inset-0" />
                <div className="w-4 h-4 bg-sky-500 rounded-full relative z-10 border-2 border-white" />
              </div>
              
              {/* Meeting Points */}
              <div className="absolute top-1/4 right-1/3 cursor-pointer group">
                <div className="w-6 h-6 bg-emerald-500 rounded-full relative z-10 border-2 border-white shadow-lg group-hover:scale-110 transition-transform" />
                <div className="bg-white px-2 py-1 rounded-full border border-emerald-100 shadow-sm mt-2 whitespace-nowrap">
                  <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-tighter">Beşiktaş Meydan</span>
                </div>
              </div>

              <div className="absolute bottom-1/3 left-1/4 cursor-pointer group">
                <div className="w-6 h-6 bg-emerald-500 rounded-full relative z-10 border-2 border-white shadow-lg group-hover:scale-110 transition-transform" />
                <div className="bg-white px-2 py-1 rounded-full border border-emerald-100 shadow-sm mt-2 whitespace-nowrap">
                  <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-tighter">Kadıköy İskele</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-sky-100 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <p className="text-[10px] text-slate-400 uppercase font-bold">Güvenli Buluşma Bölgesi</p>
              </div>
              <p className="text-xs text-slate-900 font-bold">Resmi Güvenlik Noktaları Seçildi</p>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <p className="text-[10px] text-emerald-700 font-bold leading-relaxed">
              Sistemimiz otomatik olarak en yakın "Güvenli Bölge"yi (Polis noktası, hastane bahçesi vb.) seçer. Lütfen bu noktaların dışına çıkmayın.
            </p>
          </div>
        </motion.div>
      )}

      {/* Security Questions Modal */}
      <AnimatePresence>
        {showSecurityQuestions && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center">
                  <ShieldAlert className="w-8 h-8 text-sky-600" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-sky-900 uppercase tracking-tight">Güvenlik Doğrulaması</h3>
                  <p className="text-xs text-slate-400 font-medium">Lütfen aşağıdaki soruları dürüstçe yanıtlayın.</p>
                </div>

                <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  {securityStep === 0 && (
                    <p className="text-sm text-slate-700 font-bold leading-relaxed">Bu ürünü ticari amaçla mı talep ediyorsunuz?</p>
                  )}
                  {securityStep === 1 && (
                    <p className="text-sm text-slate-700 font-bold leading-relaxed">Ürünün son kullanma tarihini ve saklama koşullarını kontrol edecek misiniz?</p>
                  )}
                  {securityStep === 2 && (
                    <p className="text-sm text-slate-700 font-bold leading-relaxed">Buluşma noktasına tek başınıza mı gideceksiniz? (Kalabalık yerleri tercih edin)</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <button 
                    onClick={() => setShowSecurityQuestions(false)}
                    className="py-4 bg-slate-100 text-slate-400 rounded-2xl font-bold text-xs uppercase tracking-widest"
                  >
                    Hayır
                  </button>
                  <button 
                    onClick={nextSecurityStep}
                    className="py-4 bg-sky-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-sky-200"
                  >
                    Evet
                  </button>
                </div>

                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === securityStep ? "bg-sky-600 w-4" : "bg-slate-200")} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Emergency Modal */}
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
            <h2 className="text-3xl font-black text-white mb-2">ACİL TALEBİ</h2>
            <p className="text-red-200 text-sm mb-8">Yakınınızdaki tüm kullanıcılara acil durum bildirimi gönderiliyor.</p>
            <button 
              onClick={() => setIsEmergency(false)}
              className="w-full py-4 bg-white text-red-600 rounded-2xl font-bold"
            >
              İPTAL ET
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
