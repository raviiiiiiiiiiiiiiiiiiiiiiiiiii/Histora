import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star, ShoppingCart, Heart, ChevronRight, ShieldCheck, Truck, RefreshCcw, Store, Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, Product } from "@/data/products";
import { useAuth } from "@/hooks/useAuth";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) return null;

  const handleBuy = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate(`/checkout/${product.id}`);
  };

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fdfcfb] pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-32">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square md:aspect-[16/10] rounded-[24px] md:rounded-[48px] overflow-hidden bg-secondary/20 shadow-2xl relative group"
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 right-8 flex flex-col gap-4">
                <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl">
                  <Heart size={20} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-3 gap-6">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-[32px] overflow-hidden border-4 transition-all duration-300 ${selectedImage === idx ? 'border-primary shadow-2xl scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.2em] text-[10px] px-4 py-1.5 rounded-full font-bold">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={16} className="fill-current" />
                  <span className="text-sm font-bold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground font-medium">({product.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-6xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">{product.name}</h1>
              
              <div className="flex items-baseline gap-4 mb-8">
                <p className="text-4xl font-bold text-primary">₹{product.price}</p>
                <p className="text-lg text-muted-foreground line-through opacity-50">₹{Math.round(product.price * 1.2)}</p>
                <Badge className="bg-green-100 text-green-700 border-none rounded-full px-3">20% OFF</Badge>
              </div>

              <div className="p-6 rounded-[32px] bg-white border border-border/50 shadow-sm mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Store size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Artisan Shop</p>
                    <p className="font-heading font-bold text-xl">{product.artisan_name || product.artisan}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center border-2 border-border/50 rounded-full h-16 px-6 bg-white shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-2xl font-bold hover:text-primary transition-colors w-8">-</button>
                  <span className="w-12 text-center text-xl font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-2xl font-bold hover:text-primary transition-colors w-8">+</button>
                </div>
                <Button onClick={handleBuy} size="lg" className="olive-button flex-1 h-16 text-xl shadow-2xl group">
                  Buy Now (COD)
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-8 border-y border-border/50">
                {[
                  { icon: Truck, label: "Free Shipping" },
                  { icon: ShieldCheck, label: "Artisan Verified" },
                  { icon: RefreshCcw, label: "Easy Returns" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                      <item.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews & Social Proof */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-4">What people are saying</h2>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-secondary/50" />
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">Joined by <span className="text-foreground font-bold">500+</span> happy owners</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-full h-14 px-8 border-primary/20 font-bold">Write a Review</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="artisan-card p-10 border-none bg-white shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px]" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-secondary/50" />
                  <div>
                    <h4 className="font-bold text-lg">Artisan Enthusiast</h4>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed italic relative z-10">
                  "The attention to detail in this {product.category.toLowerCase()} piece is breathtaking. You can truly feel the story behind it. It's not just a product, it's a piece of heritage."
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* You Might Also Like */}
        <section>
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">Curated for you</p>
              <h2 className="text-4xl font-heading font-bold">You might also like</h2>
            </div>
            <Link to="/shop" className="text-primary font-bold hover:underline underline-offset-8 transition-all">Explore All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map((p) => (
              <motion.div key={p.id} whileHover={{ y: -10 }} className="group">
                <Link to={`/product/${p.id}`}>
                  <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-secondary/20 mb-6 shadow-lg">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">{p.name}</h3>
                      <p className="font-bold text-primary">₹{p.price}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">by {p.artisan_name || p.artisan}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
