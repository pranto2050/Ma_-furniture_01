import { Category } from "../types";

export const categoriesArea: Record<string, Category[]> = {
    seating: [
        { id: "cat_001", name: "চেয়ার", nameEn: "Chair", icon: "🪑", description: "আরামদায়ক এবং টেকসই চেয়ার" },
        { id: "cat_005", name: "সোফা", nameEn: "Sofa", icon: "🛋️", description: "বসার ঘরে আভিজাত্যের ছোঁয়া" }
    ],
    surfaces: [
        { id: "cat_002", name: "টেবিল", nameEn: "Table", icon: "🪵", description: "অফিস ও বাড়ির জন্য আভিজাত্য টেবিল" }
    ],
    storage: [
        { id: "cat_007", name: "ওয়ার্ডরোব", nameEn: "Wardrobe", icon: "🗄️", description: "জিনিসপত্র গোছানোর সেরা সমাধান" },
        { id: "cat_008", name: "শেলফ", nameEn: "Shelf", icon: "📚", description: "বই ও শোপিস সাজানোর তাক" }
    ],
    openings: [
        { id: "cat_003", name: "দরজা", nameEn: "Door", icon: "🚪", description: "নিরাপত্তা ও সৌন্দর্যের মেলবন্ধন" },
        { id: "cat_004", name: "জানালা", nameEn: "Window", icon: "🪟", description: "আলো-বাতাসের জন্য নিখুঁত ডিজাইন" }
    ],
    sleeping: [
        { id: "cat_006", name: "বেড", nameEn: "Bed", icon: "🛏️", description: "গভীর ঘুমের জন্য প্রশান্তিদায়ক বিছানা" }
    ]
};

export const categories = Object.values(categoriesArea).flat();
