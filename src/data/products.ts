export interface Product {
  id: string;
  name: string;
  price: number;
  artisan: string;
  artisan_name?: string;
  vendor_id?: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Hand-Painted Ceramic Vase",
    price: 1250,
    artisan: "Meera Crafts",
    vendor_id: "vendor-1",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590604518089-28381c69a75a?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Pottery",
    rating: 4.8,
    reviews: 24,
    description: "A beautiful hand-painted ceramic vase, perfect for adding a touch of elegance to any room. Each piece is unique and crafted with love by Meera."
  },
  {
    id: "2",
    name: "Woven Bamboo Pendant Light",
    price: 3400,
    artisan: "NorthEast Weaves",
    images: [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519107127-1bed33748e4c?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Home Decor",
    rating: 4.9,
    reviews: 18,
    description: "Eco-friendly bamboo light fixture, hand-woven by skilled artisans from the North East. Provides a warm, natural glow to your living space."
  },
  {
    id: "3",
    name: "Hand-Block Printed Silk Scarf",
    price: 1800,
    artisan: "Jaipur Prints",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "Textiles",
    rating: 4.7,
    reviews: 32,
    description: "Luxurious silk scarf featuring traditional hand-block prints from Jaipur. Soft, vibrant, and perfect for any occasion."
  },
  {
    id: "4",
    name: "Terracotta Serving Bowl Set",
    price: 950,
    artisan: "Clay Stories",
    images: [
      "https://images.unsplash.com/photo-1590604518089-28381c69a75a?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Pottery",
    rating: 4.6,
    reviews: 45,
    description: "Traditional terracotta serving bowls, perfect for authentic Indian dining experiences. Retains heat and adds a rustic charm."
  },
  {
    id: "5",
    name: "Hand-Carved Wooden Elephant",
    price: 2200,
    artisan: "Sahara Woodworks",
    images: [
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "Art",
    rating: 4.9,
    reviews: 12,
    description: "Exquisitely hand-carved wooden elephant, a symbol of wisdom and strength. Made from sustainable mango wood."
  },
  {
    id: "6",
    name: "Brass Dhokra Wall Hanging",
    price: 4500,
    artisan: "Tribal Arts",
    images: [
      "https://images.unsplash.com/photo-1561839561-b13bcfe95249?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519107127-1bed33748e4c?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Home Decor",
    rating: 5.0,
    reviews: 8,
    description: "Ancient Dhokra lost-wax casting art piece. This brass wall hanging depicts traditional tribal life and celebrations."
  },
  {
    id: "7",
    name: "Hand-Knotted Jute Rug",
    price: 5800,
    artisan: "Rural Weavers",
    images: [
      "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534889156217-d3c8ef4caac2?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "Home Decor",
    rating: 4.7,
    reviews: 21,
    description: "Durable and stylish hand-knotted jute rug. Adds a natural, bohemian vibe to any room while being eco-friendly."
  },
  {
    id: "8",
    name: "Silver Filigree Earrings",
    price: 2800,
    artisan: "Cuttack Silver",
    images: [
      "https://images.unsplash.com/photo-1535633302704-b02923c59f6d?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "Jewelry",
    rating: 4.8,
    reviews: 15,
    description: "Intricate silver filigree work from Cuttack. These lightweight earrings are a testament to centuries-old craftsmanship."
  },
  {
    id: "9",
    name: "Hand-Woven Pashmina Shawl",
    price: 12000,
    artisan: "Kashmir Heritage",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=1920&auto=format&fit=crop"
    ],
    category: "Textiles",
    rating: 5.0,
    reviews: 5,
    description: "Authentic hand-woven Pashmina shawl from the valleys of Kashmir. Unmatched warmth and softness in every thread."
  },
  {
    id: "10",
    name: "Blue Pottery Tea Set",
    price: 3200,
    artisan: "Jaipur Ceramics",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519107127-1bed33748e4c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Pottery",
    rating: 4.9,
    reviews: 10,
    description: "Exquisite blue pottery tea set, a specialty of Jaipur. Hand-painted with traditional floral motifs."
  }
];
