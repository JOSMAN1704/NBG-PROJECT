import React, { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { FINANCIAL_NODES } from '../constants';
import { FinancialNode } from '../types';
import { cn } from '../lib/utils';

interface Props {
  onSelect: (node: FinancialNode) => void;
}

export const SearchBar: React.FC<Props> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FinancialNode[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const filtered = FINANCIAL_NODES.filter(n => 
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.description.toLowerCase().includes(query.toLowerCase()) ||
      n.technicalDetails.some(d => d.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(filtered);
  }, [query]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[600px]">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center space-x-4 ring-1 ring-emerald-500/30">
        <Search className="text-emerald-400" size={20} />
        <input
          autoFocus
          type="text"
          placeholder="Buscar 'Diferencia Cambiaria', 'SAT', 'Módulo MXN'..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-lg w-full placeholder-white/40 font-light outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          id="search-input"
        />
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-indigo-600/50 rounded text-[10px] uppercase tracking-widest font-bold border border-indigo-400/30">Odoo 19</span>
          <span className="px-2 py-1 bg-emerald-600/50 rounded text-[10px] uppercase tracking-widest font-bold border border-emerald-400/30">Live</span>
        </div>

        {isOpen && results.length > 0 && (
          <div className="absolute top-[calc(100%+12px)] left-0 right-0 glass-panel overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            {results.map((node) => (
              <button
                key={node.id}
                onClick={() => {
                  onSelect(node);
                  setQuery('');
                  setIsOpen(false);
                }}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left group border-b border-white/5 last:border-none"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-light text-white/90 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{node.title}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold font-mono">MÓDULO {node.category}</span>
                </div>
                <div className="text-[10px] font-mono p-2 border border-white/10 rounded-lg group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500 transition-all uppercase font-bold tracking-widest">
                  Navegar
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
