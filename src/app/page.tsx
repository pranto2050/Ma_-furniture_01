"use client";

import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FilterSection from '../components/FilterSection';
import TopSelling from '../components/TopSelling';
import CategorySection from '../components/CategorySection';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import SelectionBoard from '../components/SelectionBoard';
import ProductModal from '../components/ProductModal';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Contact from '../components/Contact';
import ProductCard from '../components/ProductCard';
import { products, categories, Product, contactData } from '../../public/data';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery' | 'results'>('home');
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<{ min: string, max: string }>({ min: '', max: '' });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isBoardOpen, setIsBoardOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('selectedDesigns');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTimeout(() => setSelectedItems(parsed), 0);
      } catch (e) {
        console.error("Failed to parse selectedDesigns", e);
      }
    }
  }, []);

  const toggleSelect = (id: string) => {
    const updated = selectedItems.includes(id) 
      ? selectedItems.filter(i => i !== id)
      : [...selectedItems, id];
    setSelectedItems(updated);
    localStorage.setItem('selectedDesigns', JSON.stringify(updated));
  };

  const handleProductClick = (id: string) => {
    const p = products.find(prod => prod.id === id);
    if (p) setModalProduct(p);
  };

  const navigateProduct = (dir: number) => {
    if (!modalProduct) return;
    const currentList = currentPage === 'results' ? filteredResults : products;
    const idx = currentList.findIndex(p => p.id === modalProduct.id);
    if (idx === -1) return;
    const nextIdx = (idx + dir + currentList.length) % currentList.length;
    setModalProduct(currentList[nextIdx]);
  };

  const showCategory = (catId: string) => {
    setSelectedCatId(catId);
    setPriceRange({ min: '', max: '' });
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilter = (catId: string, min: string, max: string) => {
    setSelectedCatId(catId === 'all' ? null : catId);
    setPriceRange({ min, max });
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentPage('results');
      setSelectedCatId(null);
      setPriceRange({ min: '', max: '' });
    } else {
      setCurrentPage('home');
    }
  };

  const filteredResults = products.filter(p => {
    const matchesSearch = !searchQuery.trim() || (
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    const matchesCategory = !selectedCatId || p.categoryId === selectedCatId;
    
    const matchesPrice = (
      (!priceRange.min || p.price >= parseInt(priceRange.min)) &&
      (!priceRange.max || p.price <= parseInt(priceRange.max))
    );

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header onNavigate={(page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero products={products} onProductClick={handleProductClick} />
            <FilterSection onSearch={handleSearch} onFilter={handleFilter} />
            <TopSelling products={products} onProductClick={handleProductClick} />
            
            {/* Render Category Sections as separate components */}
            <div id="categories">
              {categories.map(cat => (
                <CategorySection 
                  key={cat.id}
                  category={cat}
                  products={products.filter(p => p.categoryId === cat.id)}
                  onProductClick={handleProductClick}
                  onShowAll={showCategory}
                />
              ))}
            </div>

            <section id="gallery-preview" className="py-20 bg-white">
              <div className="max-w-container mx-auto px-5 text-center">
                <h2 className="section-title">ডিজাইন গ্যালারি</h2>
                <p className="mb-10 text-gray-medium">আমাদের কাজের কিছু খণ্ডচিত্র দেখুন এবং আপনার পছন্দমতো ডিজাইনটি বেছে নিন</p>
                <button 
                  className="bg-primary text-white px-8 py-3 rounded font-bold transition-all hover:bg-primary-dark"
                  onClick={() => {
                    setCurrentPage('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  সব ডিজাইন দেখুন →
                </button>
              </div>
            </section>

            {/* Order Process Section */}
            <section id="order-process" className="py-20 bg-bg scroll-mt-20">
              <div className="max-w-container mx-auto px-5">
                <h2 className="section-title">অর্ডার করার নিয়ম</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 relative">
                  {/* Connection Line (Desktop only) */}
                  <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 border-t-2 border-dotted border-accent/30 -z-10"></div>
                  
                  {[
                    { step: 1, icon: "🔍", title: "পণ্য বাছাই করুন", desc: "আমাদের গ্যালারি থেকে আপনার পছন্দের ডিজাইনটি সিলেক্ট করুন।" },
                    { step: 2, icon: "📱", title: "WhatsApp এ যোগাযোগ", desc: "পছন্দের পণ্যটির আইডি নিয়ে সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন।" },
                    { step: 3, icon: "✅", title: "অর্ডার নিশ্চিত করুন", desc: "আপনার নাম, ঠিকানা ও মোবাইল নম্বর দিয়ে অর্ডার কনফার্ম করুন।" },
                    { step: 4, icon: "🚚", title: "ডেলিভারি পান", desc: "আমরা দ্রুততম সময়ে আপনার ঠিকানায় পণ্য পৌঁছে দিব।" }
                  ].map((item) => (
                    <div key={item.step} className="bg-white p-8 rounded-xl shadow-sm text-center relative hover:shadow-md transition-all">
                      <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
                        {item.icon}
                      </div>
                      <div className="absolute top-4 right-4 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary-dark">{item.title}</h3>
                      <p className="text-gray-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-16 text-center">
                  <a 
                    href={getWhatsAppLink(contactData.whatsapp, "আসসালামু আলাইকুম, আমি ফার্নিচার সম্পর্কে জানতে চাই।")}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-10 py-4 rounded-full font-bold text-lg inline-flex items-center gap-3 hover:scale-105 transition-all shadow-lg"
                  >
                    <i className="fab fa-whatsapp text-2xl"></i> সরাসরি কথা বলতে ক্লিক করুন
                  </a>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <Contact />
          </>
        )}

        {currentPage === 'gallery' && (
          <Gallery 
            products={products} 
            onProductClick={handleProductClick} 
            selectedItems={selectedItems}
            onToggleSelect={toggleSelect}
          />
        )}

        {currentPage === 'results' && (
          <section className="py-20 bg-bg">
            <div className="max-w-container mx-auto px-5">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-[2.2rem] font-bold text-primary-dark">
                  {searchQuery ? `অনুসন্ধানের ফলাফল: "${searchQuery}"` : categories.find(c => c.id === selectedCatId)?.name}
                </h2>
                <button 
                  className="text-primary font-bold flex items-center gap-2"
                  onClick={() => {setCurrentPage('home'); setSearchQuery('');}}
                >
                  <i className="fas fa-arrow-left"></i> হোম এ ফিরে যান
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]">
                {filteredResults.length > 0 ? (
                  filteredResults.map(p => (
                    <ProductCard key={p.id} product={p} onClick={handleProductClick} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <i className="fas fa-search text-[3rem] text-[#ddd] mb-5"></i>
                    <p>দুঃখিত, কোনো পণ্য পাওয়া যায়নি!</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <SelectionBoard 
        selectedItems={selectedItems} 
        products={products} 
        onToggleSelect={toggleSelect} 
        onClear={() => {if(confirm("আপনি কি নিশ্চিত?")) {setSelectedItems([]); localStorage.removeItem('selectedDesigns');}}}
        isOpen={isBoardOpen}
        onToggleOpen={() => setIsBoardOpen(!isBoardOpen)}
      />

      <ProductModal 
        product={modalProduct} 
        onClose={() => setModalProduct(null)} 
        onNavigate={navigateProduct}
        hidePrice={currentPage === 'gallery'}
      />

      <FloatingWhatsApp />
    </div>
  );
}
