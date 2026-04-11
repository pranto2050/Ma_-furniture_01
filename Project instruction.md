Create a complete single-file HTML/CSS/JavaScript furniture e-commerce website 
for a Bangladeshi furniture business. The website must be fully functional, 
visually stunning, mobile-responsive, and production-ready.

---

## 🎨 DESIGN REQUIREMENTS

- Modern, premium feel with warm wood-tone color palette
  (Primary: #8B4513 or #5C3317, Accent: #D4A853, Background: #FAF7F2, 
   Text: #2C2C2C, White: #FFFFFF)
- Clean typography using Google Fonts (Hind Siliguri for Bangla support + 
  Poppins for English)
- Smooth animations, hover effects, transitions throughout
- Fully responsive: mobile, tablet, desktop
- Sticky header with shadow on scroll

---

## 🗂️ DATA STRUCTURE (Array-based, no backend)

### Categories Array:
const categories = [
  { id: "cat_001", name: "চেয়ার", nameEn: "Chair", icon: "🪑", description: "..." },
  { id: "cat_002", name: "টেবিল", nameEn: "Table", icon: "🪵", description: "..." },
  { id: "cat_003", name: "দরজা", nameEn: "Door", icon: "🚪", description: "..." },
  { id: "cat_004", name: "জানালা", nameEn: "Window", icon: "🪟", description: "..." },
  { id: "cat_005", name: "সোফা", nameEn: "Sofa", icon: "🛋️", description: "..." },
  { id: "cat_006", name: "বেড", nameEn: "Bed", icon: "🛏️", description: "..." },
  { id: "cat_007", name: "ওয়ার্ডরোব", nameEn: "Wardrobe", icon: "🗄️", description: "..." },
  { id: "cat_008", name: "শেলফ", nameEn: "Shelf", icon: "📚", description: "..." }
];

### Products Array (separate array per category, also a merged allProducts array):
Each product object must have:
{
  id: "PRD-001",           // Unique product ID
  name: "রয়্যাল অফিস চেয়ার", 
  nameEn: "Royal Office Chair",
  categoryId: "cat_001",
  price: 8500,             // in BDT
  originalPrice: 10000,    // for discount display
  images: ["url1", "url2"], // Array of image URLs (use placeholder images)
  description: "বিস্তারিত বিবরণ...",
  material: "সেগুন কাঠ",
  dimensions: "60cm x 60cm x 90cm",
  color: "বাদামী",
  inStock: true,
  isFeatured: true,        // for hero slider & top selling
  isTopSelling: true,
  rating: 4.5,
  reviewCount: 23,
  tags: ["office", "chair", "premium"]
}

Create at least 5-6 sample products per category (minimum 40 total products).
Use realistic Bangladeshi furniture product names, prices in BDT.
Use placeholder image URLs from: https://placehold.co/600x400/8B4513/white?text=ProductName

---

## 📄 PAGE SECTIONS (Single Page Application)

### 1. HEADER (Sticky, fixed top)
- LEFT: Company logo area — a designed SVG/CSS logo with a small chair icon + 
  "আল-আমিন ফার্নিচার" (company name) + tagline "মানসম্পন্ন আসবাবপত্র"
- RIGHT: Navigation menu with items:
  • হোম (Home)
  • ক্যাটাগরি (Categories) — dropdown showing all categories on hover
  • অর্ডার প্রক্রিয়া (Order Process)
  • যোগাযোগ (Contact)
  • 🔍 Search icon button (opens a full search bar overlay)
- Mobile: hamburger menu with slide-in drawer
- A thin top bar above header showing: "📞 01XXXXXXXXX | 📍 ঢাকা, বাংলাদেশ"

### 2. HERO SLIDER SECTION
- Full-width slider with 5 featured products
- Each slide: large product image (left 60%) + product info (right 40%)
  - Product name, short description, price, "এখনই অর্ডার করুন" button
- Left/Right arrow navigation buttons
- Dot indicators at bottom
- Auto-slides every 4 seconds (left to right direction)
- Smooth fade or slide transition
- Pause on hover

### 3. SEARCH & FILTER BAR (below hero, always visible)
- Search input: "পণ্যের নাম বা আইডি দিয়ে খুঁজুন..." 
- Category filter dropdown
- Price range filter (min-max BDT)
- Sort by: (নতুন, দাম কম-বেশি, জনপ্রিয়)
- "খুঁজুন" button
- Search works on: product ID (exact match), product name (partial match), 
  product nameEn (partial match)
- Results show below in a grid with count: "১৫টি পণ্য পাওয়া গেছে"

### 4. TOP SELLING PRODUCTS SECTION
- Section title: "🔥 সর্বাধিক বিক্রিত পণ্য"
- Horizontal auto-scrolling row (marquee-style with pause on hover)
- Show products where isTopSelling: true
- Each product card: image, name, price, "দেখুন" button
- Left/right arrow buttons to manually scroll

### 5. CATEGORY SECTIONS (one section per category, displayed sequentially)
For each category:
- Section header: category icon + category name (Bangla) + 
  "সকল [category] দেখুন →" button (right aligned)
- Horizontal auto-sliding product row (slides every 3 seconds)
- Show 6-8 products per row, user can also click arrows to navigate
- Each product card (see product card design below)
- "আরও দেখুন" button at bottom-right → navigates to full category page view

### 6. ORDER PROCESS SECTION (id="order-process")
- Section title: "অর্ডার করার নিয়ম"
- 4 step cards in a row:
  Step 1: 🔍 পণ্য বাছাই করুন
  Step 2: 📱 WhatsApp এ যোগাযোগ করুন  
  Step 3: ✅ অর্ডার নিশ্চিত করুন
  Step 4: 🚚 ডেলিভারি পান
- Each step: icon, number, title, short description
- Connected with dotted line between steps
- WhatsApp number prominently displayed

### 7. CONTACT SECTION (id="contact")
- Company info: name, address, phone, WhatsApp
- A WhatsApp CTA button: "WhatsApp এ মেসেজ করুন" (green button with WA icon)
- Business hours
- Google Maps embed placeholder

### 8. FOOTER
- Logo + company description
- Quick links column
- Categories column  
- Contact info column
- Copyright: "© 2024 আল-আমিন ফার্নিচার। সর্বস্বত্ব সংরক্ষিত।"
- WhatsApp floating button (fixed bottom-right, always visible, pulsing animation)

---

## 🃏 PRODUCT CARD DESIGN
Each card must have:
- Product image (hover: slight zoom effect)
- Top-left badge: "বিক্রয়" (if discount) or "নতুন" or "জনপ্রিয়"
- Product ID (small, muted): #PRD-001
- Product name (Bangla, bold)
- Star rating display (filled stars)
- Price: ৳৮,৫০০ (strike through original price if discounted)
- "বিস্তারিত দেখুন" button
- Quick WhatsApp order icon button (top-right corner, on hover)
- Smooth shadow/border on hover

---

## 📦 PRODUCT DETAIL MODAL
When any product card is clicked, open a full-screen overlay modal:

LEFT SIDE (40%):
- Large product image
- Small thumbnail images below (if multiple images) — click to change main image
- Image zoom on hover

RIGHT SIDE (60%):
- Product ID: #PRD-001 (copyable)
- Product name (large, Bangla)
- Star rating + review count
- Price (large) with original price strikethrough
- Discount percentage badge
- Divider line
- Details table:
  • উপাদান (Material)
  • মাপ (Dimensions)  
  • রঙ (Color)
  • স্টক (In Stock: ✅ পাওয়া যাচ্ছে)
- Description paragraph
- Quantity selector (+ / - buttons, min 1)
- TWO buttons side by side:
  1. 📱 "WhatsApp এ অর্ডার করুন" (GREEN, large)
     → Opens: https://wa.me/8801XXXXXXXXX?text=আমি%20[ProductName]%20(ID:%20[ProductID])%20অর্ডার%20করতে%20চাই।%20পরিমাণ:%20[Qty]
  2. 📋 "তথ্য কপি করুন" (OUTLINE button)
     → Copies product info to clipboard
- Close (×) button top-right
- Click outside modal to close
- ESC key to close

---

## 🔍 SEARCH FUNCTIONALITY
- Real-time search as user types (with 300ms debounce)
- Search by: Product ID (PRD-001 format), Bangla name, English name, tags
- Filter by category dropdown
- Filter by price range slider
- Sort options: newest, price low-high, price high-low, most popular
- Show "কোন পণ্য পাওয়া যায়নি" message with icon if no results
- Search results page shows as a full grid replacing homepage content
- "← হোমে ফিরে যান" back button

---

## 📱 CATEGORY PAGE VIEW
When "আরও দেখুন" or category menu clicked:
- Show full category page with all products in a responsive grid (3 cols desktop, 
  2 cols tablet, 1 col mobile)
- Category banner with name and product count
- All filter/sort options available
- Breadcrumb: হোম > চেয়ার
- "← ফিরে যান" button

---

## ⚙️ ADMIN PANEL (Hidden, accessible via URL hash #admin or button combo)
- Password protected (simple JS password: "admin123")
- Sections:
  1. পণ্য যোগ করুন (Add Product form)
  2. পণ্য সম্পাদনা/মুছুন (Edit/Delete products - show list)
  3. ক্যাটাগরি পরিচালনা (Add/Edit/Delete categories)
- Changes update the in-memory arrays (with note: "পেজ রিলোড করলে পরিবর্তন মুছে যাবে")
- Export button: "ডেটা কপি করুন (JSON)" — copies current arrays as JSON to clipboard
  so developer can paste into code manually

---

## 📲 WHATSAPP INTEGRATION
- Business WhatsApp number: 01700000000 (replace placeholder)
- All order buttons generate pre-filled WhatsApp messages in Bangla:
  "আসসালামু আলাইকুম, আমি [পণ্যের নাম] (পণ্য ID: PRD-XXX) 
   অর্ডার করতে চাই। পরিমাণ: X টি। দয়া করে আমাকে বিস্তারিত জানান।"
- Floating WhatsApp button always visible with tooltip "অর্ডার করুন"
- Pulse/ring animation on the floating button

---

## 🎭 ANIMATIONS & UX
- Page load: fade-in animation
- Scroll reveal: sections fade up as they enter viewport (use Intersection Observer)
- Product cards: staggered entrance animation
- Slider: smooth CSS transitions
- Modal: scale + fade in animation
- Loading skeleton cards while "loading" (simulate 500ms)
- Smooth scroll for anchor navigation
- Toast notification: "✅ লিংক কপি হয়েছে!" when copy buttons clicked
- Active category highlight in navigation

---

## 🛠️ TECHNICAL REQUIREMENTS
- Pure HTML + CSS + Vanilla JavaScript (NO frameworks, NO jQuery)
- Single HTML file (all CSS in <style>, all JS in <script>)
- Font Awesome 6 CDN for icons
- Google Fonts CDN (Hind Siliguri + Poppins)
- CSS custom properties (variables) for theming
- LocalStorage: save last visited category, recently viewed products (max 5)
- All placeholder images from: https://placehold.co/
- Mobile-first CSS with breakpoints at 768px and 1024px
- Semantic HTML5 elements
- Accessible: aria-labels, keyboard navigation for modal

---

## 📝 SAMPLE DATA TO INCLUDE

Populate with realistic Bangladeshi furniture items:

CHAIRS (cat_001): অফিস চেয়ার, ডাইনিং চেয়ার, রকিং চেয়ার, 
                   বসার ঘরের চেয়ার, বাচ্চাদের চেয়ার, ফোল্ডিং চেয়ার

TABLES (cat_002): ডাইনিং টেবিল, অফিস ডেস্ক, কফি টেবিল, 
                   স্টাডি টেবিল, ড্রেসিং টেবিল, সাইড টেবিল

DOORS (cat_003): প্রধান দরজা, শোবার ঘরের দরজা, বাথরুম দরজা,
                  কাঠের দরজা, কাচের দরজা, স্লাইডিং দরজা

WINDOWS (cat_004): কাঠের জানালা, কাচের জানালা, স্লাইডিং জানালা,
                    বায় জানালা, গ্রিল সহ জানালা

SOFA (cat_005): ৩ সিটার সোফা, এল-শেপ সোফা, রিক্লাইনার, 
                 সোফা-কাম-বেড, অফিস সোফা

BED (cat_006): কিং সাইজ বেড, কুইন সাইজ বেড, সিঙ্গেল বেড,
                বাঙ্ক বেড, ড্রয়ার সহ বেড

Price ranges: 
- Chairs: ৳2,500 - ৳15,000
- Tables: ৳5,000 - ৳35,000  
- Doors: ৳8,000 - ৳25,000
- Sofa: ৳15,000 - ৳60,000
- Beds: ৳10,000 - ৳45,000

---

Output: One complete, self-contained HTML file that works by opening in any browser.
All features must be working. Code must be clean, well-commented in English.
The website should look like a professional e-commerce site worth ৳50,000+ to build.