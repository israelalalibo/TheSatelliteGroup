export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  quantity?: number; // For quantity-based pricing
}

export interface ProductOption {
  id: string;
  name: string;
  values: { id: string; label: string; priceModifier?: number }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  category: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  options?: ProductOption[];
  quantityTiers?: { min: number; max: number; pricePerUnit: number }[];
  features: string[];
}

export const PRODUCTS: Product[] = [
  // ── Printing Machines & Equipment ──────────────────────────────────
  {
    id: "1",
    slug: "xp600-large-format-printer",
    name: "XP600 Large Format Printer (10ft)",
    description:
      "Professional 10-feet XP600 large format eco-solvent printer for flex banners, vinyl, SAV, and more. High-speed, vibrant color output ideal for outdoor and indoor signage production.",
    shortDescription: "10ft eco-solvent, XP600 print heads",
    image: "/images/products/xp600-large-format.png",
    images: [
      "/images/products/xp600-large-format.png",
      "/images/products/large-format-plotter.png",
    ],
    category: "printing-machines",
    basePrice: 2500000,
    rating: 4.9,
    reviewCount: 47,
    features: [
      "10-feet (3.2m) print width",
      "XP600 print heads",
      "Eco-solvent ink compatible",
      "High-speed production output",
      "Warranty & installation support",
    ],
  },
  {
    id: "2",
    slug: "large-format-plotter",
    name: "Large Format Plotter Printer",
    description:
      "Industrial-grade large format plotter printer for high-volume banner, poster, and signage production. Built for durability in commercial print shops.",
    shortDescription: "Commercial plotter, wide format output",
    image: "/images/products/large-format-plotter.png",
    images: [
      "/images/products/large-format-plotter.png",
      "/images/products/xp600-large-format.png",
    ],
    category: "printing-machines",
    basePrice: 1800000,
    rating: 4.8,
    reviewCount: 32,
    features: [
      "Wide format output",
      "High-resolution printing",
      "Heavy-duty build for commercial use",
      "Warranty included",
      "Training & support provided",
    ],
  },
  {
    id: "3",
    slug: "heat-press-machine",
    name: "Heat Press Machine",
    description:
      "Flat heat press machine for t-shirt printing, sublimation transfers, and vinyl heat transfer. Perfect for starting or scaling a custom printing business.",
    shortDescription: "Flat press, sublimation & vinyl transfer",
    image: "/images/products/heat-press-machine.png",
    images: ["/images/products/heat-press-machine.png"],
    category: "printing-machines",
    basePrice: 75000,
    rating: 4.7,
    reviewCount: 118,
    options: [
      {
        id: "size",
        name: "Platen Size",
        values: [
          { id: "small", label: '12"x15" Standard', priceModifier: 0 },
          { id: "large", label: '15"x15" Large', priceModifier: 15000 },
        ],
      },
    ],
    features: [
      "Digital temperature & timer control",
      "Even heat distribution",
      "Durable steel frame",
      "Suitable for t-shirts, bags, and more",
    ],
  },
  {
    id: "4",
    slug: "mug-cup-heat-press",
    name: "Mug & Cup Heat Press Machine",
    description:
      "Specialized heat press for printing on mugs, cups, and cylindrical items. Ideal for sublimation printing of custom mugs for gifts, branding, and promotions.",
    shortDescription: "Mug sublimation press, digital control",
    image: "/images/products/mug-cup-heat-press.png",
    images: ["/images/products/mug-cup-heat-press.png"],
    category: "printing-machines",
    basePrice: 45000,
    rating: 4.6,
    reviewCount: 85,
    features: [
      "Fits standard 11oz & 15oz mugs",
      "Digital temperature & timer",
      "Adjustable pressure",
      "Quick heat-up time",
      "Compact and portable",
    ],
  },

  // ── Raw Materials & Substrates ─────────────────────────────────────
  {
    id: "5",
    slug: "flex-banner-rolls",
    name: "Flex Banner Material (Rolls)",
    description:
      "High-quality PVC flex banner material for large format printing. Available in frontlit, backlit, and blockout options. Sold per roll — bulk pricing available for resellers and print shops.",
    shortDescription: "PVC flex banner, frontlit/backlit/blockout",
    image: "/images/products/flex-banner-rolls.png",
    images: [
      "/images/products/flex-banner-rolls.png",
      "/images/products/flex-banner-stacked.png",
      "/images/products/flex-banner-warehouse.png",
      "/images/products/flex-banner-shipping.png",
    ],
    category: "raw-materials",
    basePrice: 18000,
    rating: 4.9,
    reviewCount: 214,
    options: [
      {
        id: "type",
        name: "Banner Type",
        values: [
          { id: "frontlit", label: "Frontlit (Standard)", priceModifier: 0 },
          { id: "backlit", label: "Backlit (Translucent)", priceModifier: 5000 },
          { id: "blockout", label: "Blockout (Double-sided)", priceModifier: 8000 },
        ],
      },
      {
        id: "width",
        name: "Roll Width",
        values: [
          { id: "3.2m", label: "3.2m (10ft)", priceModifier: 0 },
          { id: "5m", label: "5m (16ft)", priceModifier: 12000 },
        ],
      },
    ],
    quantityTiers: [
      { min: 1, max: 4, pricePerUnit: 18000 },
      { min: 5, max: 9, pricePerUnit: 16000 },
      { min: 10, max: 19, pricePerUnit: 14500 },
      { min: 20, max: 99, pricePerUnit: 13000 },
    ],
    features: [
      "Premium PVC material",
      "Smooth printable surface",
      "UV & weather resistant",
      "Compatible with eco-solvent & solvent inks",
      "50m per roll",
    ],
  },
  {
    id: "6",
    slug: "vinyl-sticker-rolls",
    name: "Self-Adhesive Vinyl (Sticker Rolls)",
    description:
      "High-quality self-adhesive vinyl in a wide range of colors for signage, vehicle wraps, wall graphics, and cut lettering. Available in glossy, matte, and reflective finishes.",
    shortDescription: "Self-adhesive vinyl, multiple colors & finishes",
    image: "/images/products/vinyl-sticker-rolls.png",
    images: ["/images/products/vinyl-sticker-rolls.png"],
    category: "raw-materials",
    basePrice: 8500,
    rating: 4.8,
    reviewCount: 167,
    options: [
      {
        id: "finish",
        name: "Finish",
        values: [
          { id: "glossy", label: "Glossy", priceModifier: 0 },
          { id: "matte", label: "Matte", priceModifier: 500 },
          { id: "reflective", label: "Reflective", priceModifier: 4000 },
        ],
      },
      {
        id: "color",
        name: "Color",
        values: [
          { id: "white", label: "White", priceModifier: 0 },
          { id: "black", label: "Black", priceModifier: 0 },
          { id: "red", label: "Red", priceModifier: 0 },
          { id: "blue", label: "Blue", priceModifier: 0 },
          { id: "yellow", label: "Yellow", priceModifier: 0 },
          { id: "green", label: "Green", priceModifier: 0 },
        ],
      },
    ],
    quantityTiers: [
      { min: 1, max: 4, pricePerUnit: 8500 },
      { min: 5, max: 9, pricePerUnit: 7500 },
      { min: 10, max: 49, pricePerUnit: 6800 },
    ],
    features: [
      "Strong adhesive backing",
      "Indoor & outdoor use",
      "Wide color range",
      "Easy to cut & weed",
      "50m per roll",
    ],
  },

  // ── Print Services ─────────────────────────────────────────────────
  {
    id: "7",
    slug: "premium-business-cards",
    name: "Premium Business Cards",
    description:
      "Make a lasting impression with our premium business cards. Printed on 350gsm silk or matte cardstock with rounded corners option.",
    shortDescription: "350gsm silk/matte cardstock, multiple finishes",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80",
    ],
    category: "business-cards",
    basePrice: 8500,
    rating: 4.9,
    reviewCount: 124,
    options: [
      {
        id: "paper",
        name: "Paper Type",
        values: [
          { id: "silk", label: "350gsm Silk", priceModifier: 0 },
          { id: "matte", label: "350gsm Matte", priceModifier: 500 },
          { id: "glossy", label: "350gsm Glossy", priceModifier: 800 },
        ],
      },
      {
        id: "finish",
        name: "Finish",
        values: [
          { id: "standard", label: "Standard", priceModifier: 0 },
          { id: "rounded", label: "Rounded Corners", priceModifier: 1000 },
          { id: "spot-uv", label: "Spot UV", priceModifier: 3000 },
        ],
      },
    ],
    quantityTiers: [
      { min: 50, max: 99, pricePerUnit: 170 },
      { min: 100, max: 249, pricePerUnit: 120 },
      { min: 250, max: 499, pricePerUnit: 85 },
      { min: 500, max: 999, pricePerUnit: 70 },
      { min: 1000, max: 9999, pricePerUnit: 55 },
    ],
    features: [
      "350gsm premium cardstock",
      "Full color both sides",
      "Fast turnaround",
      "Design guidelines included",
    ],
  },
  {
    id: "8",
    slug: "flex-banner-printing",
    name: "Flex Banner Printing",
    description:
      "Custom flex banner printing for outdoor and indoor signage. High-resolution eco-solvent printing on premium flex material. Eyelet finishing included.",
    shortDescription: "Custom printed flex banners with eyelets",
    image: "/images/products/flex-banner-warehouse.png",
    images: [
      "/images/products/flex-banner-warehouse.png",
      "/images/products/flex-banner-stacked.png",
    ],
    category: "banners",
    basePrice: 1500,
    rating: 4.9,
    reviewCount: 312,
    options: [
      {
        id: "material",
        name: "Material",
        values: [
          { id: "frontlit", label: "Frontlit Banner", priceModifier: 0 },
          { id: "backlit", label: "Backlit Banner", priceModifier: 300 },
          { id: "blockout", label: "Blockout Banner", priceModifier: 500 },
        ],
      },
    ],
    quantityTiers: [
      { min: 1, max: 9, pricePerUnit: 1500 },
      { min: 10, max: 49, pricePerUnit: 1200 },
      { min: 50, max: 99, pricePerUnit: 1000 },
      { min: 100, max: 999, pricePerUnit: 800 },
    ],
    features: [
      "Price per square metre",
      "Eco-solvent printing",
      "Eyelet finishing included",
      "UV & weather resistant",
      "Custom sizes available",
    ],
  },
  {
    id: "9",
    slug: "branded-t-shirts",
    name: "Branded T-Shirts",
    description:
      "Premium cotton t-shirts with your logo. Perfect for corporate events, uniforms, and promotional giveaways. Heat press and screen printing options.",
    shortDescription: "Custom printed, heat press & screen print",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    ],
    category: "corporate-gifts",
    basePrice: 4500,
    rating: 4.7,
    reviewCount: 203,
    options: [
      {
        id: "method",
        name: "Print Method",
        values: [
          { id: "heat-press", label: "Heat Press (Vinyl)", priceModifier: 0 },
          { id: "sublimation", label: "Sublimation", priceModifier: 500 },
          { id: "screen", label: "Screen Printing", priceModifier: 200 },
        ],
      },
      {
        id: "size",
        name: "Size",
        values: [
          { id: "s", label: "S", priceModifier: 0 },
          { id: "m", label: "M", priceModifier: 0 },
          { id: "l", label: "L", priceModifier: 0 },
          { id: "xl", label: "XL", priceModifier: 200 },
          { id: "xxl", label: "XXL", priceModifier: 400 },
        ],
      },
    ],
    quantityTiers: [
      { min: 10, max: 24, pricePerUnit: 450 },
      { min: 25, max: 49, pricePerUnit: 380 },
      { min: 50, max: 99, pricePerUnit: 320 },
      { min: 100, max: 999, pricePerUnit: 280 },
    ],
    features: [
      "100% premium cotton",
      "Heat press & screen print options",
      "Multiple color options",
      "Bulk pricing available",
    ],
  },
  {
    id: "10",
    slug: "custom-mug-printing",
    name: "Custom Mug Printing",
    description:
      "Personalized sublimation mug printing for gifts, promotions, and branding. Full-wrap designs with vibrant, dishwasher-safe colors.",
    shortDescription: "Sublimation printed, full-wrap design",
    image: "/images/products/mug-cup-heat-press.png",
    images: ["/images/products/mug-cup-heat-press.png"],
    category: "corporate-gifts",
    basePrice: 2500,
    rating: 4.8,
    reviewCount: 94,
    options: [
      {
        id: "type",
        name: "Mug Type",
        values: [
          { id: "white", label: "White Ceramic (11oz)", priceModifier: 0 },
          { id: "magic", label: "Magic Mug (Color Change)", priceModifier: 800 },
          { id: "large", label: "White Ceramic (15oz)", priceModifier: 500 },
        ],
      },
    ],
    quantityTiers: [
      { min: 1, max: 9, pricePerUnit: 2500 },
      { min: 10, max: 24, pricePerUnit: 2200 },
      { min: 25, max: 49, pricePerUnit: 1900 },
      { min: 50, max: 99, pricePerUnit: 1700 },
    ],
    features: [
      "Full-wrap sublimation print",
      "Dishwasher safe",
      "Vibrant, lasting colors",
      "Individual packaging available",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, limit);
}
