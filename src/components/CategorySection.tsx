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
    <section id={`category-${category.id}`} className="py-20 border-b border-[#eee] even:bg-white scroll-mt-20">
      <div className="max-w-container mx-auto px-5">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] bg-bg rounded-[15px] flex items-center justify-center text-[2rem] text-primary shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
              {category.icon}
            </div>
            <div>
              <h3 className="text-[2.2rem] text-primary-dark font-bold m-0">{category.name}</h3>
              <p className="text-gray-medium text-[1rem] mt-1.25">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-2.5">
              <button 
                className="w-11 h-11 rounded-full border border-[#ddd] bg-white cursor-pointer flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary hover:scale-110"
                onClick={() => scroll(-1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                className="w-11 h-11 rounded-full border border-[#ddd] bg-white cursor-pointer flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary hover:scale-110"
                onClick={() => scroll(1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <button 
              className="px-5 py-2.5 border-2 border-primary text-primary font-bold rounded transition-all hover:bg-primary hover:text-white"
              onClick={() => onShowAll(category.id)}
            >
              সকল {category.name} দেখুন →
            </button>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-[30px] overflow-x-auto py-5 px-1 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(p => (
            <div key={p.id} className="min-w-[300px] max-w-[300px]">
              <ProductCard product={p} onClick={onProductClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
