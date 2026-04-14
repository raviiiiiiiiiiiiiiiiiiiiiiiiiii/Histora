import { Store, Mail, MapPin, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <Store size={24} />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight">Hastoria</span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs">
              Celebrating the warmth of handcrafted treasures and the artisans who create them. Pan-India Handmade Marketplace.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop Handmade</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell on Hastoria</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/rules" className="hover:text-white transition-colors">Handmade Rules</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-6 text-white/60">
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary" />
                <a href="mailto:hastoria.market@gmail.com" className="hover:text-white transition-colors">hastoria.market@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0" />
                <span>Pan-India Handmade Marketplace</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>© 2026 Hastoria. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
