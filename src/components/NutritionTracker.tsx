import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Utensils, Calculator, Sparkles, X, ChevronRight, Activity, Info } from 'lucide-react';
import { cn } from '../utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FoodEntry } from '../types';

const commonFoods = [
  // Tahıllar & Ekmek
  { name: 'Beyaz Ekmek', kh: 15, unit: 'dilim', category: 'Tahıl' },
  { name: 'Tam Buğday Ekmeği', kh: 12, unit: 'dilim', category: 'Tahıl' },
  { name: 'Pirinç Pilavı', kh: 45, unit: 'porsiyon', category: 'Tahıl' },
  { name: 'Bulgur Pilavı', kh: 35, unit: 'porsiyon', category: 'Tahıl' },
  { name: 'Makarna', kh: 50, unit: 'porsiyon', category: 'Tahıl' },
  { name: 'Simit', kh: 45, unit: 'adet', category: 'Tahıl' },
  { name: 'Poğaça', kh: 30, unit: 'adet', category: 'Tahıl' },
  { name: 'Lavaş', kh: 25, unit: 'adet', category: 'Tahıl' },
  
  // Meyveler
  { name: 'Elma (Orta Boy)', kh: 15, unit: 'adet', category: 'Meyve' },
  { name: 'Muz', kh: 20, unit: 'adet', category: 'Meyve' },
  { name: 'Portakal', kh: 15, unit: 'adet', category: 'Meyve' },
  { name: 'Karpuz', kh: 15, unit: 'dilim', category: 'Meyve' },
  { name: 'Üzüm', kh: 15, unit: '15 adet', category: 'Meyve' },
  { name: 'Çilek', kh: 10, unit: '10 adet', category: 'Meyve' },
  
  // Süt Ürünleri
  { name: 'Süt', kh: 12, unit: 'su bardağı', category: 'Süt' },
  { name: 'Yoğurt', kh: 12, unit: 'kase', category: 'Süt' },
  { name: 'Ayran', kh: 5, unit: 'su bardağı', category: 'Süt' },
  { name: 'Kefir', kh: 10, unit: 'su bardağı', category: 'Süt' },
  
  // Fast Food
  { name: 'Hamburger', kh: 40, unit: 'adet', category: 'Fast Food' },
  { name: 'Cheeseburger', kh: 45, unit: 'adet', category: 'Fast Food' },
  { name: 'Patates Kızartması (Orta)', kh: 45, unit: 'porsiyon', category: 'Fast Food' },
  { name: 'Pizza (Orta Dilim)', kh: 25, unit: 'dilim', category: 'Fast Food' },
  { name: 'Lahmacun', kh: 35, unit: 'adet', category: 'Fast Food' },
  { name: 'Döner Dürüm', kh: 50, unit: 'adet', category: 'Fast Food' },
  { name: 'Nugget (6 Adet)', kh: 15, unit: 'porsiyon', category: 'Fast Food' },
  
  // İçecekler
  { name: 'Kola (Normal)', kh: 35, unit: 'kutu', category: 'İçecek' },
  { name: 'Kola (Zero/Diet)', kh: 0, unit: 'kutu', category: 'İçecek' },
  { name: 'Meyve Suyu', kh: 30, unit: 'su bardağı', category: 'İçecek' },
  { name: 'Limonata', kh: 25, unit: 'su bardağı', category: 'İçecek' },
  { name: 'Soğuk Çay (Ice Tea)', kh: 25, unit: 'kutu', category: 'İçecek' },
  { name: 'Enerji İçeceği', kh: 30, unit: 'kutu', category: 'İçecek' },
  
  // Alkol
  { name: 'Bira (50cl)', kh: 15, unit: 'şişe', category: 'Alkol' },
  { name: 'Şarap (Kırmızı/Beyaz)', kh: 5, unit: 'kadeh', category: 'Alkol' },
  { name: 'Rakı (Tek)', kh: 0, unit: 'kadeh', category: 'Alkol' },
  { name: 'Viski/Votka/Cin', kh: 0, unit: 'kadeh', category: 'Alkol' },
  { name: 'Kokteyl (Şekerli)', kh: 30, unit: 'kadeh', category: 'Alkol' },
  
  // Tatlılar
  { name: 'Baklava', kh: 20, unit: 'dilim', category: 'Tatlı' },
  { name: 'Sütlü Tatlı', kh: 40, unit: 'porsiyon', category: 'Tatlı' },
  { name: 'Çikolata (Sütlü)', kh: 30, unit: 'paket', category: 'Tatlı' },
  { name: 'Dondurma', kh: 15, unit: 'top', category: 'Tatlı' },
];

export const NutritionTracker = () => {
  const [search, setSearch] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const [history, setHistory] = useState<FoodEntry[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Insulin Calculator State
  const [currentBG, setCurrentBG] = useState('150');
  const [targetBG, setTargetBG] = useState('100');
  const [isf, setIsf] = useState('50'); // Insulin Sensitivity Factor
  const [carbRatio, setCarbRatio] = useState('10'); // Carb Ratio (1 unit for X grams)

  useEffect(() => {
    const saved = localStorage.getItem('gmax_food_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const totalKH = selectedFoods.reduce((sum, food) => sum + food.kh, 0);

  const addFood = (food: any) => {
    setSelectedFoods([...selectedFoods, { ...food, id: Date.now() }]);
  };

  const removeFood = (id: number) => {
    setSelectedFoods(selectedFoods.filter(f => f.id !== id));
  };

  const saveMeal = () => {
    const newEntries: FoodEntry[] = selectedFoods.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      kh: f.kh,
      timestamp: new Date().toISOString()
    }));
    const updatedHistory = [...history, ...newEntries];
    setHistory(updatedHistory);
    localStorage.setItem('gmax_food_history', JSON.stringify(updatedHistory));
    setSelectedFoods([]);
  };

  const calculateInsulin = () => {
    const bgCorrection = (Number(currentBG) - Number(targetBG)) / Number(isf);
    const carbInsulin = totalKH / Number(carbRatio);
    return Math.max(0, bgCorrection + carbInsulin).toFixed(1);
  };

  const filteredFoods = commonFoods.filter(f => {
    const searchTerm = search.toLocaleLowerCase('tr-TR');
    return f.name.toLocaleLowerCase('tr-TR').includes(searchTerm) || 
           f.category.toLocaleLowerCase('tr-TR').includes(searchTerm);
  }).slice(0, 15);

  const chartData = history.reduce((acc: any[], entry) => {
    const hour = new Date(entry.timestamp).getHours();
    const existing = acc.find(a => a.hour === hour);
    if (existing) {
      existing.kh += entry.kh;
    } else {
      acc.push({ hour, kh: entry.kh });
    }
    return acc;
  }, []).sort((a, b) => a.hour - b.hour);

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center">
        <h2 className="text-2xl font-black text-sky-900 tracking-tight">Beslenme & KH</h2>
        <p className="text-sky-700/60 text-sm">Besinlerini takip et, insülinini hesapla.</p>
      </div>

      {/* Calculator Display */}
      <div className="bg-white border-4 border-sky-100 rounded-[40px] p-8 shadow-2xl shadow-sky-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <Calculator className="w-8 h-8 text-sky-100" />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] text-sky-700/50 uppercase font-black tracking-[0.2em] mb-2">Öğün Karbonhidratı</p>
          <div className="flex items-end gap-2">
            <span className="text-6xl font-black text-sky-900 tracking-tighter">{totalKH}</span>
            <span className="text-sky-600 font-bold mb-2">gram</span>
          </div>
          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => setShowCalculator(true)}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-200"
            >
              <Activity className="w-4 h-4" />
              İnsülin Hesapla
            </button>
            {totalKH > 0 && (
              <button 
                onClick={saveMeal}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-emerald-200"
              >
                Kaydet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Daily Chart */}
      {history.length > 0 && (
        <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Günlük KH Dağılımı</h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} tickFormatter={(h) => `${h}:00`} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="kh" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Search and Selection */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Besin ara... (örn: Ekmek)"
            className="w-full bg-white border border-sky-100 rounded-2xl py-4 pl-12 pr-4 text-sm shadow-sm focus:border-sky-500 outline-none transition-all"
          />
        </div>

        {search && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-lg z-20 relative"
          >
            {filteredFoods.map((food) => (
              <button
                key={food.name}
                onClick={() => {
                  addFood(food);
                  setSearch('');
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-sky-50 border-b border-sky-50 last:border-none transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">{food.name}</p>
                  <p className="text-[10px] text-slate-400">{food.category} • 1 {food.unit}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-sky-600">{food.kh}g</span>
                  <Plus className="w-4 h-4 text-sky-400" />
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Selected Foods List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Öğün Listesi</h3>
          {selectedFoods.length > 0 && (
            <button 
              onClick={() => setSelectedFoods([])}
              className="text-[10px] font-bold text-red-500 uppercase tracking-widest"
            >
              Temizle
            </button>
          )}
        </div>
        
        <AnimatePresence mode="popLayout">
          {selectedFoods.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Utensils className="w-8 h-8 text-slate-200" />
              </div>
              <p className="text-slate-400 text-xs font-medium">Henüz besin eklenmedi.<br/>Yukarıdan arama yaparak başlayabilirsin.</p>
            </motion.div>
          ) : (
            selectedFoods.map((food) => (
              <motion.div
                key={food.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white border border-sky-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{food.name}</h4>
                    <p className="text-[10px] text-slate-400">1 {food.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-sky-900">{food.kh}g</span>
                  <button 
                    onClick={() => removeFood(food.id)}
                    className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Insulin Calculator Modal */}
      <AnimatePresence>
        {showCalculator && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCalculator(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-sky-900 uppercase tracking-tight">İnsülin Dozu</h3>
                <button onClick={() => setShowCalculator(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mevcut Şeker</label>
                    <input 
                      type="number" 
                      value={currentBG}
                      onChange={(e) => setCurrentBG(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-lg font-black text-sky-900 outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hedef Şeker</label>
                    <input 
                      type="number" 
                      value={targetBG}
                      onChange={(e) => setTargetBG(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-lg font-black text-sky-900 outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duyarlılık (ISF)</label>
                      <div className="group relative">
                        <Info className="w-3 h-3 text-slate-300" />
                        <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-slate-900 text-[10px] text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          1 ünite insülinin şekerinizi kaç mg/dL düşürdüğünü gösterir.
                        </div>
                      </div>
                    </div>
                    <input 
                      type="number" 
                      value={isf}
                      onChange={(e) => setIsf(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-lg font-black text-sky-900 outline-none focus:border-sky-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">KH Oranı (CR)</label>
                      <div className="group relative">
                        <Info className="w-3 h-3 text-slate-300" />
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 text-[10px] text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          1 ünite insülinin kaç gram karbonhidratı karşıladığını gösterir.
                        </div>
                      </div>
                    </div>
                    <input 
                      type="number" 
                      value={carbRatio}
                      onChange={(e) => setCarbRatio(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-lg font-black text-sky-900 outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="bg-sky-50 rounded-3xl p-8 text-center border border-sky-100">
                  <p className="text-[10px] text-sky-600 font-bold uppercase tracking-[0.2em] mb-2">Önerilen Doz</p>
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-6xl font-black text-sky-900 tracking-tighter">{calculateInsulin()}</span>
                    <span className="text-sky-600 font-bold mb-2">Ünite</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowCalculator(false)}
                  className="w-full bg-sky-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-sky-200"
                >
                  Dozu Onayla
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
