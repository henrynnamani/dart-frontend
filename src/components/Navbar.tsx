import React from 'react';
import { Network, User, PlusCircle } from 'lucide-react';

interface NavbarProps {
  currentView: 'discover' | 'upload';
  onViewChange: (view: 'discover' | 'upload') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 lg:px-12 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('discover')}>
        <div className="size-9 bg-primary text-white rounded-lg flex items-center justify-center">
          <Network className="size-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-primary dark:text-white">ResearchChain</h2>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => onViewChange('discover')}
          className={`text-sm font-semibold transition-colors ${currentView === 'discover' ? 'text-accent-teal' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}
        >
          Discover
        </button>
        <button className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">My Library</button>
        <button className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Trending</button>
        <button className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">Saved Queries</button>
      </nav>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => onViewChange('upload')}
          className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            currentView === 'upload' 
              ? 'bg-accent-teal text-white' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
          }`}
        >
          <PlusCircle className="size-4" />
          Submit Paper
        </button>
        <button className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-all hover:bg-slate-800">
          Connect Wallet
        </button>
        <div className="size-10 rounded-full border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 flex items-center justify-center">
           <User className="size-6 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
