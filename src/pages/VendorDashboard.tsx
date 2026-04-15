import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, ShoppingBag, LayoutDashboard, Settings, Store } from "lucide-react";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { user, profile, isVendor } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "", price: "", category: "", description: "", image: ""
  });

  useEffect(() => {
    if (user && isVendor) {
      fetchProducts();
      fetchOrders();
    }
  }, [user, isVendor]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("hastoria_token");
      const res = await fetch("/api/vendor/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("hastoria_token");
      const res = await fetch("/api/vendor/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const token = localStorage.getItem("hastoria_token");
      const res = await fetch("/api/vendor/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) }),
      });
      if (res.ok) {
        setIsAddingProduct(false);
        setNewProduct({ name: "", price: "", category: "", description: "", image: "" });
        fetchProducts();
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  if (!isVendor) {
    return (
      <div className="container py-32 text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
          <Store size={48} />
        </div>
        <h2 className="text-4xl font-heading font-bold mb-4">Start Your Artisan Journey</h2>
        <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
          You are currently logged in as a customer. To start listing your handmade creations and managing orders, you need to register as an artisan seller.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/sell")} className="olive-button h-14 px-8 text-lg shadow-lg">
            Register as Seller
          </Button>
          <Button onClick={() => navigate("/")} variant="outline" className="h-14 px-8 text-lg rounded-full border-primary/20">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/20">
      <aside className="w-64 bg-white border-r border-bo
