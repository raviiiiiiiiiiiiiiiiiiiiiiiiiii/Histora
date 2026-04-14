import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#f5f5f0]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E4E3E0] -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Est. 2024 • Handmade Stories
          </div>
          
          <h1 className="text-5xl md:text-8xl font-heading font-bold leading-[0.9] mb-8 tracking-tight">
            The Art of <br />
            <span className="text-primary italic">Human Touch</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
            In a world of mass production, we celebrate the hands that shape, mold, and weave stories into every creation. Hastoria is a digital hearth where artisans and admirers gather.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="olive-button h-14 px-8 text-lg w-full sm:w-auto" onClick={() => navigate("/shop")}>
              Shop Collection
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-primary/20 hover:bg-primary/5 w-full sm:w-auto" onClick={() => navigate("/sell")}>
              Become a Seller
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070&auto=format&fit=crop" 
              alt="Artisan hands working on pottery" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm font-medium uppercase tracking-widest mb-1 opacity-80">Featured Artisan</p>
              <h3 className="text-2xl font-heading">The Pottery Studio</h3>
            </div>
          </div>
          
          {/* Decorative floating element */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-4 rounded-3xl shadow-xl z-20 -rotate-6 hidden lg:block"
          >
            <img 
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2070&auto=format&fit=crop" 
              alt="Finished pottery" 
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
