import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../utils';

export const MedicationAlarm = () => {
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [snoozeTime, setSnoozeTime] = useState<number | null>(null);

  // Simulate an alarm triggering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlarmActive(true);
    }, 15000); // Trigger after 15 seconds for demo
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (snoozeTime) {
      const timer = setTimeout(() => {
        setIsAlarmActive(true);
        setSnoozeTime(null);
      }, 10000); // 10 seconds for demo (user asked for 10 min)
      return () => clearTimeout(timer);
    }
  }, [snoozeTime]);

  const handleTookIt = () => {
    setIsAlarmActive(false);
    setSnoozeTime(null);
  };

  const handleSnooze = () => {
    setIsAlarmActive(false);
    setSnoozeTime(Date.now() + 600000); // 10 minutes
  };

  return (
    <AnimatePresence>
      {isAlarmActive && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl text-center space-y-8"
          >
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-sky-100 rounded-full animate-ping" />
              <div className="relative w-full h-full bg-sky-600 rounded-full flex items-center justify-center text-white shadow-xl">
                <Bell className="w-10 h-10 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-sky-900 uppercase tracking-tight">İlaç Vakti!</h2>
              <p className="text-sm text-slate-500 font-medium">Humalog (Bolus) dozunu alma zamanın geldi.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              <button 
                onClick={handleTookIt}
                className="w-full bg-emerald-500 text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                İlacı Aldım
              </button>
              <button 
                onClick={handleSnooze}
                className="w-full bg-slate-100 text-slate-600 py-5 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <Clock className="w-5 h-5" />
                10 Dakika Ertele
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <AlertCircle className="w-3 h-3" />
              Geciktirmek şekerinizi etkileyebilir
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
