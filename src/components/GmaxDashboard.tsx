import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ChevronRight, 
  Bell, 
  Heart, 
  Droplets,
  TrendingUp,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  X
} from 'lucide-react';
import { GlucoseChart } from './GlucoseChart';
import { GubiCharacter } from './GubiCharacter';
import { cn } from '../utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const GmaxDashboard = () => {
  const [glucose, setGlucose] = useState(112);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [chartType, setChartType] = useState<'line' | 'circular'>('line');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlucose(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        if (next > prev) setTrend('up');
        else if (next < prev) setTrend('down');
        else setTrend('stable');
        return next > 40 && next < 300 ? next : prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getGubiMessage = () => {
    if (glucose < 70) return "Eyvah! Şekerin düşüyor, hemen bir meyve suyu içmeye ne dersin? 🧃";
    if (glucose > 180) return "Hoppala! Şekerin biraz yükselmiş, hadi gel beraber 10 dakika yürüyelim! 🚶‍♂️";
    return "Harikasın! Şekerin tam istediğimiz gibi, böyle devam et! 🌟";
  };

  const getGlucoseColor = (val: number) => {
    if (val < 70) return "#ef4444"; // Low Red
    if (val < 90) return "#f59e0b"; // Low Yellow
    if (val <= 160) return "#10b981"; // Target Green
    if (val <= 240) return "#f59e0b"; // High Yellow
    return "#ef4444"; // High Red
  };

  const pieData = [
    { name: 'Current', value: glucose },
    { name: 'Remaining', value: Math.max(0, 300 - glucose) }
  ];

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <div className="space-y-8 relative">
      {/* Notification Preview */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-4 right-4 z-[100] bg-white/90 backdrop-blur-xl border border-sky-100 rounded-3xl p-4 shadow-2xl flex items-center gap-4 max-w-md mx-auto"
          >
            <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-200">
              <GubiCharacter size="sm" mood="happy" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Gmax Bildirimi</span>
                <span className="text-[8px] text-slate-400 font-bold">ŞİMDİ</span>
              </div>
              <p className="text-xs text-slate-900 font-bold leading-tight">{getGubiMessage()}</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="p-1 text-slate-300">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Status Card */}
      <div className="bg-white border-4 border-sky-100 rounded-[40px] p-8 shadow-2xl shadow-sky-200/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setChartType(prev => prev === 'line' ? 'circular' : 'line');
            }}
            className="p-3 bg-sky-50 rounded-2xl text-sky-600 hover:bg-sky-100 transition-all shadow-sm active:scale-95"
          >
            {chartType === 'line' ? <PieChartIcon className="w-5 h-5" /> : <LineChartIcon className="w-5 h-5" />}
          </button>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-sky-500" />
            <span className="text-[10px] text-sky-700/50 uppercase font-black tracking-[0.2em]">Anlık Glikoz</span>
          </div>
          
          <div className="flex items-end gap-3 mb-8">
            <motion.span 
              key={glucose}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-7xl font-black tracking-tighter transition-colors duration-500"
              style={{ color: getGlucoseColor(glucose) }}
            >
              {glucose}
            </motion.span>
            <div className="mb-3">
              <span className="text-sky-600 font-bold block text-sm">mg/dL</span>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                trend === 'up' ? "text-amber-500" : trend === 'down' ? "text-emerald-500" : "text-sky-400"
              )}>
                <TrendingUp className={cn("w-3 h-3", trend === 'down' && "rotate-180")} />
                {trend === 'up' ? 'Yükseliyor' : trend === 'down' ? 'Düşüyor' : 'Stabil'}
              </div>
            </div>
          </div>

          <div className="h-64 min-h-[256px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {chartType === 'line' ? (
                <motion.div 
                  key="line"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full w-full"
                >
                  <GlucoseChart />
                </motion.div>
              ) : (
                <motion.div 
                  key="circular"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full w-full flex items-center justify-center relative"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={200} height={200}>
                      {/* Background Gauge with Zones */}
                      <Pie
                        data={[
                          { value: 70, color: '#ef4444' }, // Low Red
                          { value: 20, color: '#f59e0b' }, // Low Yellow
                          { value: 70, color: '#10b981' }, // Target Green
                          { value: 80, color: '#f59e0b' }, // High Yellow
                          { value: 60, color: '#ef4444' }, // High Red
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={85}
                        startAngle={225}
                        endAngle={-45}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        { [0,1,2,3,4].map((i) => (
                          <Cell key={i} fill={[ '#ef4444', '#f59e0b', '#10b981', '#f59e0b', '#ef4444' ][i]} opacity={0.2} />
                        ))}
                      </Pie>
                      
                      {/* Active Value Arc */}
                      <Pie
                        data={[
                          { value: glucose },
                          { value: 300 - glucose }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        startAngle={225}
                        endAngle={-45}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell 
                          fill={getGlucoseColor(glucose)} 
                          style={{ 
                            transition: 'fill 0.5s ease',
                            filter: `drop-shadow(0 0 8px ${getGlucoseColor(glucose)}44)`
                          }}
                        />
                        <Cell fill="transparent" />
                      </Pie>

                      {/* Needle Indicator */}
                      <Pie
                        data={[
                          { value: 1 },
                          { value: 299 }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        startAngle={225 - (glucose / 300) * 270}
                        endAngle={225 - (glucose / 300) * 270 - 2}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="#1e293b" />
                        <Cell fill="transparent" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                    <span 
                      className="text-5xl font-black tracking-tighter transition-colors duration-500"
                      style={{ color: getGlucoseColor(glucose) }}
                    >
                      {glucose}
                    </span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">mg/dL</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Duolingo Style Gubi Prediction */}
      <div className="relative pt-12">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <GubiCharacter size="md" mood={glucose > 180 ? 'worried' : glucose < 70 ? 'worried' : 'happy'} />
        </div>
        <div className="bg-sky-600 rounded-[40px] p-8 pt-16 text-white shadow-xl shadow-sky-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Zap className="w-12 h-12" />
          </div>
          <div className="relative z-10 text-center space-y-4">
            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/20">
              <span className="text-[10px] font-black uppercase tracking-widest">Gubi'nin Tahmini</span>
            </div>
            <p className="text-lg font-bold leading-snug italic">
              "{getGubiMessage()}"
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <button 
                onClick={triggerNotification}
                className="bg-white text-sky-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-sky-50 transition-all"
              >
                Bildirimi Test Et
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-sky-100 rounded-[32px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Metabolizma</span>
          </div>
          <p className="text-2xl font-black text-sky-900 tracking-tight">
            {trend === 'stable' ? 'Dengeli' : 'Hızlı'}
          </p>
          <p className={cn(
            "text-[10px] font-bold mt-1",
            trend === 'stable' ? "text-sky-400" : "text-emerald-500"
          )}>
            {trend === 'stable' ? 'Normal Yakım' : 'Aktif Yakım'}
          </p>
        </div>
        <div className="bg-white border border-sky-100 rounded-[32px] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Duygu</span>
          </div>
          <p className="text-2xl font-black text-sky-900 tracking-tight">
            {glucose > 180 ? 'Huzursuz' : glucose < 70 ? 'Yorgun' : 'Mutlu'}
          </p>
          <p className={cn(
            "text-[10px] font-bold mt-1",
            glucose > 180 || glucose < 70 ? "text-amber-500" : "text-sky-400"
          )}>
            {glucose > 180 ? 'Yüksek Şeker' : glucose < 70 ? 'Düşük Enerji' : 'Dengeli'}
          </p>
        </div>
      </div>
    </div>
  );
};
