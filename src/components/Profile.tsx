import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck, AlertTriangle, Settings, ChevronRight, LogOut, CreditCard, UserCheck, Save } from 'lucide-react';
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

  useEffect(() => {
    const saved = localStorage.getItem('gmax_profile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem('gmax_profile', JSON.stringify(profile));
    setIsEditing(false);
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
      </div>

      <div className="space-y-4">
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
