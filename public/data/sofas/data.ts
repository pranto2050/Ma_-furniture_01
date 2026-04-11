import { Product } from "../types";

export const sofas: Product[] = [
    { id: "PRD-501", name: "৩ সিটার আরামদায়ক সোফা", nameEn: "3 Seater Comfortable Sofa", categoryId: "cat_005", price: 35000, originalPrice: 42000, images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1470&auto=format&fit=crop"], description: "উন্নত মানের ফোম ও ফেব্রিক দিয়ে তৈরি।", material: "কাঠ ও ফেব্রিক", dimensions: "210x90x85cm", color: "গ্রে", inStock: true, isFeatured: true, isTopSelling: true, rating: 4.7, reviewCount: 40, tags: ["sofa", "living", "comfort"] },
    { id: "PRD-502", name: "এল-শেপ কর্নার সোফা", nameEn: "L-Shape Corner Sofa", categoryId: "cat_005", price: 55000, originalPrice: 65000, images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1470&auto=format&fit=crop"], description: "বেশি জায়গার জন্য উপযুক্ত এবং আরামদায়ক।", material: "কাঠ ও ভেলভেট", dimensions: "250x180x85cm", color: "নেভি ব্লু", inStock: true, isFeatured: true, isTopSelling: false, rating: 4.8, reviewCount: 15, tags: ["sofa", "luxury", "corner"] },
    { id: "PRD-503", name: "সোফা কাম বেড", nameEn: "Sofa Cum Bed", categoryId: "cat_005", price: 28000, originalPrice: 35000, images: ["https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1474&auto=format&fit=crop"], description: "প্রয়োজনে সোফা আবার প্রয়োজনে বিছানা।", material: "মেটাল ও ফোম", dimensions: "190x100x85cm", color: "মেরুন", inStock: true, isFeatured: false, isTopSelling: true, rating: 4.5, reviewCount: 28, tags: ["sofa", "bed", "multipurpose"] },
    { 
        id: "PRD-504", 
        name: "সিঙ্গেল সিটার সোফা", 
        nameEn: "Single Seater Sofa", 
        categoryId: "cat_005", 
        price: 12000, 
        originalPrice: 15000, 
        images: [
            "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1480&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1480&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1480&auto=format&fit=crop"
        ], 
        description: "অফিস বা বসার ঘরের জন্য কমপ্যাক্ট সোফা।", 
        material: "কাঠ ও লেদার", 
        dimensions: "90x90x85cm", 
        color: "কালো", 
        inStock: true, 
        isFeatured: false, 
        isTopSelling: false, 
        rating: 4.3, 
        reviewCount: 12, 
        tags: ["sofa", "office", "leather"] 
    },
    { id: "PRD-505", name: "ভিক্টোরিয়ান স্টাইল সোফা সেট", nameEn: "Victorian Style Sofa Set", categoryId: "cat_005", price: 85000, originalPrice: 100000, images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1470&auto=format&fit=crop"], description: "রাজকীয় ডিজাইনের সম্পূর্ণ সোফা সেট।", material: "সেগুন কাঠ ও ভেলভেট", dimensions: "Set", color: "গোল্ডেন", inStock: true, isFeatured: true, isTopSelling: true, rating: 4.9, reviewCount: 20, tags: ["sofa", "luxury", "victorian"] }
];
