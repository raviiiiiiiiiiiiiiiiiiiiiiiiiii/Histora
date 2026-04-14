import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function ProductGrid() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuy = (product: any) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate(`/checkout/${product.id}`);
  };

  if (loading) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">Artisan Treasures</p>
            <h2 className="text-5xl font-heading font-bold">Product of The Month</h2>
          </div>
          <Button variant="ghost" className="text-primary font-medium hover:underline underline-offset-8">
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 bg-secondary/30">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 lg:group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-white/90 text-primary border-none backdrop-blur-sm">Popular</Badge>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                    <Heart size={18} />
                  </button>
                </div>
                <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button className="olive-button w-full shadow-lg" onClick={() => handleBuy(product)}>
                    Buy Now
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-heading font-bold leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                  </div>
                  <p className="text-xl font-bold text-primary">₹{product.price}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-muted-foreground">by <span className="font-medium text-foreground">{product.artisan_name || product.artisan}</span></p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-primary text-primary" />
                    <span className="text-sm font-bold">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
