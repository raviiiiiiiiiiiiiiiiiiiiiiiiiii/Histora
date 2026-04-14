import React from "react";
import { motion } from "motion/react";
import { Heart, Users, ShieldCheck, Globe, Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-medium uppercase tracking-widest text-sm mb-6"
            >
              Our Story
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-heading font-bold leading-[0.9] mb-10 tracking-tight"
            >
              Preserving <span className="text-primary italic">Heritage</span> through Handcraft.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed mb-12"
            >
              Hastoria was born from a simple realization: in a world of mass production, the human touch is becoming a rare luxury. We are on a mission to bridge the gap between India's finest artisans and those who appreciate authentic beauty.
            </motion.p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 -skew-x-12 translate-x-1/4 -z-10" />
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="rounded-[48px] overflow-hidden shadow-2xl rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop" 
                  alt="Artisan at work" 
                  className="w-full h-[600px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary p-8 rounded-[40px] shadow-2xl -rotate-6 flex flex-col justify-center text-white">
                <p className="text-4xl font-heading font-bold mb-1">500+</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Artisans Empowered</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">More than just a marketplace.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that every handmade object carries a story—of the hands that shaped it, the culture that inspired it, and the time it took to create. Our platform is designed to celebrate these stories.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-6">
                {[
                  { icon: Heart, title: "Artisan First", desc: "We ensure fair wages and direct access to markets for every maker." },
                  { icon: ShieldCheck, title: "Authenticity", desc: "Every product is verified for its handmade origin and quality." },
                  { icon: Globe, title: "Cultural Heritage", desc: "Preserving traditional Indian crafts for the next generation." },
                  { icon: Users, title: "Community", desc: "Building a digital hearth where admirers and makers gather." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon size={24} />
                    </div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#fdfcfb]">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-10">
            <Store size={40} />
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">Ready to join the <span className="text-primary italic">movement</span>?</h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Whether you're an artisan looking to share your craft or a collector seeking authentic beauty, there's a place for you at Hastoria.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/shop">
              <Button size="lg" className="olive-button h-16 px-10 text-xl shadow-xl w-full sm:w-auto">
                Shop Collection
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-xl border-primary/20 hover:bg-primary/5 w-full sm:w-auto">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
