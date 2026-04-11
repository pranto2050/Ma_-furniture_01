import React, { useRef } from 'react';
import { Product } from '../../public/data';
import ProductCard from './ProductCard';

interface CategorySectionProps {
  category: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
  products: Product[];
  onProductClick: (id: string) => void;
  onShowAll: (catId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  category, 
  products, 
  onProductClick, 
  onShowAll 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount * dir, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section id={`category-${category.id}`} className="w-full py-20 border-b border-[#eee] even:bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-5">
        <div className="flex flex-col gap-5 mb-10 lg:flex-row lg:justify-between lg:items-center">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
            <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] bg-bg rounded-[15px] flex items-center justify-center text-[1.7rem] sm:text-[2rem] text-primary shadow-[0_5px_15px_rgba(0,0,0,0.05)] shrink-0">
              {category.icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.2rem] text-primary-dark font-bold m-0 leading-tight break-words">{category.name}</h3>
              <p className="text-gray-medium text-[0.95rem] sm:text-[1rem] mt-1.25 break-words">{category.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 lg:justify-end">
            <div className="flex gap-2.5">
              <button 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#ddd] bg-white cursor-pointer flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary hover:scale-110"
                onClick={() => scroll(-1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#ddd] bg-white cursor-pointer flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary hover:scale-110"
                onClick={() => scroll(1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <button 
              className="w-full sm:w-auto px-5 py-2.5 border-2 border-primary text-primary font-bold rounded transition-all hover:bg-primary hover:text-white"
              onClick={() => onShowAll(category.id)}
            >
              সকল {category.name} দেখুন →
            </button>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-5 sm:gap-7.5 overflow-x-auto py-5 px-0 sm:px-1 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(p => (
            <div key={p.id} className="min-w-[82vw] max-w-[82vw] sm:min-w-[300px] sm:max-w-[300px]">
              <ProductCard product={p} onClick={onProductClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
