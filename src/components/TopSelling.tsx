import React from 'react';
import { Product } from '../../public/data';
import ProductCard from './ProductCard';

interface TopSellingProps {
  products: Product[];
  onProductClick: (id: string) => void;
}

const TopSelling: React.FC<TopSellingProps> = ({ products, onProductClick }) => {
  const topSelling = products.filter(p => p.isTopSelling);

  return (
    <section className="bg-[#fdfcfb] bg-[radial-gradient(#8B451311_1px,transparent_1px)] bg-size-[20px_20px] py-25 overflow-hidden relative border-y border-[#eee]">
      <div className="max-w-container mx-auto px-5 text-center mb-17.5">
        <h2 className="section-title text-[2.5rem] text-primary-dark uppercase tracking-[2px]">আমাদের সেরা ডিজাইনগুলো</h2>
      </div>
      
      <div className="w-full overflow-hidden relative py-10">
        <div className="flex w-max gap-10 animate-marquee hover:pause">
          {topSelling.map((p, idx) => (
            <div key={`${p.id}-${idx}`} className="min-w-[320px] max-w-[320px]">
              <ProductCard product={p} onClick={onProductClick} isTopSelling />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {topSelling.map((p, idx) => (
            <div key={`${p.id}-duplicate-${idx}`} className="min-w-[320px] max-w-[320px]">
              <ProductCard product={p} onClick={onProductClick} isTopSelling />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSelling;
