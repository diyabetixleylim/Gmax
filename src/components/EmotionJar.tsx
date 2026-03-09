import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Sparkles, History, Calendar, BarChart2 } from 'lucide-react';
import { GubiCharacter } from './GubiCharacter';
import { cn } from '../utils';
import { EmotionEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const emotions = [
  { name: 'Neşe', color: '#fbbf24', icon: '✨', description: 'Joy' },
  { name: 'Üzüntü', color: '#3b82f6', icon: '💧', description: 'Sadness' },
  { name: 'Öfke', color: '#ef4444', icon: '🔥', description: 'Anger' },
  { name: 'Korku', color: '#a855f7', icon: '⚡', description: 'Fear' },
  { name: 'Tiksinti', color: '#22c55e', icon: '🥦', description: 'Disgust' },
  { name: 'Kaygı', color: '#f97316', icon: '🌀', description: 'Anxiety' },
  { name: 'Gıpta', color: '#14b8a6', icon: '💎', description: 'Envy' },
  { name: 'Bıkkınlık', color: '#6366f1', icon: '📱', description: 'Ennui' },
  { name: 'Utanç', color: '#ec4899', icon: '😳', description: 'Embarrassment' },
];

export const EmotionJar = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [history, setHistory] = useState<EmotionEntry[]>([]);
  const [view, setView] = useState<'jar' | 'stats'>('jar');
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');

  useEffect(() => {
    const saved = localStorage.getItem('gmax_emotions');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSubmit = () => {
    if (selectedEmotion && note) {
      const newEntry: EmotionEntry = {
        id: Math.random().toString(36).substr(2, 9),
        emotion: selectedEmotion,
        note,
        date: new Date().toISOString(),
        color: emotions.find(e => e.name === selectedEmotion)?.color || '#ccc'
      };
      const newHistory = [newEntry, ...history];
      setHistory(newHistory);
      localStorage.setItem('gmax_emotions', JSON.stringify(newHistory));
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedEmotion(null);
        setNote('');
      }, 3000);
    }
  };

  const getStatsData = () => {
    const counts: Record<string, number> = {};
    emotions.forEach(e => counts[e.name] = 0);
    
    history.forEach(entry => {
      if (counts[entry.emotion] !== undefined) {
        counts[entry.emotion]++;
      }
    });

    return emotions.map(e => ({
      name: e.name,
      count: counts[e.name],
      color: e.color
    }));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-sky-900 tracking-tight italic">Duygu Kavanozu</h2>
        <div className="flex bg-white rounded-xl border border-sky-100 p-1 shadow-sm">
          <button 
            onClick={() => setView('jar')}
            className={cn("p-2 rounded-lg transition-all", view === 'jar' ? "bg-sky-50 text-sky-600" : "text-slate-400")}
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView('stats')}
            className={cn("p-2 rounded-lg transition-all", view === 'stats' ? "bg-sky-50 text-sky-600" : "text-slate-400")}
          >
            <BarChart2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === 'jar' ? (
        <div className="space-y-6">
          {/* The Realistic Jar Visual */}
          <div className="relative w-full aspect-[3/4] max-w-[320px] mx-auto">
            {/* Jar Body */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-md rounded-[80px] border-[12px] border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_40px_rgba(255,255,255,0.5)] overflow-hidden flex items-end p-6">
              
              {/* Glass Reflections */}
              <div className="absolute top-10 left-10 w-6 h-32 bg-white/30 blur-md rounded-full -rotate-12" />
              <div className="absolute bottom-20 right-10 w-4 h-20 bg-white/20 blur-sm rounded-full rotate-6" />
              
              {/* Liquid/Glow at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-sky-200/20 to-transparent" />

              {/* Falling Orbs Container */}
              <div className="relative w-full h-full flex flex-wrap-reverse content-start gap-2 justify-center pb-4">
                <AnimatePresence>
                  {history.slice(0, 30).reverse().map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ y: -600, opacity: 0, scale: 0.5 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ 
                        type: 'spring', 
                        damping: 12, 
                        stiffness: 80,
                        delay: idx * 0.03 
                      }}
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] border-2 border-white/40 relative group"
                      style={{ 
                        backgroundColor: entry.color,
                        boxShadow: `0 0 20px ${entry.color}44, inset 0 0 10px rgba(255,255,255,0.5)`
                      }}
                    >
                      <span className="relative z-10">{emotions.find(e => e.name === entry.emotion)?.icon}</span>
                      {/* Inner Glow */}
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-[2px]" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Jar Lid - Realistic */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2/3 h-12 z-20">
              <div className="w-full h-full bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-t-3xl border-x-8 border-t-8 border-white shadow-lg" />
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-300/50" />
            </div>
            
            {/* Jar Neck */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-white/60 backdrop-blur-sm border-x-8 border-white z-10" />
          </div>

          {!isSubmitted ? (
            <div className="bg-white border border-sky-100 rounded-[40px] p-8 space-y-8 shadow-2xl shadow-sky-200/30">
              <div className="grid grid-cols-3 gap-4">
                {emotions.map((e) => (
                  <button
                    key={e.name}
                    onClick={() => setSelectedEmotion(e.name)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-3xl transition-all duration-300",
                      selectedEmotion === e.name 
                        ? 'bg-slate-50 scale-110 shadow-inner' 
                        : 'hover:bg-slate-50/50'
                    )}
                  >
                    <div 
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition-transform",
                        selectedEmotion === e.name ? "scale-110" : "opacity-60"
                      )}
                      style={{ 
                        backgroundColor: e.color,
                        boxShadow: selectedEmotion === e.name ? `0 10px 20px ${e.color}44` : 'none'
                      }}
                    >
                      {e.icon}
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest transition-colors",
                      selectedEmotion === e.name ? "text-slate-900" : "text-slate-400"
                    )}>
                      {e.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Neler hissediyorsun? Buraya yaz..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 text-sm text-slate-900 focus:border-sky-500 focus:bg-white outline-none h-32 resize-none transition-all shadow-inner"
                />
                <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  {note.length} karakter
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selectedEmotion || !note}
                className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-100 disabled:text-slate-300 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-sky-200"
              >
                <Send className="w-4 h-4" />
                Kavanoza Gönder
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border-2 border-emerald-100 rounded-[32px] p-8 flex items-center gap-6 shadow-xl shadow-emerald-100/50"
            >
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <GubiCharacter size="sm" mood="witty" />
              </div>
              <div>
                <h4 className="text-emerald-900 font-black text-sm uppercase tracking-tight">Gubi Diyor ki:</h4>
                <p className="text-emerald-700 text-xs italic mt-1 leading-relaxed">"Duygun kavanoza düştü! Şimdi derin bir nefes al ve anın tadını çıkar."</p>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-xl shadow-sky-200/50 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-sky-900 uppercase tracking-widest">Duygu Analizi</h3>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="bg-sky-50 border-none text-sky-600 text-[10px] font-bold uppercase rounded-lg px-2 py-1 outline-none"
              >
                <option value="day">Günlük</option>
                <option value="week">Haftalık</option>
                <option value="month">Aylık</option>
                <option value="year">Yıllık</option>
              </select>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getStatsData()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="#94a3b8" />
                  <YAxis axisLine={false} tickLine={false} fontSize={10} stroke="#94a3b8" />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                    {getStatsData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Son Kayıtlar</h3>
            {history.slice(0, 5).map((entry) => (
              <div key={entry.id} className="bg-white border border-sky-100 rounded-2xl p-4 flex gap-4 shadow-sm">
                <div 
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-xl shadow-inner"
                  style={{ backgroundColor: entry.color }}
                >
                  {emotions.find(e => e.name === entry.emotion)?.icon}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{entry.emotion}</h4>
                    <span className="text-[10px] text-slate-400">{new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
