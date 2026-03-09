import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ShieldCheck, AlertTriangle, Settings, ChevronRight, LogOut, CreditCard, UserCheck, Save, Plus, Trash2, Download, Calendar } from 'lucide-react';
import { UserProfile } from '../types';
import { cn } from '../utils';

export const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Can Bedük',
    tcNo: '12345678901',
    allergies: 'Fıstık, Süt Ürünleri',
    birthDate: '1995-05-15',
    weight: '78kg'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [medications, setMedications] = useState([
    { id: 1, name: 'Lantus (Bazal)', expiry: '2026-06-12', quantity: '3 Kalem' },
    { id: 2, name: 'Humalog (Bolus)', expiry: '2026-08-15', quantity: '5 Kalem' }
  ]);
  const [appointments, setAppointments] = useState([
    { id: 1, title: 'Doktor Kontrolü', date: '2026-04-15' }
  ]);
  const [isAddingMed, setIsAddingMed] = useState(false);
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', expiry: '', quantity: '' });
  const [newApp, setNewApp] = useState({ title: '', date: '' });

  useEffect(() => {
    const saved = localStorage.getItem('gmax_profile');
    if (saved) setProfile(JSON.parse(saved));
    const savedMeds = localStorage.getItem('gmax_meds');
    if (savedMeds) setMedications(JSON.parse(savedMeds));
    const savedApps = localStorage.getItem('gmax_apps');
    if (savedApps) setAppointments(JSON.parse(savedApps));
  }, []);

  const handleSave = () => {
    localStorage.setItem('gmax_profile', JSON.stringify(profile));
    localStorage.setItem('gmax_meds', JSON.stringify(medications));
    localStorage.setItem('gmax_apps', JSON.stringify(appointments));
    setIsEditing(false);
  };

  const addMedication = () => {
    if (newMed.name && newMed.expiry && newMed.quantity) {
      const newMeds = [...medications, { id: Date.now(), ...newMed }];
      setMedications(newMeds);
      localStorage.setItem('gmax_meds', JSON.stringify(newMeds));
      setNewMed({ name: '', expiry: '', quantity: '' });
      setIsAddingMed(false);
    }
  };

  const addAppointment = () => {
    if (newApp.title && newApp.date) {
      const newApps = [...appointments, { id: Date.now(), ...newApp }];
      setAppointments(newApps);
      localStorage.setItem('gmax_apps', JSON.stringify(newApps));
      setNewApp({ title: '', date: '' });
      setIsAddingApp(false);
    }
  };

  const downloadPDF = () => {
    const content = `GMAX SAĞLIK RAPORU\n\nAd Soyad: ${profile.fullName}\nAlerjiler: ${profile.allergies}\nKilo: ${profile.weight}\n\nİlaçlar:\n${medications.map(m => `- ${m.name} (SKT: ${m.expiry}, Miktar: ${m.quantity})`).join('\n')}\n\nRandevular:\n${appointments.map(a => `- ${a.title} (${a.date})`).join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gmax_Saglik_Raporu_${profile.fullName.replace(' ', '_')}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center py-6">
        <div className="relative w-24 h-24 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full p-1 mb-4 shadow-xl shadow-sky-200">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border border-sky-100">
            <User className="w-12 h-12 text-sky-400" />
          </div>
          <div className="absolute bottom-0 right-0 bg-emerald-500 p-1.5 rounded-full border-4 border-white shadow-sm">
            <UserCheck className="w-3 h-3 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{profile.fullName}</h2>
        <p className="text-xs text-sky-600 font-bold uppercase tracking-widest mt-1">Tip 1 Diyabetli</p>
        
        <button 
          onClick={downloadPDF}
          className="mt-4 flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-sky-100 hover:bg-sky-100 transition-all"
        >
          <Download className="w-3 h-3" />
          Sağlık Raporu İndir
        </button>
      </div>

      <div className="space-y-4">
        {/* Personal Info */}
        <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-xl shadow-sky-200/50">
          <div className="flex items-center justify-between pb-4 border-b border-sky-50">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              <h3 className="text-sm font-bold text-sky-900">Kişisel Bilgiler</h3>
            </div>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="text-sky-600 text-xs font-bold flex items-center gap-1 hover:text-sky-700 transition-colors"
            >
              {isEditing ? <Save className="w-3 h-3" /> : null}
              {isEditing ? 'Kaydet' : 'Düzenle'}
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Ad Soyad', value: profile.fullName, key: 'fullName' },
              { label: 'T.C. Kimlik', value: profile.tcNo, key: 'tcNo' },
              { label: 'Doğum Tarihi', value: profile.birthDate, key: 'birthDate' },
              { label: 'Kilo', value: profile.weight, key: 'weight' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold uppercase">{item.label}</span>
                {isEditing ? (
                  <input 
                    type="text"
                    value={item.value}
                    onChange={(e) => setProfile({ ...profile, [item.key]: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 text-right outline-none focus:border-sky-500"
                  />
                ) : (
                  <span className="text-sm text-slate-700 font-mono font-bold">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Medications & Treatment */}
        <div className="bg-white border border-sky-100 rounded-3xl p-6 space-y-6 shadow-xl shadow-sky-200/50">
          <div className="flex items-center justify-between pb-4 border-b border-sky-50">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              <h3 className="text-sm font-bold text-sky-900">İlaçlarım & Tedavi</h3>
            </div>
            <button onClick={() => setIsAddingMed(!isAddingMed)} className="p-2 bg-sky-50 rounded-xl text-sky-600">
              <Plus className={cn("w-4 h-4 transition-transform", isAddingMed && "rotate-45")} />
            </button>
          </div>

          <AnimatePresence>
            {isAddingMed && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100"
              >
                <input 
                  placeholder="İlaç Adı"
                  value={newMed.name}
                  onChange={e => setNewMed({...newMed, name: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-sky-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="date"
                    value={newMed.expiry}
                    onChange={e => setNewMed({...newMed, expiry: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-sky-500"
                  />
                  <input 
                    placeholder="Miktar (Örn: 3 Kalem)"
                    value={newMed.quantity}
                    onChange={e => setNewMed({...newMed, quantity: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-sky-500"
                  />
                </div>
                <button 
                  onClick={addMedication}
                  className="w-full bg-sky-600 text-white py-2 rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                  Ekle
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {medications.map(med => (
              <div key={med.id} className="p-4 bg-sky-50 rounded-2xl border border-sky-100 relative group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-sky-900 uppercase">{med.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">Aktif</span>
                    <button 
                      onClick={() => setMedications(medications.filter(m => m.id !== med.id))}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">SKT: {med.expiry}</p>
                <p className="text-[10px] text-slate-500 font-bold">Miktar: {med.quantity}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-sky-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-sky-500" />
                <h3 className="text-sm font-bold text-sky-900">Randevular</h3>
              </div>
              <button onClick={() => setIsAddingApp(!isAddingApp)} className="p-2 bg-amber-50 rounded-xl text-amber-600">
                <Plus className={cn("w-4 h-4 transition-transform", isAddingApp && "rotate-45")} />
              </button>
            </div>

            <AnimatePresence>
              {isAddingApp && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-100 mb-4"
                >
                  <input 
                    placeholder="Randevu Başlığı"
                    value={newApp.title}
                    onChange={e => setNewApp({...newApp, title: e.target.value})}
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-amber-500"
                  />
                  <input 
                    type="date"
                    value={newApp.date}
                    onChange={e => setNewApp({...newApp, date: e.target.value})}
                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-amber-500"
                  />
                  <button 
                    onClick={addAppointment}
                    className="w-full bg-amber-600 text-white py-2 rounded-xl text-xs font-bold uppercase tracking-widest"
                  >
                    Randevu Ekle
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-3">
              {appointments.map(app => (
                <div key={app.id} className="p-4 bg-amber-50 rounded-2xl border border-amber-100 group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-amber-900 uppercase">{app.title}</span>
                    <button 
                      onClick={() => setAppointments(appointments.filter(a => a.id !== app.id))}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[10px] text-amber-700 font-bold">Tarih: {app.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold text-sky-900">Alerjenler</h3>
            </div>
          </div>
          {isEditing ? (
            <textarea 
              value={profile.allergies}
              onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
              className="w-full bg-white border border-red-100 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-red-500 h-20 resize-none"
            />
          ) : (
            <p className="text-sm text-red-700 italic">"{profile.allergies}"</p>
          )}
        </div>

        <div className="bg-white border border-sky-100 rounded-3xl p-2 space-y-1 shadow-xl shadow-sky-200/50">
          {[
            { icon: CreditCard, label: 'Ödeme Yöntemleri', color: 'text-slate-500' },
            { icon: Settings, label: 'Uygulama Ayarları', color: 'text-slate-500' },
            { icon: LogOut, label: 'Çıkış Yap', color: 'text-red-500' },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-sky-50 rounded-2xl transition-all">
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", item.color)} />
                <span className={cn("text-sm font-medium", item.color)}>{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
