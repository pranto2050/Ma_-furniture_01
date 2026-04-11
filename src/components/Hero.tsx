import React, { useState, useEffect } from 'react';
import { products, Product } from '../../public/data';

interface HeroProps {
  products: Product[];
  onProductClick: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ products, onProductClick }) => {
  const featured = products.filter(p => p.isFeatured);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const moveSlider = (dir: number) => {
    setCurrentSlide((prev) => (prev + dir + featured.length) % featured.length);
  };

  return (
    <section className="h-125 md:h-150 relative overflow-hidden bg-white">
      <div 
        className="h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featured.map((p) => (
          <div key={p.id} className="min-w-full h-full flex items-center">
            <div className="flex flex-col md:flex-row w-full h-full items-center">
              <div className="w-full md:w-[60%] h-[50%] md:h-full overflow-hidden">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-[40%] p-6 md:p-15 text-center md:text-left flex flex-col justify-center">
                <h2 className="text-[1.8rem] md:text-[3rem] mb-3 md:mb-5 text-primary-dark font-black leading-tight">{p.name}</h2>
                <p className="text-[0.9rem] md:text-[1.2rem] mb-4 md:mb-7.5 text-gray-medium line-clamp-2 md:line-clamp-none">{p.description}</p>
                <div className="text-[1.5rem] md:text-[2rem] font-black text-primary mb-4 md:mb-7.5">৳{p.price.toLocaleString()}</div>
                <div>
                  <button 
                    className="bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black text-sm md:text-lg transition-all hover:bg-primary-dark hover:-translate-y-1 shadow-lg shadow-primary/20"
                    onClick={() => onProductClick(p.id)}
                  >
                    এখনই অর্ডার করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-5 bg-white/80 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all hover:bg-primary hover:text-white shadow-lg"
        onClick={() => moveSlider(-1)}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-5 bg-white/80 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all hover:bg-primary hover:text-white shadow-lg"
        onClick={() => moveSlider(1)}
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5">
        {featured.map((_, idx) => (
          <div 
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${idx === currentSlide ? 'bg-primary w-7.5 rounded-[10px]' : 'bg-black/20'}`}
            onClick={() => setCurrentSlide(idx)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
