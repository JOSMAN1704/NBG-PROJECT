import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Terminal, CheckCircle2, AlertTriangle } from 'lucide-react';
import { FinancialNode } from '../types';

interface Props {
  node: FinancialNode | null;
  onClose: () => void;
}

export const DetailsPanel: React.FC<Props> = ({ node, onClose }) => {
  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[600px] bg-black/40 backdrop-blur-3xl z-[201] border-l-2 border-white/10 shadow-2xl flex flex-col"
          >
            <div className="p-10 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                  <BookOpen className="text-emerald-400" size={24} />
                </div>
                <h2 className="text-2xl font-light tracking-tight uppercase">Expediente Técnico</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/10 rounded-full transition-colors group"
                id="close-panel-btn"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-indigo-500/20 rounded text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{node.category} MODULE</span>
                  <span className="text-white/20 text-[10px font-mono tracking-widest uppercase">ID: {node.id}</span>
                </div>
                <h1 className="text-5xl font-light leading-none tracking-tighter text-white mb-6 underline decoration-emerald-500/30 decoration-4 underline-offset-8">{node.title}</h1>
                <p className="text-lg text-white/60 font-light leading-relaxed">{node.description}</p>
              </section>

              {node.alert && (
                <section className="bg-rose-500/10 border-2 border-rose-500/40 p-6 rounded-3xl flex gap-4 ring-1 ring-rose-500/30 animate-pulse">
                  <AlertTriangle className="text-rose-500 shrink-0" size={28} />
                  <div>
                    <h4 className="text-rose-400 font-black text-xs uppercase tracking-[0.2em] mb-1">Riesgo de Integridad Detectado</h4>
                    <p className="text-rose-200/70 text-sm leading-snug">{node.alert}</p>
                  </div>
                </section>
              )}

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Terminal size={16} className="text-emerald-400" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400/60">Filtros Odoo v19 / Auditoría</h3>
                </div>
                <div className="grid gap-4">
                  {node.technicalDetails.map((detail, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                        <CheckCircle2 size={12} />
                      </div>
                      <span className="text-base text-white/70 group-hover:text-white transition-colors font-light leading-normal">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            <div className="p-10 border-t border-white/5 flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white hover:text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                Volver
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
