import React from 'react';
import Image from 'next/image';
import { Product, contactData } from '../../public/data';
import { getWhatsAppLink } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
  isTopSelling?: boolean;
}

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<i key={i} className="fas fa-star text-[#FFD700]"></i>);
    } else if (i - 0.5 <= rating) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-[#FFD700]"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star text-[#FFD700]"></i>);
    }
  }
  return stars;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, isTopSelling }) => {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  const badge = discount > 0 
    ? <div className="absolute top-[15px] left-[15px] bg-accent text-white px-3 py-1 rounded text-[0.8rem] font-bold z-10">-{discount}% ছাড়</div> 
    : (isTopSelling ? <div className="absolute top-[15px] left-[15px] bg-[#e74c3c] text-white px-3 py-1 rounded text-[0.8rem] font-bold z-10">🔥 সেরা পছন্দ</div> : null);

  return (
    <div 
      className="bg-white rounded-[10px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-lg relative cursor-pointer group"
      onClick={() => onClick(product.id)}
    >
      {badge}
      <div 
        className="absolute top-[15px] right-[15px] bg-[#25D366] text-white w-10 h-10 rounded-full flex items-center justify-center text-[1.2rem] cursor-pointer z-10 opacity-0 -translate-y-[10px] transition-all group-hover:opacity-100 group-hover:translate-y-0"
        onClick={(e) => {
          e.stopPropagation();
          const text = `আসসালামু আলাইকুম, আমি এই পণ্যটি সম্পর্কে জানতে চাই:\n\nপণ্য: ${product.name}\nআইডি: ${product.id}\nদাম: ৳${product.price}`;
          window.open(getWhatsAppLink(contactData.whatsapp, text), '_blank');
        }}
      >
        <i className="fab fa-whatsapp"></i>
      </div>
      <div className="h-[250px] overflow-hidden relative">
        <Image 
          src={product.images[0]} 
          alt={product.name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <div className="p-5">
        <div className="text-[0.75rem] text-gray-medium mb-1.5">#{product.id}</div>
        <div className="text-[1.1rem] font-bold mb-2.5 text-primary-dark">{product.name}</div>
        <div className="text-[0.9rem] mb-2.5">
          {renderStars(product.rating)} <span className="text-gray-medium">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2.5 mb-5">
          <span className="text-[1.2rem] font-bold text-primary">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-[0.9rem] text-gray-medium line-through">৳{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button className="w-full py-2 border-2 border-primary text-primary font-bold rounded transition-all hover:bg-primary hover:text-white">
          বিস্তারিত দেখুন
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
