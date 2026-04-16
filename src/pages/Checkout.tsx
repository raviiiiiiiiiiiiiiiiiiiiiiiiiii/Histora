import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ShoppingCart, MapPin, CreditCard, ChevronRight, Truck, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const [product, setProduct] = useState<any | null>(null);
  const [address, setAddress] = useState(profile?.shipping_address || "");
  const [isProcessing, setIsProcessing] = useState(false);

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

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (profile?.shipping_address || profile?.shippingAddress) {
      setAddress(profile.shipping_address || profile.shippingAddress);
    }
  }, [profile]);

  if (!product) return null;

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!address.trim()) {
      alert("Please provide a shipping address.");
      return;
    }

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("hastoria_token");
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          productImage: product.images[0],
          vendorId: product.vendor_id || "mock-vendor-id",
          quantity: 1,
          total: product.price,
          shippingAddress: address
        }),
      });

      if (res.ok) {
        navigate("/profile");
      } else {
        const data = await res.json();
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error("Error placing order", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-heading font-bold mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <Card className="artisan-card border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <MapPin className="text-primary" size={20} />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-tighter">Full Address</label>
                  <textarea 
                    className="w-full min-h-[100px] p-4 rounded-2xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-secondary/10"
                    placeholder="Street address, City, State, ZIP code, Country"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                {!profile?.shippingAddress && (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-xl text-sm">
                    <AlertCircle size={16} />
                    <span>This address will be saved to your profile for future orders.</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="artisan-card border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <CreditCard className="text-primary" size={20} />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Truck size={24} />
                    </div>
                    <div>
                      <p className="font-bold">Cash on Delivery (COD)</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive the package</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-primary bg-white" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground italic">
                  * Other payment methods are currently disabled for artisan security.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-8">
            <Card className="artisan-card border-none bg-white shadow-xl sticky top-32">
              <CardHeader>
                <CardTitle className="font-heading">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm line-clamp-1">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">Artisan: {product.artisan_name || product.artisan}</p>
                  </div>
                  <p className="font-bold">₹{product.price}</p>
                </div>

                <div className="border-t border-dashed pt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{product.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span>Total</span>
                    <span className="text-primary">₹{product.price}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePlaceOrder} 
                  disabled={isProcessing}
                  className="olive-button w-full h-14 text-lg shadow-lg"
                >
                  {isProcessing ? "Processing..." : "Place Order (COD)"}
                </Button>

                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                    <ShieldCheck size={14} className="text-green-600" />
                    Secure Checkout
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    By placing your order, you agree to Hastoria's terms of use and privacy policy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
