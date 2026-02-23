import React from 'react';
import { TrendingUp, HelpCircle, MessageSquare, Network } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 opacity-50 grayscale">
          <div className="size-6 bg-primary text-white rounded flex items-center justify-center">
            <Network className="size-4" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-primary dark:text-white">ResearchChain</h2>
        </div>
        <div className="flex gap-8 text-sm text-slate-500">
          <a href="#" className="hover:text-primary transition-colors">Docs</a>
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">Transparency Report</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <p className="text-xs text-slate-400">© 2024 ResearchChain Foundation. On-chain verified discovery.</p>
      </div>
    </footer>
  );
};

export const FloatingActions: React.FC = () => {
  return (
    <aside className="fixed right-8 bottom-8 flex flex-col gap-3 z-40">
      <button className="size-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
        <HelpCircle className="size-6" />
      </button>
      <button className="size-12 rounded-full bg-white dark:bg-slate-800 text-primary dark:text-white border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
        <MessageSquare className="size-6" />
      </button>
    </aside>
  );
};
