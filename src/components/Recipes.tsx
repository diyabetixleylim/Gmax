import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Utensils, Plus } from 'lucide-react';

export const Recipes = () => {
  const [recipes] = useState([
    { id: 1, title: 'Düşük KH Pizza', kh: '12g', user: 'Mert K.', likes: 24 },
    { id: 2, title: 'Şekersiz Chia Puding', kh: '8g', user: 'Zeynep A.', likes: 18 },
    { id: 3, title: 'Badem Unlu Kurabiye', kh: '5g', user: 'Burak T.', likes: 32 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Yemek Tarifleri</h2>
        <button className="bg-emerald-600 px-4 py-2 rounded-xl text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-100 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tarif Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recipes.map(recipe => (
          <motion.div 
            key={recipe.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-sky-100 rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-emerald-50 p-4 rounded-2xl group-hover:bg-emerald-100 transition-colors">
                <Utensils className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{recipe.title}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{recipe.user} • {recipe.likes} beğeni</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{recipe.kh} KH</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
