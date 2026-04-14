import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "jewelry",
    title: "Jewelry",
    description: "Handcrafted adornments",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    size: "large"
  },
  {
    id: "home-decor",
    title: "Home Décor",
    description: "Artisan home pieces",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    size: "small"
  },
  {
    id: "pottery",
    title: "Pottery",
    description: "Ceramic creations",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070&auto=format&fit=crop",
    size: "small"
  },
  {
    id: "textiles",
    title: "Textiles",
    description: "Woven traditions",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop",
    size: "small"
  },
  {
    id: "art",
    title: "Art",
    description: "Original artworks",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop",
    size: "small"
  }
];

export default function Categories() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">Curated Collections</p>
            <h2 className="text-5xl font-heading font-bold">Explore by Craft</h2>
          </div>
          <button className="group flex items-center gap-2 text-primary font-medium hover:underline underline-offset-8 transition-all">
            View All Categories
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[800px]">
          {/* Bento Grid Layout */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 relative rounded-[40px] overflow-hidden group cursor-pointer h-[400px] md:h-full"
          >
            <img 
              src={categories[0].image} 
              alt={categories[0].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-4xl font-heading mb-2">{categories[0].title}</h3>
              <p className="text-white/80">{categories[0].description}</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 relative rounded-[40px] overflow-hidden group cursor-pointer h-[300px] md:h-full"
          >
            <img 
              src={categories[1].image} 
              alt={categories[1].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-3xl font-heading mb-2">{categories[1].title}</h3>
              <p className="text-white/80">{categories[1].description}</p>
            </div>
          </motion.div>

          {categories.slice(2).map((cat, index) => (
            <motion.div 
              key={cat.id}
              whileHover={{ y: -5 }}
              className="relative rounded-[40px] overflow-hidden group cursor-pointer h-[250px] md:h-full"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-heading mb-1">{cat.title}</h3>
                <p className="text-sm text-white/80">{cat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
