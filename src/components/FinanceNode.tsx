import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { FinancialNode } from '../types';
import { cn } from '../lib/utils';

interface Props {
  node: FinancialNode;
  onClick: (node: FinancialNode) => void;
  is3D?: boolean;
}

export const FinanceNodeComponent: React.FC<Props> = ({ node, onClick, is3D }) => {
  const Icon = (Icons as any)[node.icon] || Icons.HelpCircle;

  const categoryStyles = {
    MXN: 'neon-border-emerald text-emerald-100 bg-emerald-950/40',
    USD: 'neon-border-indigo text-indigo-100 bg-indigo-950/40',
    CORE: 'neon-border-indigo text-white bg-white/10',
    ODOO: 'neon-border-raspberry text-rose-100 bg-rose-950/40',
  };

  return (
    <motion.div
      id={node.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        y: is3D ? -10 : 0,
        rotateX: is3D ? 5 : 0,
        rotateY: is3D ? 5 : 0,
        z: is3D ? 50 : 0,
        boxShadow: is3D ? '0 30px 60px rgba(0,0,0,0.5)' : 'none'
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={() => onClick(node)}
      style={{
        position: 'absolute',
        left: node.x,
        top: node.y,
        transform: 'translate(-50%, -50%)',
      }}
      className={cn(
        "glass-card p-10 w-[420px] cursor-pointer group flex flex-col gap-6",
        categoryStyles[node.category]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
          <Icon size={32} strokeWidth={1.5} />
        </div>
        {node.alert ? (
          <div className="bg-rose-500/20 text-rose-400 text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full border border-rose-500/30 animate-pulse">
            ALERTA FX
          </div>
        ) : (
          <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
            MÓDULO_ID: {node.id.split('-').pop()}
          </div>
        )}
      </div>

      <div>
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-2">Categoría: {node.category}</div>
        <h3 className="font-light text-4xl leading-tight mb-3 tracking-tight">{node.title}</h3>
        <p className="text-white/60 text-sm font-light leading-relaxed">{node.description}</p>
      </div>

      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 group-hover:text-emerald-300 transition-colors">VER DETALLE DE APARTADO</span>
        <div className="flex items-center gap-2 text-[10px] font-mono opacity-40 group-hover:opacity-100 transition-opacity">
          <Icons.ExternalLink size={14} />
        </div>
      </div>
    </motion.div>
  );
};
