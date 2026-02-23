import React from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Download, 
  BadgeCheck, 
  Link as LinkIcon, 
  Calendar, 
  FileText, 
  Quote, 
  ExternalLink,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ResearchPaper } from '../types';
import { motion } from 'motion/react';

interface PaperDetailPageProps {
  paper: ResearchPaper;
  onBack: () => void;
}

export const PaperDetailPage: React.FC<PaperDetailPageProps> = ({ paper, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto py-8"
    >
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="size-5" />
          Back to Discover
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Bookmark className="size-5" />
          </button>
          <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Share2 className="size-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all">
            <Download className="size-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded mb-4 inline-block ${paper.categoryColor || 'bg-slate-100 text-slate-600'}`}>
              {paper.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
              {paper.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-slate-200">{paper.author}</span>
                {paper.isVerified && <BadgeCheck className="size-4 text-blue-500 fill-blue-500/20" />}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <span>{paper.date}</span>
              </div>
            </div>
          </div>

          {paper.imageUrl && (
            <div className="aspect-video w-full rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
              <img 
                src={paper.imageUrl} 
                alt={paper.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="size-5 text-accent-teal" />
              Abstract
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              {paper.summary} This research explores the fundamental properties of {paper.category.toLowerCase()} through a series of rigorous experiments and theoretical modeling. Our findings suggest a significant paradigm shift in how we approach large-scale implementation of these technologies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="size-5 text-accent-teal" />
              AI-Generated Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-accent-teal/5 rounded-xl border border-accent-teal/10">
                <h4 className="font-bold text-accent-teal mb-2 text-sm uppercase tracking-wider">Key Contribution</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">First documented instance of stable performance at scale without significant degradation.</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-sm uppercase tracking-wider">Methodology</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Utilized a hybrid computational-experimental framework with real-time feedback loops.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="size-5 text-green-500" />
              Verification Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">On-Chain Hash</p>
                <p className="text-xs font-mono bg-slate-50 dark:bg-slate-900 p-2 rounded break-all text-slate-500">
                  0x7f8c2a3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Timestamp</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">Feb 23, 2026 • 04:05:47 UTC</p>
              </div>
              <button className="w-full py-2 text-xs font-bold text-accent-teal border border-accent-teal/20 rounded-lg hover:bg-accent-teal/5 transition-colors flex items-center justify-center gap-2">
                View on Explorer <ExternalLink className="size-3" />
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl">
            <Quote className="size-8 text-accent-teal mb-4 opacity-50" />
            <h3 className="font-bold mb-2">Cite this Research</h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              {paper.author} ({paper.date.split(' ')[1]}). "{paper.title}". ResearchChain Verified Discovery.
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
              Copy BibTeX
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
