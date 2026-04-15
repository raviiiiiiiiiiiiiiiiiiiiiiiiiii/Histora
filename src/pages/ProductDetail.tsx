import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star, ShoppingCart, Heart, ChevronRight, ShieldCheck, Truck, RefreshCcw, Store, Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<any | null>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setAllProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching all products", error);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
        } else {
          navigate("/shop");
        }
      } catch (error) {
        console.error("Error fetching product", error);
        navigate("/shop");
      }
    };
    if (id) fetchProduct();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) return null;

  const handleBuy = () => {
    if (!user) { navigate("/auth"); return; }
    navigate(`/checkout/${product.id}`);
  };

  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fdfcfb] pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-32">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square md:aspect-[16/10] rounded-[24px] md:rounded-[48px] overflow-hidden bg-secondary/20 shadow-2xl relative group"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 lg:group-hover:scale-105"
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
              {product.images.map((img: string, idx: number) => (
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
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center border-2 border-border/50 rounded-full h-16 px-6 bg-white sh
