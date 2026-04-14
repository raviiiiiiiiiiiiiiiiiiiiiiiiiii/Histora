import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ArtisanStory() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-[#f5f5f0] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop" 
                alt="Artisan hands" 
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white p-8 rounded-3xl shadow-lg max-w-[240px] hidden lg:block">
              <p className="text-4xl font-heading font-bold text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Authentically Handmade</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">Living Heritage</p>
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 leading-tight">
              Each piece carries the <span className="italic">fingerprints</span> of its maker.
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We honor the time, skill, and passion that transform raw materials into treasured heirlooms. Our marketplace is more than just a place to buy—it's a digital hearth where artisans and admirers gather.
              </p>
              <p>
                When you choose handmade, you're not just buying a product. You're preserving traditions, supporting livelihoods, and bringing authentic beauty into your life.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button className="olive-button h-14 px-8 text-lg" onClick={() => navigate("/about")}>Read Our Story</Button>
              <div className="flex items-center gap-4 px-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img src={`https://picsum.photos/seed/artisan${i}/100/100`} alt="Artisan" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">Joined by 500+ Artisans</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
