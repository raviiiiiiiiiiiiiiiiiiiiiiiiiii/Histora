import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Store, ShieldCheck, Zap, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function SellerRegistration() {
  const navigate = useNavigate();
  const { user, profile, updateProfile, register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    shopName: "",
    artisanType: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting seller registration...");
    setIsSubmitting(true);
    setError("");
    try {
      if (!user) {
        console.log("Registering new user...");
        await register(formData.email, formData.password, formData.displayName);
        console.log("Registration successful, updating profile...");
      }
      
      await updateProfile({
        role: "vendor",
        shop_name: formData.shopName,
        artisan_type: formData.artisanType,
        shop_description: formData.description,
        vendor_status: "active",
      });
      console.log("Profile update successful, navigating to dashboard...");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Error registering as seller", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Store size={16} />
              Open Your Artisan Shop
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Turn your <span className="text-primary italic">craft</span> into a business.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join a community of thousands of Indian artisans. We provide the tools, you provide the talent.
            </p>

            <div className="space-y-6 pt-4">
              {[
                { icon: ShieldCheck, title: "Secure Payments", desc: "Get paid directly for every sale you make." },
                { icon: Zap, title: "Easy Management", desc: "Powerful dashboard to track orders and stock." },
                { icon: Globe, title: "Pan-India Reach", desc: "Sell your products to customers across the country." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="artisan-card border-none shadow-2xl bg-white p-8 md:p-12">
              <CardContent className="p-0">
                <h2 className="text-3xl font-heading font-bold mb-8">Seller Details</h2>
                {error && (
                  <div className="mb-6 p-4 bg-destructive/10 text-destructive text-sm rounded-xl font-medium">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!user && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                        <Input 
                          required
                          placeholder="John Doe" 
                          className="h-14 rounded-2xl bg-secondary/10 border-none px-6"
                          value={formData.displayName}
                          onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                        <Input 
                          required
                          type="email"
                          placeholder="vendor@example.com" 
                          className="h-14 rounded-2xl bg-secondary/10 border-none px-6"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                        <Input 
                          required
                          type="password"
                          placeholder="••••••••" 
                          className="h-14 rounded-2xl bg-secondary/10 border-none px-6"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Shop Name</Label>
                    <Input 
                      required
                      placeholder="e.g. Jaipur Blue Pottery" 
                      className="h-14 rounded-2xl bg-secondary/10 border-none px-6"
                      value={formData.shopName}
                      onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Artisan Type</Label>
                    <Input 
                      required
                      placeholder="e.g. Potter, Weaver, Painter" 
                      className="h-14 rounded-2xl bg-secondary/10 border-none px-6"
                      value={formData.artisanType}
                      onChange={(e) => setFormData({...formData, artisanType: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Shop Description</Label>
                    <textarea 
                      required
                      className="w-full min-h-[120px] p-6 rounded-2xl bg-secondary/10 border-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Tell us about your craft and story..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="olive-button w-full h-16 text-xl shadow-xl group"
                    >
                      {isSubmitting ? "Registering..." : "Start Selling Now"}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground">
                    By clicking "Start Selling Now", you agree to our Artisan Terms of Service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
