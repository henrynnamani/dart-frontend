

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ResearchCard } from './components/ResearchCard';
import { UploadPage } from './components/UploadPage';
import { Footer, FloatingActions } from './components/Footer';
import { TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRecords } from './hooks/useRecords';
import { ResearchPaper } from './types';

export default function App() {
    const [currentView, setCurrentView] = useState<'discover' | 'upload'>('discover');
    const [sortBy, setSortBy] = useState('Recency');
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { records, loading, error, refetch } = useRecords();
    const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

    const handleViewChange = (view: 'discover' | 'upload') => {
        if (view === 'discover') refetch();
        setCurrentView(view);
    };

    const filteredRecords = useMemo(() => {
        let result = [...records];

        if (activeCategory !== 'all') {
            result = result.filter(r =>
                r.category.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.author.toLowerCase().includes(q) ||
                r.summary.toLowerCase().includes(q)
            );
        }

        // Sort
        if (sortBy === 'Recency') {
            result.sort((a, b) => b.timestamp - a.timestamp);
        }

        return result;
    }, [records, activeCategory, searchQuery, sortBy]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar currentView={currentView} onViewChange={handleViewChange} />

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

                            <FilterBar
                                activeCategory={activeCategory}
                                searchQuery={searchQuery}
                                onCategoryChange={setActiveCategory}
                                onSearchChange={setSearchQuery}
                            />

                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <TrendingUp className="size-6 text-accent-teal" />
                                    {filteredRecords.length} Research Paper{filteredRecords.length !== 1 ? 's' : ''}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                    <span>Sorted by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="bg-transparent border-none focus:ring-0 cursor-pointer font-bold text-primary dark:text-white p-0 outline-none"
                                    >
                                        <option>Recency</option>
                                        <option>On-Chain Citations</option>
                                        <option>Impact Factor</option>
                                    </select>
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm mb-4">Failed to load records: {error}</p>
                            )}

                            {loading ? (
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                    {[...Array(6)].map((_, i) => (
                                        <ResearchCard key={i} paper={{} as any} isLoading={true} />
                                    ))}
                                </div>
                            ) : filteredRecords.length === 0 ? (
                                <div className="text-center py-20 text-slate-400">
                                    <p className="text-lg font-medium">
                                        {searchQuery || activeCategory !== 'all'
                                            ? 'No papers match your search.'
                                            : 'No research papers found.'}
                                    </p>
                                    <p className="text-sm mt-1">
                                        {searchQuery || activeCategory !== 'all'
                                            ? 'Try a different search or category.'
                                            : 'Connect your wallet or submit a paper to get started.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="columns-1 md:columns-4 lg:columns-4 gap-6 space-y-6">
                                    {filteredRecords.map((record) => (
                                        <ResearchCard
                                            key={record.id}
                                            paper={{
                                                id: record.id,
                                                title: record.title,
                                                author: record.author,       // ✅ singular to match ResearchCard
                                                category: record.category,
                                                summary: record.summary,     // ✅ summary not abstract
                                                fileRootHash: record.fileRootHash,
                                                fileName: record.fileName,
                                                date: new Date(record.timestamp).toLocaleDateString(),
                                                isVerified: true,
                                                onSelect: setSelectedPaper
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <UploadPage onSuccess={() => handleViewChange('discover')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
            <FloatingActions />
        </div>
    );
}