import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ResearchCard } from './components/ResearchCard';
import { UploadPage } from './components/UploadPage';
import { Footer, FloatingActions } from './components/Footer';
import { MOCK_PAPERS } from './constants';
import { TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'discover' | 'upload'>('discover');
  const [sortBy, setSortBy] = useState('On-Chain Citations');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 lg:px-12 w-full">
        <AnimatePresence mode="wait">
          {currentView === 'discover' ? (
            <motion.div
              key="discover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Hero />
              
              <FilterBar />

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="size-6 text-accent-teal" />
                  Trending Research
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <span>Sorted by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 cursor-pointer font-bold text-primary dark:text-white p-0 outline-none"
                  >
                    <option>On-Chain Citations</option>
                    <option>Recency</option>
                    <option>Impact Factor</option>
                  </select>
                </div>
              </div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {MOCK_PAPERS.map((paper) => (
                  <ResearchCard key={paper.id} paper={paper} />
                ))}
                
                {/* Skeleton Loading Example */}
                <ResearchCard 
                  paper={{} as any} 
                  isLoading={true} 
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <UploadPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
