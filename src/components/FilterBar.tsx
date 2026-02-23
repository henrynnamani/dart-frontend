// import React from 'react';
// import * as Icons from 'lucide-react';
// import { TOPICS } from '../constants';

// export const FilterBar: React.FC = () => {
//   return (
//     <div className="flex items-center gap-3 overflow-x-auto pb-8 scrollbar-hide">
//       {TOPICS.map((topic) => {
//         const IconComponent = (Icons as any)[topic.icon];
//         const isActive = topic.id === 'all';
        
//         return (
//           <button
//             key={topic.id}
//             className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm font-semibold transition-all ${
//               isActive 
//                 ? 'bg-primary text-white' 
//                 : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-accent-teal'
//             }`}
//           >
//             {IconComponent && <IconComponent className="size-4" />}
//             {topic.label}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

import React from 'react';
import * as Icons from 'lucide-react';
import { TOPICS } from '../constants';

interface FilterBarProps {
    activeCategory: string;
    searchQuery: string;
    onCategoryChange: (category: string) => void;
    onSearchChange: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    activeCategory,
    searchQuery,
    onCategoryChange,
    onSearchChange
}) => {
    return (
        <div className="space-y-4 mb-8">
            {/* Search */}
            <input
                type="text"
                placeholder="Search by title, author, or keyword..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent-teal outline-none text-sm"
            />

            {/* Category filters */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {TOPICS.map((topic) => {
                    const IconComponent = (Icons as any)[topic.icon];
                    const isActive = topic.id === activeCategory;

                    return (
                        <button
                            key={topic.id}
                            onClick={() => onCategoryChange(topic.id)}
                            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm font-semibold transition-all ${
                                isActive
                                    ? 'bg-primary text-white'
                                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-accent-teal'
                            }`}
                        >
                            {IconComponent && <IconComponent className="size-4" />}
                            {topic.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
