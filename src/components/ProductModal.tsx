import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, contactData } from '../../public/data';
import { getWhatsAppLink } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigate: (dir: number) => void;
  hidePrice?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onNavigate, hidePrice }) => {
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  // Reset local state when product changes without using useEffect for state updates
  // This is a pattern recommended by React docs for resetting state on prop change
  const [prevProduct, setPrevProduct] = useState<Product | null>(null);
  if (product !== prevProduct) {
    setQty(1);
    setActiveThumb(0);
    setPrevProduct(product);
  }

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [product]);

  if (!product) return null;

  const updateQty = (dir: number) => {
    setQty(prev => Math.max(1, prev + dir));
  };

  const orderWhatsApp = () => {
    const text = `আসসালামু আলাইকুম, আমি এই পণ্যটি অর্ডার করতে চাই:\n\nপণ্য: ${product.name}\nআইডি: ${product.id}\nপরিমাণ: ${qty}\nদাম: ৳${(product.price * qty).toLocaleString()}`;
    window.open(getWhatsAppLink(contactData.whatsapp, text), '_blank');
  };

  const copyInfo = () => {
    const info = `পণ্য: ${product.name}\nআইডি: ${product.id}\nদাম: ৳${product.price}\nউপাদান: ${product.material}\nমাপ: ${product.dimensions}`;
    navigator.clipboard.writeText(info).then(() => alert("তথ্য কপি হয়েছে!"));
  };

  const downloadActiveImage = () => {
    const url = product.images[activeThumb];
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${product.id}-${product.name}-${activeThumb + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(console.error);
  };

  return (
    <div className={`fixed inset-0 bg-black/90 z-2000 flex items-center justify-center transition-opacity duration-300 ${product ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} backdrop-blur-sm`}>
      <div className={`bg-white w-[95%] max-w-[1100px] max-h-[95vh] rounded-[25px] relative flex flex-col md:flex-row overflow-hidden transition-all duration-500 shadow-2xl ${product ? 'scale-100' : 'scale-90'}`}>
        
        {/* Close Button */}
        <button 
          className="absolute top-6 right-6 w-12 h-12 bg-black/10 hover:bg-black/20 text-black rounded-full flex items-center justify-center cursor-pointer z-50 transition-all"
          onClick={onClose}
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        {/* Navigation Buttons */}
        <button 
          className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 bg-white/90 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer z-40 shadow-xl hover:bg-primary hover:text-white transition-all group"
          onClick={() => onNavigate(-1)}
        >
          <i className="fas fa-chevron-left text-xl group-hover:-translate-x-1 transition-transform"></i>
        </button>
        <button 
          className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 bg-white/90 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer z-40 shadow-xl hover:bg-primary hover:text-white transition-all group"
          onClick={() => onNavigate(1)}
        >
          <i className="fas fa-chevron-right text-xl group-hover:translate-x-1 transition-transform"></i>
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-[50%] p-6 md:p-10 bg-[#f8f9fa] flex flex-col">
          <div className="flex-1 relative mb-6 overflow-hidden rounded-[20px] shadow-inner group/img">
            <Image 
              src={product.images[activeThumb]} 
              alt={product.name} 
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover transition-transform duration-700 hover:scale-110" 
            />
            <button 
              className="absolute bottom-4 right-4 bg-white/95 text-primary-dark w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all z-20"
              title="ডাউনলোড করুন"
              onClick={downloadActiveImage}
            >
              <i className="fas fa-download text-xl"></i>
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                className={`min-w-[80px] h-[80px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-105 relative ${idx === activeThumb ? 'border-primary shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                onClick={() => setActiveThumb(idx)}
              >
                <Image 
                  src={img} 
                  alt={`${product.name} view ${idx + 1}`} 
                  fill
                  sizes="80px"
                  className="object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-[50%] p-8 md:p-12 overflow-y-auto flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent/10 text-accent px-4 py-2 rounded-xl font-bold text-sm tracking-wider flex items-center gap-2">
              <i className="fas fa-fingerprint"></i> ID: #{product.id}
            </span>
            <button 
              className="bg-bg hover:bg-primary hover:text-white text-primary-dark px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-sm"
              onClick={() => {
                navigator.clipboard.writeText(product.id);
                alert("আইডি কপি হয়েছে!");
              }}
            >
              <i className="far fa-copy"></i> কপি আইডি
            </button>
          </div>
          
          <h2 className="text-[2.5rem] text-primary-dark font-black mb-6 leading-tight">{product.name}</h2>
          
          {!hidePrice && (
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[2.5rem] font-black text-primary">৳{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-[1.1rem] text-gray-medium line-through">৳{product.originalPrice.toLocaleString()}</span>
                  <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-0.5 rounded">SAVE {Math.round((1 - product.price/product.originalPrice)*100)}%</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-y-4 mb-8 bg-bg/50 p-6 rounded-2xl border border-bg">
            <div className="flex flex-col">
              <span className="text-gray-medium text-xs font-bold uppercase tracking-widest mb-1">উপাদান</span>
              <span className="font-bold text-primary-dark">{product.material}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-medium text-xs font-bold uppercase tracking-widest mb-1">মাপ</span>
              <span className="font-bold text-primary-dark">{product.dimensions}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-medium text-xs font-bold uppercase tracking-widest mb-1">রঙ</span>
              <span className="font-bold text-primary-dark">{product.color}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-medium text-xs font-bold uppercase tracking-widest mb-1">স্টক</span>
              <span className="font-bold text-[#25D366]">পাওয়া যাচ্ছে</span>
            </div>
          </div>

          <p className="mb-10 text-gray-600 leading-relaxed text-[1.05rem]">{product.description}</p>

          <div className="mt-auto flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-primary-dark">অর্ডার পরিমাণ:</span>
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-xl font-bold" onClick={() => updateQty(-1)}>−</button>
                <span className="w-12 text-center font-black text-lg">{qty}</span>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-xl font-bold" onClick={() => updateQty(1)}>+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="flex-[1.5] bg-[#25D366] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-[#25D366]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                onClick={orderWhatsApp}
              >
                <i className="fab fa-whatsapp text-2xl"></i> WhatsApp অর্ডার
              </button>
              <button 
                className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                onClick={downloadActiveImage}
              >
                <i className="fas fa-download"></i> ডাউনলোড
              </button>
              <button 
                className="flex-1 border-2 border-primary/20 text-primary-dark py-4 rounded-2xl font-bold hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2"
                onClick={copyInfo}
              >
                <i className="far fa-copy"></i> তথ্য কপি
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
