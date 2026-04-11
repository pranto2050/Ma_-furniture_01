import React from 'react';
import { categories } from '../../public/data';

interface FilterSectionProps {
  onApply: (query: string, catId: string, minPrice: string, maxPrice: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onApply }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [catId, setCatId] = React.useState('all');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');

  const handleFilterChange = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(searchQuery, catId, minPrice, maxPrice);
  };

  return (
    <section className="bg-white py-10 -mt-[50px] relative z-20 max-w-container mx-auto px-5">
      <div className="bg-white p-[30px] rounded-[20px] shadow-[0_15px_50px_rgba(0,0,0,0.1)] border border-[#f0f0f0]">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-5 items-center" onSubmit={handleFilterChange}>
          <div className="flex flex-col gap-2.5 relative">
            <label className="font-bold text-[0.85rem] text-primary-dark uppercase tracking-[1px] flex items-center gap-2">
              <i className="fas fa-search text-accent"></i> অনুসন্ধান
            </label>
            <div className="relative flex items-center">
              <i className="fas fa-search absolute left-[15px] text-gray-medium"></i>
              <input 
                type="text" 
                placeholder="পণ্যের নাম বা আইডি দিয়ে খুঁজুন..." 
                className="w-full pl-10 pr-[15px] py-3.5 border-2 border-[#f5f5f5] rounded-xl outline-none text-[0.95rem] bg-[#fcfcfc] transition-all focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,168,83,0.1)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 relative">
            <label className="font-bold text-[0.85rem] text-primary-dark uppercase tracking-[1px] flex items-center gap-2">
              <i className="fas fa-th-large text-accent"></i> ক্যাটাগরি
            </label>
            <select 
              className="w-full px-[15px] py-3.5 border-2 border-[#f5f5f5] rounded-xl outline-none text-[0.95rem] bg-[#fcfcfc] transition-all focus:border-accent focus:bg-white appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23888%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-position-[right_15px_center] bg-size-[18px]"
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
            >
              <option value="all">সব ক্যাটাগরি</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2.5 relative">
            <label className="font-bold text-[0.85rem] text-primary-dark uppercase tracking-[1px] flex items-center gap-2">
              <i className="fas fa-money-bill-wave text-accent"></i> সর্বনিম্ন
            </label>
            <input 
              type="number" 
              placeholder="৳ ০" 
              className="w-full px-[15px] py-3.5 border-2 border-[#f5f5f5] rounded-xl outline-none text-[0.95rem] bg-[#fcfcfc] transition-all focus:border-accent focus:bg-white"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2.5 relative">
            <label className="font-bold text-[0.85rem] text-primary-dark uppercase tracking-[1px] flex items-center gap-2">
              <i className="fas fa-money-bill-wave text-accent"></i> সর্বোচ্চ
            </label>
            <input 
              type="number" 
              placeholder="৳ ১,০০,০০০+" 
              className="w-full px-[15px] py-3.5 border-2 border-[#f5f5f5] rounded-xl outline-none text-[0.95rem] bg-[#fcfcfc] transition-all focus:border-accent focus:bg-white"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="bg-primary text-white w-[55px] h-[55px] rounded-[15px] flex items-center justify-center cursor-pointer transition-all hover:bg-primary-dark hover:-translate-y-[3px] hover:rotate-90 hover:shadow-[0_15px_25px_rgba(139,69,19,0.3)] mt-6"
          >
            <i className="fas fa-search text-[1.2rem]"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default FilterSection;
