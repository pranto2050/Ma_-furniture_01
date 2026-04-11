export interface Category {
    id: string;
    name: string;
    nameEn: string;
    icon: string;
    description: string;
}

export interface Product {
    id: string;
    name: string;
    nameEn: string;
    categoryId: string;
    price: number;
    originalPrice?: number;
    images: string[];
    description: string;
    material: string;
    dimensions: string;
    color: string;
    inStock: boolean;
    isFeatured?: boolean;
    isTopSelling?: boolean;
    rating: number;
    reviewCount: number;
    tags: string[];
}

export interface ContactInfo {
    shopName: string;
    whatsapp: string;
    phone: string;
    location: string;
    email: string;
    openingHours: string;
}
