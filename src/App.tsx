import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ArtisanStory from "./components/ArtisanStory";
import ProductGrid from "./components/ProductGrid";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import AuthPage from "./pages/Auth";
import VendorDashboard from "./pages/VendorDashboard";
import UserProfile from "./pages/UserProfile";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import SellerRegistration from "./pages/SellerRegistration";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

import FAQSection from "./components/FAQSection";

function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <ArtisanStory />
      <ProductGrid />
      <HowItWorks />
      <FAQSection />
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<VendorDashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/sell" element={<SellerRegistration />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
