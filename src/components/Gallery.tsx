import React, { useState } from 'react';
import Image from 'next/image';
import { Product, categories } from '../../public/data';

interface GalleryProps {
  products: Product[];
  onProductClick: (id: string) => void;
  selectedItems: string[];
  onToggleSelect: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ 
  products, 
  onProductClick, 
  selectedItems, 
  onToggleSelect 
}) => {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.categoryId === filter);

  const downloadImage = (url: string, filename: string) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(console.error);
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      alert(`আইডি #${id} কপি করা হয়েছে!`);
    });
  };

  return (
    <section id="gallery" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-container mx-auto px-5">
        <h2 className="section-title text-[2.5rem] font-bold">ডিজাইন গ্যালারি</h2>
        
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button 
            className={`px-6 py-3 rounded-full border border-[#ddd] cursor-pointer font-bold transition-all text-[0.95rem] shadow-sm hover:scale-105 active:scale-95 ${filter === 'all' ? 'bg-primary text-white border-primary shadow-md' : 'bg-bg text-primary-dark hover:bg-white hover:border-primary'}`}
            onClick={() => setFilter('all')}
          >
            সব ছবি
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`px-6 py-3 rounded-full border border-[#ddd] cursor-pointer font-bold transition-all text-[0.95rem] shadow-sm hover:scale-105 active:scale-95 ${filter === cat.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-bg text-primary-dark hover:bg-white hover:border-primary'}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map(p => (
            <div 
              key={p.id} 
              className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer shadow-lg transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl"
              onClick={() => onProductClick(p.id)}
            >
              {/* Action Buttons Overlay (Visible on Hover) */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <button 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border-none shadow-lg backdrop-blur-md ${selectedItems.includes(p.id) ? 'bg-[#e74c3c] text-white' : 'bg-white/90 text-primary hover:bg-primary hover:text-white'}`}
                  title={selectedItems.includes(p.id) ? "পছন্দ থেকে সরান" : "পছন্দ করুন"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect(p.id);
                  }}
                >
                  <i className={`fas ${selectedItems.includes(p.id) ? 'fa-heart' : 'far fa-heart'}`}></i>
                </button>
                <button 
                  className="w-10 h-10 bg-white/90 text-[#2c3e50] rounded-xl flex items-center justify-center transition-all border-none shadow-lg backdrop-blur-md hover:bg-[#2c3e50] hover:text-white"
                  title="ডাউনলোড করুন"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(p.images[0], `${p.id}-${p.name}.jpg`);
                  }}
                >
                  <i className="fas fa-download"></i>
                </button>
                <button 
                  className="w-10 h-10 bg-white/90 text-[#2c3e50] rounded-xl flex items-center justify-center transition-all border-none shadow-lg backdrop-blur-md hover:bg-accent hover:text-white"
                  title="আইডি কপি করুন"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyId(p.id);
                  }}
                >
                  <i className="far fa-copy"></i>
                </button>
              </div>
              
              <Image 
                src={p.images[0]} 
                alt={p.name} 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-115" 
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-accent text-white text-[0.65rem] px-2 py-0.5 rounded-full font-bold">ID: #{p.id}</span>
                  <span className="text-white/70 text-[0.65rem]">{p.material}</span>
                </div>
                <h4 className="text-white font-bold text-[1rem] leading-tight mb-2">{p.name}</h4>
                <div className="flex justify-end items-center">
                  <span className="text-white/80 text-[0.7rem] flex items-center gap-1">
                    <i className="fas fa-expand-alt"></i> বড় করে দেখুন
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
