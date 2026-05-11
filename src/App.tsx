/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { FINANCIAL_NODES, NEXT_STEPS } from './constants';
import { FinancialNode, CanvasState } from './types';
import { FinanceNodeComponent } from './components/FinanceNode';
import { DetailsPanel } from './components/DetailsPanel';
import { SearchBar } from './components/SearchBar';
import { FlowGraph } from './components/FlowGraph';
import { MousePointer2, Plus, Minus, Maximize, Landmark, ListChecks, ArrowRight } from 'lucide-react';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<FinancialNode | null>(null);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [is3D, setIs3D] = useState(false);
  const [canvas, setCanvas] = useState<CanvasState>({ x: 0, y: 0, scale: 0.8 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth panning
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.8);

  // Faster springs for better "drag" feel
  const springX = useSpring(x, { damping: 40, stiffness: 400 });
  const springY = useSpring(y, { damping: 40, stiffness: 400 });
  const springScale = useSpring(scale, { damping: 40, stiffness: 300 });

  const navigateTo = useCallback((node: FinancialNode) => {
    x.set(-node.x);
    y.set(-node.y);
    scale.set(1.1);
    setSelectedNode(node);
  }, [x, y, scale]);

  const handleZoom = (delta: number) => {
    const newScale = Math.min(Math.max(scale.get() + delta, 0.1), 2);
    scale.set(newScale);
  };

  const resetView = () => {
    x.set(0);
    y.set(0);
    scale.set(0.8);
    setSelectedNode(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden selection:bg-emerald-500/30">
      <div className="infinite-canvas-bg" />
      <div className="berry-overlay" />
      <div className="glow-overlay" />
      <div className="grid-overlay fixed inset-0 z-0" />

      <SearchBar onSelect={navigateTo} />

      {/* Top Left: NBG Context */}
      <div className="fixed top-8 left-8 z-[150] space-y-1">
        <div className="flex items-center gap-2">
          <Landmark className="text-emerald-400" size={16} />
          <h1 className="font-bold text-xl uppercase tracking-tighter">NBG MÉXICO</h1>
        </div>
        <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">CONTABILIDAD MULTIMONEDA ODOO</p>
      </div>

      {/* Top Right: Next Steps Toggle */}
      <div className="fixed top-8 right-8 z-[150]">
        <button 
          onClick={() => setShowNextSteps(!showNextSteps)}
          className={`px-8 py-4 flex items-center gap-4 transition-all group overflow-hidden rounded-2xl border-2 font-black uppercase tracking-[0.2em] shadow-2xl ${
            showNextSteps 
              ? 'bg-rose-600 text-white border-rose-400' 
              : 'bg-emerald-600/90 text-white border-emerald-400 animate-[pulse_2s_infinite]'
          }`}
        >
          <ListChecks size={20} className="group-hover:scale-125 transition-transform" />
          <span className="text-sm">Próximos Pasos</span>
        </button>
        {showNextSteps && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute top-full right-0 mt-4 w-96 glass-panel p-8 space-y-6 ring-2 ring-emerald-500/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-emerald-500 rounded-full" />
              <h4 className="text-xs font-black uppercase text-emerald-400 tracking-[0.3em]">Hoja de Ruta Implementación</h4>
            </div>
            <div className="space-y-4">
              {NEXT_STEPS.map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 text-sm text-white/80 items-start group"
                >
                  <ArrowRight size={14} className="shrink-0 mt-1 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span className="font-light">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Control Tools */}
      <div className="fixed bottom-32 left-8 z-[150] flex flex-col gap-2">
        <button onClick={() => handleZoom(0.2)} className="glass-panel p-3 hover:bg-emerald-500 hover:text-black transition-all" title="Zoom In">
          <Plus size={18} />
        </button>
        <button onClick={() => handleZoom(-0.2)} className="glass-panel p-3 hover:bg-emerald-500 hover:text-black transition-all" title="Zoom Out">
          <Minus size={18} />
        </button>
        <button onClick={resetView} className="glass-panel p-3 hover:bg-emerald-500 hover:text-black transition-all" title="Reset View">
          <Maximize size={18} />
        </button>
      </div>

      {/* Bottom HUD: Stats - NOW 3 CARDS */}
      <div className="fixed bottom-8 left-8 right-8 flex justify-between items-end z-[150] pointer-events-none">
        <div className="flex space-x-4 pointer-events-auto">
          <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10 min-w-[220px]">
            <span className="text-[10px] uppercase text-white/40 block mb-1 tracking-widest font-bold">Ventas Nacionales Totales</span>
            <span className="text-2xl font-light text-emerald-400 tracking-tight">$1,956,480 <span className="text-xs opacity-50 ml-1">MXN</span></span>
          </div>
          <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10 min-w-[220px]">
            <span className="text-[10px] uppercase text-white/40 block mb-1 tracking-widest font-bold">Ventas Nacionales Totales USD</span>
            <span className="text-2xl font-light text-indigo-400 tracking-tight">$100,000 <span className="text-xs opacity-50 ml-1">USD</span></span>
          </div>
          <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border-2 border-emerald-500/20 min-w-[220px] ring-1 ring-emerald-500/10">
            <span className="text-[10px] uppercase text-emerald-400/60 block mb-1 tracking-widest font-bold">Tipo de Cambio Banxico</span>
            <span className="text-2xl font-mono text-emerald-400 tracking-tight">$19.5648</span>
          </div>
        </div>

        <div className="flex flex-col items-end pointer-events-auto">
          <div className="text-right mb-4">
            <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Status de Sincronización</div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10B981]"></span>
              <span className="text-xs font-mono text-emerald-100/70 uppercase">PORTAL BANXICO</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIs3D(!is3D)}
              className={`px-6 py-2 border rounded-full text-xs font-bold uppercase transition-all ${
                is3D 
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white/70'
              }`}
            >
              Exploración 3D: {is3D ? 'Activada' : 'Desactivada'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Navigation Rail */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-6 z-[150]">
        <div className="group relative flex items-center justify-end">
          <div className="w-3 h-3 bg-emerald-500 rounded-full cursor-pointer ring-4 ring-emerald-500/20" onClick={() => { x.set(900); y.set(0); scale.set(1); }}></div>
          <span className="absolute right-8 text-[10px] uppercase opacity-0 group-hover:opacity-100 whitespace-nowrap bg-emerald-500 px-2 py-1 rounded text-black font-bold transition-all">MÓDULO MXN</span>
        </div>
        <div className="group relative flex items-center justify-end">
          <div className="relative w-3 h-3 bg-white/20 rounded-full cursor-pointer hover:bg-white/50 transition-colors" onClick={() => resetView()}>
            <div className="absolute inset-0 scale-[2] border border-white/10 rounded-full"></div>
          </div>
          <span className="absolute right-8 text-[10px] uppercase opacity-0 group-hover:opacity-100 whitespace-nowrap bg-white/20 px-2 py-1 rounded transition-all">VISTA CENTRAL</span>
        </div>
        <div className="group relative flex items-center justify-end">
          <div className="w-3 h-3 bg-indigo-500 rounded-full cursor-pointer hover:ring-4 hover:ring-indigo-500/20" onClick={() => { x.set(-900); y.set(0); scale.set(1); }}></div>
          <span className="absolute right-8 text-[10px] uppercase opacity-0 group-hover:opacity-100 whitespace-nowrap bg-indigo-500 px-2 py-1 rounded text-white font-bold transition-all">MÓDULO USD</span>
        </div>
        <div className="h-20 w-[1px] bg-white/10 mx-auto"></div>
        <div className="w-3 h-3 border border-white/40 rounded-full cursor-pointer flex items-center justify-center mx-auto">
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* MAIN INFINITE CANVAS */}
      <motion.div
        ref={containerRef}
        drag
        dragConstraints={{ left: -3000, right: 3000, top: -3000, bottom: 3000 }}
        dragElastic={0.05}
        dragTransition={{ power: 0.2, timeConstant: 300 }}
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          transformOrigin: 'center',
          cursor: 'grab',
          willChange: 'transform',
          perspective: is3D ? '1000px' : 'none',
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          {FINANCIAL_NODES.map((node) => (
            <FinanceNodeComponent 
              key={node.id} 
              node={node} 
              onClick={setSelectedNode} 
              is3D={is3D}
            />
          ))}
        </div>
      </motion.div>

      {/* Details Side Panel */}
      <DetailsPanel 
        node={selectedNode} 
        onClose={() => setSelectedNode(null)} 
      />

      {/* Mouse Interaction Hint */}
      {canvas.scale < 0.5 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 text-white/20 text-[10px] font-mono uppercase tracking-[0.5em] animate-pulse">
          Click o Drag para explorar
        </div>
      )}
    </div>
  );
}
