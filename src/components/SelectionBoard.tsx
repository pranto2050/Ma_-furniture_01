import React from 'react';
import Image from 'next/image';
import { Product, contactData } from '../../public/data';
import { getWhatsAppLink } from '../utils/whatsapp';

interface SelectionBoardProps {
  selectedItems: string[];
  products: Product[];
  onToggleSelect: (id: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const SelectionBoard: React.FC<SelectionBoardProps> = ({ 
  selectedItems, 
  products, 
  onToggleSelect, 
  onClear,
  isOpen,
  onToggleOpen
}) => {
  const selectedProducts = products.filter(p => selectedItems.includes(p.id));

  const orderBoardWhatsApp = () => {
    const itemDetails = selectedProducts.map(p => `${p.name} (ID: ${p.id})`).join('\n- ');
    const text = `আসসালামু আলাইকুম, আমি নিচের ডিজাইনগুলো পছন্দ করেছি এবং এগুলোর ব্যাপারে জানতে চাই:\n\n- ${itemDetails}\n\nধন্যবাদ।`;
    window.open(getWhatsAppLink(contactData.whatsapp, text), '_blank');
  };

  if (selectedItems.length === 0) return null;

  return (
    <>
      {/* Floating Button */}
      <div 
        className="fixed bottom-[100px] right-[30px] z-998 cursor-pointer"
        onClick={onToggleOpen}
      >
        <div className="bg-primary-dark text-white px-[25px] py-3 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.3)] flex items-center gap-2.5 font-bold transition-all hover:scale-105 active:scale-95">
          <i className="fas fa-heart text-[#e74c3c]"></i>
          আপনার পছন্দ
          <span className="bg-[#e74c3c] w-6 h-6 rounded-full flex items-center justify-center text-[0.75rem] font-bold">
            {selectedItems.length}
          </span>
        </div>
      </div>

      {/* Modal */}
      <div className={`fixed inset-0 bg-black/90 z-2000 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} backdrop-blur-sm`}>
        <div className={`bg-white w-[95%] max-w-[600px] rounded-[25px] p-8 md:p-10 transition-all duration-300 shadow-2xl ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="flex justify-between items-center mb-8 pb-5 border-b border-[#eee]">
            <h2 className="text-[1.8rem] font-black text-primary-dark flex items-center gap-3">
              <i className="fas fa-heart text-[#e74c3c]"></i> পছন্দের ডিজাইন
            </h2>
            <button 
              className="w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center cursor-pointer transition-all border-none"
              onClick={onToggleOpen}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-10 max-h-[350px] overflow-y-auto p-2 scrollbar-hide">
            {selectedProducts.map(p => (
              <div key={p.id} className="relative rounded-2xl overflow-hidden aspect-square border-2 border-bg shadow-sm group">
                <Image 
                  src={p.images[0]} 
                  alt={p.name} 
                  fill
                  sizes="(max-width: 640px) 33vw, 150px"
                  className="object-cover transition-transform group-hover:scale-110" 
                />
                <button 
                  className="absolute top-2 right-2 bg-white/90 text-[#e74c3c] w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-none cursor-pointer z-10 transition-all hover:bg-[#e74c3c] hover:text-white"
                  title="সরিয়ে ফেলুন"
                  onClick={() => onToggleSelect(p.id)}
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
                <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-[10px] py-1 text-center font-bold z-10">
                  #{p.id}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button 
              className="bg-[#25D366] text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              onClick={orderBoardWhatsApp}
            >
              <i className="fab fa-whatsapp text-2xl"></i> সবগুলোর ব্যাপারে জানতে চাই
            </button>
            <div className="flex gap-4">
              <button 
                className="flex-1 py-4 border-2 border-primary/20 text-primary-dark rounded-2xl font-bold transition-all hover:bg-primary hover:text-white hover:border-primary"
                onClick={onToggleOpen}
              >
                আরো ডিজাইন দেখুন
              </button>
              <button 
                className="flex-1 py-4 border-2 border-[#e74c3c]/20 text-[#e74c3c] rounded-2xl font-bold transition-all hover:bg-[#e74c3c] hover:text-white hover:border-[#e74c3c]"
                onClick={onClear}
              >
                বোর্ড খালি করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectionBoard;
