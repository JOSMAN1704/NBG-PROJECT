import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Landmark, ArrowRight, Filter } from 'lucide-react';

export const FlowGraph: React.FC = () => {
  return (
    <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[2400px] h-60 flex items-center justify-between pointer-events-none">
      {/* Background Connection Line */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <motion.path
          d="M 120 120 L 2280 120"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          strokeDasharray="10 10"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Start: USD */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 flex flex-col items-center gap-2 neon-border-indigo pointer-events-auto"
      >
        <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-400">
          <DollarSign size={24} />
        </div>
        <span className="text-xs font-mono tracking-widest text-indigo-300">DIVISA USD (CORPORATIVO)</span>
      </motion.div>

      {/* Filter 1: Odoo Integration */}
      <div className="flex flex-col items-center gap-4 translate-y-[-120px]">
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-black/90 border-2 border-emerald-500/40 px-6 py-3 rounded-2xl flex flex-col items-center gap-2 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        >
          <div className="flex items-center gap-2 text-emerald-400">
            <Filter size={14} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Procesamiento</span>
          </div>
          <span className="text-xs font-light tracking-tighter uppercase text-white/90">Motor Odoo 19 FX Custom</span>
        </motion.div>
        <ArrowRight className="text-emerald-500/40 rotate-90" size={16} />
      </div>

      {/* Filter 2: Banxico Source */}
      <div className="flex flex-col items-center gap-4 translate-y-[120px]">
        <ArrowRight className="text-indigo-500/40 -rotate-90" size={16} />
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="bg-black/90 border-2 border-indigo-500/40 px-6 py-3 rounded-2xl flex flex-col items-center gap-2 backdrop-blur-xl shadow-[0_0_30px_rgba(79,70,229,0.2)]"
        >
          <div className="flex items-center gap-2 text-indigo-400">
            <Landmark size={14} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Portal Banxico</span>
          </div>
          <span className="text-xs font-light tracking-tighter uppercase text-white/90">Sincronización de Tasas Diarias</span>
        </motion.div>
      </div>

      {/* End: MXN */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 flex flex-col items-center gap-2 neon-border-emerald pointer-events-auto"
      >
        <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
          <Landmark size={24} />
        </div>
        <span className="text-xs font-mono tracking-widest text-emerald-300">FISCAL MXN (LOCAL)</span>
      </motion.div>
    </div>
  );
};
