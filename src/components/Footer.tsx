import React from 'react';
import { categories, contactData } from '../../public/data';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white pt-20 pb-5">
      <div className="max-w-container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[50px] mb-[50px]">
          <div className="footer-logo">
            <h2 className="text-[2rem] mb-5 font-bold">{contactData.shopName}</h2>
            <p className="text-white/70">আমরা দীর্ঘ ১৫ বছর ধরে সুনামের সাথে মানসম্পন্ন এবং আধুনিক ডিজাইনের আসবাবপত্র তৈরি করে আসছি। আমাদের লক্ষ্য আপনার ঘরকে আভিজাত্যে ভরিয়ে তোলা।</p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all hover:bg-accent hover:-translate-y-1">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all hover:bg-accent hover:-translate-y-1">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all hover:bg-accent hover:-translate-y-1">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3 className="text-[1.2rem] mb-[25px] border-b-2 border-accent inline-block pb-[5px] font-bold">কুইক লিঙ্ক</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-accent hover:pl-1 transition-all">হোম</a></li>
              <li><a href="#gallery" className="text-white/80 hover:text-accent hover:pl-1 transition-all">ডিজাইন গ্যালারি</a></li>
              <li><a href="#order-process" className="text-white/80 hover:text-accent hover:pl-1 transition-all">অর্ডার প্রক্রিয়া</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-accent hover:pl-1 transition-all">যোগাযোগ</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3 className="text-[1.2rem] mb-[25px] border-b-2 border-accent inline-block pb-[5px] font-bold">ক্যাটাগরি</h3>
            <ul className="space-y-3">
              {categories.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <a href={`#category-${cat.id}`} className="text-white/80 hover:text-accent hover:pl-1 transition-all">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-links">
            <h3 className="text-[1.2rem] mb-[25px] border-b-2 border-accent inline-block pb-[5px] font-bold">যোগাযোগ</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex gap-2.5">
                <i className="fas fa-map-marker-alt mt-1 text-accent"></i>
                <span>{contactData.location}</span>
              </li>
              <li className="flex gap-2.5">
                <i className="fas fa-phone-alt mt-1 text-accent"></i>
                <span>{contactData.phone}</span>
              </li>
              <li className="flex gap-2.5">
                <i className="fas fa-envelope mt-1 text-accent"></i>
                <span>{contactData.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-[30px] border-t border-white/10 text-center text-[0.9rem] text-white/70">
          <p>© {new Date().getFullYear()} {contactData.shopName} | সর্বস্বত্ব সংরক্ষিত</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
