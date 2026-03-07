import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { time: '10:00', value: 110 },
  { time: '10:15', value: 105 },
  { time: '10:30', value: 98 },
  { time: '10:45', value: 92 },
  { time: '11:00', value: 85 },
  { time: '11:15', value: 78 },
  { time: '11:30', value: 72, isPrediction: true },
  { time: '11:45', value: 65, isPrediction: true },
  { time: '12:00', value: 58, isPrediction: true },
];

export const GlucoseChart = () => {
  return (
    <div className="w-full h-full bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Glukoz Trendi (mg/dL)</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-sky-500 rounded-full" />
          <span className="text-[8px] text-slate-500 font-bold uppercase">Gerçek</span>
          <span className="w-2 h-2 bg-sky-500/30 rounded-full ml-2" />
          <span className="text-[8px] text-slate-500 font-bold uppercase">Tahmin (45dk)</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            domain={[40, 200]}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            itemStyle={{ color: '#0ea5e9' }}
            labelStyle={{ color: '#64748b' }}
          />
          <ReferenceLine y={70} stroke="#f87171" strokeDasharray="3 3" label={{ position: 'right', value: 'Düşük', fill: '#f87171', fontSize: 10, fontWeight: 'bold' }} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0ea5e9" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 6, fill: '#0ea5e9' }}
            strokeDasharray={(props: any) => props.payload.isPrediction ? "5 5" : "0"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
