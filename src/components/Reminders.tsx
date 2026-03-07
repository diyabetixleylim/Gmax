import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, Circle, Plus, Pill, Syringe, Trash2 } from 'lucide-react';
import { cn } from '../utils';
import { Reminder } from '../types';

export const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newType, setNewType] = useState<'insulin' | 'medication'>('insulin');

  useEffect(() => {
    const saved = localStorage.getItem('gmax_reminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    } else {
      const defaultReminders: Reminder[] = [
        { id: '1', type: 'insulin', name: 'Sabah Bolus', time: '08:00', dosage: '6 Ünite', completed: false },
        { id: '2', type: 'medication', name: 'Metformin', time: '09:00', dosage: '500mg', completed: false },
        { id: '3', type: 'insulin', name: 'Öğle Bolus', time: '13:00', dosage: '8 Ünite', completed: false },
      ];
      setReminders(defaultReminders);
      localStorage.setItem('gmax_reminders', JSON.stringify(defaultReminders));
    }
  }, []);

  const toggleReminder = (id: string) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    );
    setReminders(updated);
    localStorage.setItem('gmax_reminders', JSON.stringify(updated));
  };

  const addReminder = () => {
    if (newName && newTime) {
      const newR: Reminder = {
        id: Math.random().toString(36).substr(2, 9),
        type: newType,
        name: newName,
        time: newTime,
        dosage: newDosage,
        completed: false
      };
      const updated = [...reminders, newR].sort((a, b) => a.time.localeCompare(b.time));
      setReminders(updated);
      localStorage.setItem('gmax_reminders', JSON.stringify(updated));
      setIsAdding(false);
      setNewName('');
      setNewTime('');
      setNewDosage('');
    }
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('gmax_reminders', JSON.stringify(updated));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xs font-bold text-sky-700/50 uppercase tracking-widest">İlaç & İnsülin Saatleri</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-1.5 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {reminders.map((reminder) => (
            <motion.div
              key={reminder.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "bg-white border rounded-2xl p-4 flex items-center justify-between transition-all shadow-sm",
                reminder.completed ? "border-emerald-100 opacity-60" : "border-sky-100 shadow-md shadow-sky-100/50"
              )}
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleReminder(reminder.id)}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                    reminder.completed ? "bg-emerald-500 text-white" : "bg-sky-50 text-sky-300"
                  )}
                >
                  {reminder.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    {reminder.type === 'insulin' ? (
                      <Syringe className="w-3 h-3 text-sky-500" />
                    ) : (
                      <Pill className="w-3 h-3 text-emerald-500" />
                    )}
                    <h4 className={cn("text-sm font-bold", reminder.completed ? "text-slate-400 line-through" : "text-slate-900")}>
                      {reminder.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-300" />
                    <span className="text-[10px] text-slate-400 font-medium">{reminder.time} • {reminder.dosage}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteReminder(reminder.id)}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end justify-center">
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-white w-full max-w-md rounded-t-[40px] p-8 space-y-6 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-sky-900">Yeni Hatırlatıcı</h3>
              <button onClick={() => setIsAdding(false)} className="p-2 bg-slate-100 rounded-full">
                <Plus className="w-5 h-5 text-slate-400 rotate-45" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                <button 
                  onClick={() => setNewType('insulin')}
                  className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", newType === 'insulin' ? "bg-white text-sky-600 shadow-sm" : "text-slate-400")}
                >
                  İnsülin
                </button>
                <button 
                  onClick={() => setNewType('medication')}
                  className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", newType === 'medication' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400")}
                >
                  İlaç
                </button>
              </div>

              <input 
                type="text" 
                placeholder="Hatırlatıcı Adı (örn: Sabah Bolus)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:border-sky-500"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="time" 
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:border-sky-500"
                />
                <input 
                  type="text" 
                  placeholder="Doz (örn: 6 Ünite)"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <button 
                onClick={addReminder}
                className="w-full bg-sky-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-sky-200"
              >
                Hatırlatıcıyı Kaydet
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
