import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Plus, Calculator, Zap, Activity, Info, ChevronRight, X, History } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { cn } from '../utils';

const chartData = [
  { time: '08:00', insulin: 4, food: 30 },
  { time: '10:00', insulin: 0, food: 0 },
  { time: '12:00', insulin: 6, food: 50 },
  { time: '14:00', insulin: 0, food: 15 },
  { time: '16:00', insulin: 2, food: 0 },
  { time: '18:00', insulin: 8, food: 65 },
  { time: '20:00', insulin: 0, food: 0 },
];

export const FoodEntry = () => {
  const [kh, setKh] = useState('');
  const [fat, setFat] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gmax_food');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleAdd = () => {
    if (kh) {
      const newEntry = {
        id: Date.now(),
        kh: parseInt(kh),
        fat: parseInt(fat || '0'),
        date: new Date().toISOString()
      };
      const newHistory = [newEntry, ...history];
      setHistory(newHistory);
      localStorage.setItem('gmax_food', JSON.stringify(newHistory));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
      setKh('');
      setFat('');
    }
  };

  const getExerciseSuggestion = () => {
    const fatNum = parseFloat(fat);
    if (isNaN(fatNum)) return null;
    if (fatNum > 20) return "Yüksek yağlı bir öğün! İnsülin etkisini geciktirebilir. 30 dakika orta tempo yürüyüş önerilir.";
    if (fatNum > 10) return "Orta yağlı bir öğün. 15 dakika hafif egzersiz iyi gelebilir.";
    return "Düşük yağlı bir öğün. Standart aktiviteniz yeterli olacaktır.";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-sky-900 tracking-tight">KH Sayımı</h2>
        <p className="text-sky-700/60 text-sm">Öğününü kaydet ve insülin dozunu yönet.</p>
      </div>

      <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-xl shadow-sky-200/50">
        <div className="flex gap-4">
          <button className="flex-1 bg-sky-50 border border-sky-100 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-sky-100 transition-colors shadow-sm">
            <Camera className="w-6 h-6 text-sky-500" />
            <span className="text-[10px] text-sky-600 font-bold uppercase">Fotoğraf Çek</span>
          </button>
          <button className="flex-1 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-emerald-100 transition-colors shadow-sm">
            <Calculator className="w-6 h-6 text-emerald-500" />
            <span className="text-[10px] text-emerald-600 font-bold uppercase">Manuel Giriş</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">g</span>
            <input 
              type="number" 
              value={kh}
              onChange={(e) => setKh(e.target.value)}
              placeholder="Karbonhidrat (KH)" 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 text-sm text-slate-900 focus:border-sky-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">g</span>
            <input 
              type="number" 
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              placeholder="Yağ Oranı" 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 text-sm text-slate-900 focus:border-sky-500 outline-none transition-all"
            />
          </div>
        </div>

        {fat && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex gap-3 shadow-sm"
          >
            <Activity className="w-5 h-5 text-sky-500 shrink-0" />
            <p className="text-[10px] text-sky-700 font-medium leading-relaxed">{getExerciseSuggestion()}</p>
          </motion.div>
        )}

        <button 
          onClick={handleAdd}
          disabled={!kh}
          className={cn(
            "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
            isAdded ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-sky-600 text-white disabled:bg-slate-200 disabled:text-slate-400 shadow-sky-200"
          )}
        >
          {isAdded ? <Plus className="w-4 h-4 animate-bounce" /> : <Plus className="w-4 h-4" />}
          {isAdded ? "Öğün Eklendi!" : "Öğünü Ekle"}
        </button>
      </div>

      <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-4 shadow-xl shadow-sky-200/50">
        <h3 className="text-xs text-slate-400 font-bold uppercase tracking-widest">Günlük İnsülin & KH Grafiği</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorInsulin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
              <Area type="monotone" dataKey="insulin" stroke="#0ea5e9" strokeOpacity={0.6} fillOpacity={1} fill="url(#colorInsulin)" name="İnsülin (u)" />
              <Area type="monotone" dataKey="food" stroke="#10b981" strokeOpacity={0.6} fillOpacity={1} fill="url(#colorFood)" name="KH (g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
