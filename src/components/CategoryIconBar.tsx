import React from 'react';
import { Cake, Sparkles, HeartHandshake, Gift, Baby, Crown, Coffee, Grid } from 'lucide-react';

interface CategoryIconBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryIconBar: React.FC<CategoryIconBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  // Map category names to aesthetic icons and labels matching the reference design
  const getCategoryMeta = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower === 'todos') {
      return { icon: Grid, label: 'Todos' };
    }
    if (lower.includes('cumple') || lower.includes('birthday')) {
      return { icon: Cake, label: 'Cumpleaños' };
    }
    if (lower.includes('15') || lower.includes('event')) {
      return { icon: Crown, label: '15 Años' };
    }
    if (lower.includes('matrimonio') || lower.includes('boda') || lower.includes('wedding')) {
      return { icon: HeartHandshake, label: 'Bodas' };
    }
    if (lower.includes('baby')) {
      return { icon: Baby, label: 'Baby Shower' };
    }
    if (lower.includes('bautizo')) {
      return { icon: Sparkles, label: 'Bautizos' };
    }
    if (lower.includes('especial') || lower.includes('for you') || lower.includes('para')) {
      return { icon: Gift, label: 'Especiales' };
    }
    if (lower.includes('postre') || lower.includes('dulce')) {
      return { icon: Coffee, label: 'Postres' };
    }
    return { icon: Cake, label: cat };
  };

  return (
    <div className="w-full py-3 px-2 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="flex items-start gap-3.5 sm:gap-5 py-2 px-2 mx-auto w-max min-w-0">
        {categories.map((cat) => {
          const meta = getCategoryMeta(cat);
          const Icon = meta.icon;
          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className="flex flex-col items-center flex-shrink-0 group focus:outline-none transition-transform active:scale-95"
            >
              {/* Circular Pink Button Matching Reference Image */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isSelected
                    ? 'bg-[#E85A8A] text-white ring-4 ring-[#FFB6CB] shadow-md scale-105'
                    : 'bg-white text-[#E85A8A] hover:bg-pink-50 border border-pink-100'
                }`}
              >
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] ${isSelected ? 'animate-pulse' : ''}`} />
              </div>

              {/* Label Underneath */}
              <span
                className={`text-[11px] sm:text-xs mt-1.5 font-medium transition-colors text-center line-clamp-1 max-w-[76px] ${
                  isSelected ? 'text-[#C73866] font-bold' : 'text-gray-600 group-hover:text-gray-900'
                }`}
              >
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
