import { motion } from "motion/react";
import { UserPlus, Upload, SearchCheck, ShieldCheck, Tag, Users } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Sellers Register",
    description: "Join our community of artisans and creators. Share your story and craft with the world.",
    icon: UserPlus
  },
  {
    id: "02",
    title: "Upload Products",
    description: "Showcase your handmade creations with beautiful photos and authentic descriptions.",
    icon: Upload
  },
  {
    id: "03",
    title: "Customers Discover",
    description: "Connect with buyers who appreciate authentic handmade craftsmanship and artisan stories.",
    icon: SearchCheck
  }
];

const features = [
  {
    title: "Authentically Handmade",
    description: "Every piece is crafted by hand with care and dedication",
    icon: ShieldCheck
  },
  {
    title: "Fair Pricing",
    description: "Transparent pricing that honors the artisan's craft",
    icon: Tag
  },
  {
    title: "Direct from Artisans",
    description: "Connect directly with makers and their stories",
    icon: Users
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">Simple & Transparent</p>
          <h2 className="text-5xl font-heading font-bold mb-6">How Hastoria Works</h2>
          <p className="text-muted-foreground text-lg">
            A straightforward platform designed for artisans and customers to connect authentically.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-10 artisan-card"
            >
              <div className="text-7xl font-heading font-bold text-primary/10 absolute top-6 right-10">
                {step.id}
              </div>
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8">
                <step.icon size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-20 border-t border-border/50">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className="text-xl font-heading font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
