import React from 'react';
import { contactData } from '../../public/data';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-container mx-auto px-5">
        <h2 className="section-title">আমাদের সাথে যোগাযোগ করুন</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-bg rounded-lg flex items-center justify-center text-primary shrink-0">
                <i className="fas fa-map-marker-alt text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">ঠিকানা</h3>
                <p className="text-gray-medium">{contactData.location}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-bg rounded-lg flex items-center justify-center text-primary shrink-0">
                <i className="fas fa-phone-alt text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">ফোন</h3>
                <p className="text-gray-medium">{contactData.phone}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-bg rounded-lg flex items-center justify-center text-primary shrink-0">
                <i className="fab fa-whatsapp text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">হোয়াটসঅ্যাপ</h3>
                <p className="text-gray-medium">{contactData.whatsapp}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-bg rounded-lg flex items-center justify-center text-primary shrink-0">
                <i className="fas fa-clock text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">কর্মঘণ্টা</h3>
                <p className="text-gray-medium">{contactData.openingHours}</p>
              </div>
            </div>
          </div>
          <div className="h-[400px] bg-bg rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border-2 border-dashed border-[#ddd]">
            <div className="text-center p-10">
              <i className="fas fa-map-marked-alt text-5xl text-[#ccc] mb-4"></i>
              <p className="text-gray-medium font-medium">Google Maps API integrated soon...</p>
              <button className="mt-4 text-primary font-bold hover:underline">ম্যাপে আমাদের অবস্থান দেখুন</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
