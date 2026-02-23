import React from 'react';
import { Bookmark, BadgeCheck, Sparkles, Link as LinkIcon, Calendar, ArrowRight } from 'lucide-react';
import { ResearchPaper } from '../types';
import { motion } from 'motion/react';

interface ResearchCardProps {
  paper: ResearchPaper;
  isLoading?: boolean;
  onSelect?: (paper: ResearchPaper) => void;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ paper, isLoading, onSelect }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 opacity-60">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          <div className="h-24 bg-slate-100 dark:bg-slate-700/50 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect?.(paper)}
      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-xl transition-all group mb-6 break-inside-avoid"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${paper.categoryColor || 'bg-slate-100 text-slate-600'}`}>
          {paper.category}
        </span>
        <button className="text-slate-300 group-hover:text-primary transition-colors">
          <Bookmark className="size-5" />
        </button>
      </div>

      {paper.imageUrl && (
        <div className="aspect-video w-full rounded-lg bg-slate-100 dark:bg-slate-700 mb-4 overflow-hidden">
          <img 
            src={paper.imageUrl} 
            alt={paper.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <h4 className="text-lg font-bold leading-tight mb-2 group-hover:text-accent-teal transition-colors">
        {paper.title}
      </h4>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{paper.author}</span>
        {paper.isVerified && <BadgeCheck className="size-4 text-blue-500 fill-blue-500/20" />}
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-accent-teal mb-4">
        <p className="text-xs font-semibold text-accent-teal uppercase mb-1 flex items-center gap-1">
          <Sparkles className="size-3" /> AI Summary
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          { console.log(paper.summary) }
          {paper.summary}
        </p>
        <button className="text-xs font-bold text-primary dark:text-white mt-2 flex items-center gap-1">
          Read More <ArrowRight className="size-3" />
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-slate-500">
            <Calendar className="size-4" />
            <span className="text-xs">{paper.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
