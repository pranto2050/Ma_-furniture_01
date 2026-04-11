import { useState, type FormEvent } from 'react';
import { categories, contactData } from '../../public/data';

const Logo = () => (
  <a href="#" className="flex items-center gap-2.5">
    <i className="fas fa-chair text-[2rem] text-primary"></i>
    <div className="logo-text">
      <h1 className="text-[1.5rem] text-primary font-bold leading-none">{contactData.shopName}</h1>
      <span className="text-[0.8rem] text-gray-medium">মানসম্পন্ন আসবাবপত্র</span>
    </div>
  </a>
);

interface HeaderProps {
  onNavigate?: (page: 'home' | 'gallery') => void;
  onSearch?: (query: string) => void;
}

const Nav = ({ onMobileClose, onNavigate }: { onMobileClose?: () => void, onNavigate?: (page: 'home' | 'gallery') => void }) => (
  <ul className="flex flex-col md:flex-row gap-6">
    <li>
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.('home');
          onMobileClose?.();
        }} 
        className="font-medium transition-all hover:text-accent"
      >
        হোম
      </a>
    </li>
    <li className="relative group">
      <a 
        href="#categories" 
        onClick={() => {
          onNavigate?.('home');
          onMobileClose?.();
        }} 
        className="font-medium transition-all hover:text-accent flex items-center gap-1"
      >
        ক্যাটাগরি <i className="fas fa-chevron-down text-[0.8rem] hidden md:block"></i>
      </a>
      <ul className="md:absolute md:top-full md:left-0 bg-white md:min-w-50 md:shadow-lg z-10 py-2.5 md:border-t-3 md:border-accent md:hidden md:group-hover:block pl-5 md:pl-0">
        {categories.map((cat) => (
          <li key={cat.id}>
            <a 
              href={`#category-${cat.id}`} 
              onClick={() => {
                onNavigate?.('home');
                onMobileClose?.();
              }} 
              className="block px-5 py-2.5 transition-all hover:bg-gray-light"
            >
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
    <li>
      <a 
        href="#gallery" 
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.('gallery');
          onMobileClose?.();
        }} 
        className="font-medium transition-all hover:text-accent"
      >
        ডিজাইন গ্যালারি
      </a>
    </li>
    <li><a href="#order-process" onClick={() => { onNavigate?.('home'); onMobileClose?.(); }} className="font-medium transition-all hover:text-accent">অর্ডার প্রক্রিয়া</a></li>
    <li><a href="#contact" onClick={() => { onNavigate?.('home'); onMobileClose?.(); }} className="font-medium transition-all hover:text-accent">যোগাযোগ</a></li>
  </ul>
);

const Header = ({ onNavigate, onSearch }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-white py-4 sticky top-0 z-1000 shadow-sm transition-all">
      <div className="max-w-container mx-auto px-5 flex justify-between items-center">
        <Logo />
        
        <nav className="hidden md:block">
          <Nav onNavigate={onNavigate} />
        </nav>

        <div className="flex gap-5 items-center relative">
          <button
            type="button"
            className="text-[1.2rem] cursor-pointer transition-all hover:text-accent"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Search products"
          >
            <i className="fas fa-search"></i>
          </button>

          {isSearchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="absolute top-full right-0 mt-3 w-[calc(100vw-2rem)] sm:w-70 bg-white border border-gray-200 rounded-xl shadow-lg p-2 flex items-center gap-2 z-50"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্যের নাম বা আইডি"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary-dark transition-all"
              >
                খুঁজুন
              </button>
            </form>
          )}

          <div className="md:hidden text-[1.5rem] cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-10 px-5 transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <Nav onNavigate={onNavigate} onMobileClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
export { Logo };
