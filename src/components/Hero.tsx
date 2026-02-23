import React from 'react';
import { Sparkles, Search as SearchIcon } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto text-center mb-12 pt-10">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
        Unlock the Future of <span className="text-accent-teal">Scientific Knowledge</span>
      </h1>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {/* <Sparkles className="size-5 text-slate-400 group-focus-within:text-accent-teal transition-colors" /> */}
        </div>
          {/* <input 
            type="text" 
            className="w-full h-16 pl-12 pr-32 rounded-xl bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 shadow-xl focus:ring-2 focus:ring-accent-teal text-lg placeholder:text-slate-400 text-slate-900 dark:text-white transition-all outline-none"
            placeholder="Ask a research question (e.g., 'What are the latest breakthroughs in CRISPR?')"
          />
          <button className="absolute right-3 top-3 bottom-3 px-6 bg-primary text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2">
            Search <SearchIcon className="size-4" />
          </button> */}
      </div>
    </section>
  );
};
