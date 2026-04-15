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
      <aside className="w-64 bg-white border-r border-border hidden lg:block p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <LayoutDashboard size={20} />
          </div>
          <span className="text-xl font-heading font-bold">Dashboard</span>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/5 text-primary">
            <ShoppingBag size={18} /> Products
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Package size={18} /> Orders
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings size={18} /> Settings
          </Button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold">Welcome back, {profile?.display_name}</h1>
            <p className="text-muted-foreground">Manage your artisan shop and track your sales.</p>
          </div>
          <Button className="olive-button gap-2" onClick={() => setIsAddingProduct(true)}>
            <Plus size={18} /> Add New Product
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-8">
          <TabsList className="bg-white border p-1 rounded-xl">
            <TabsTrigger value="products" className="rounded-lg">My Products</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg">Recent Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id} className="artisan-card overflow-hidden border-none">
                  <div className="aspect-video relative">
                    <img
                      src={product.images?.[0] || "https://picsum.photos/seed/product/400/500"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-heading">{product.name}</CardTitle>
                      <p className="font-bold text-primary">₹{product.price}</p>
                    </div>
                    <Badge variant="secondary" className="w-fit">{product.category}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-full">Edit</Button>
                      <Button variant="outline" size="sm" className="flex-1 rounded-full text-destructive hover:bg-destructive/5">Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="artisan-card border-none">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                        <th className="p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                        <th className="p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                        <th className="p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b border-border/50 last:border-none">
                          <td className="p-6 font-mono text-xs">#{String(order.id).slice(0, 8)}</td>
                          <td className="p-6 font-medium">{order.product_name || "Handmade Item"}</td>
                          <td className="p-6 font-bold">₹{order.total}</td>
                          <td className="p-6">
                            <Badge className={
                              order.status === 'delivered' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                              'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                            }>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-6">
                            <Button variant="ghost" size="sm">Update Status</Button>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-muted-foreground">No orders found yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {isAddingProduct && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg artisan-card border-none">
            <CardHeader>
              <CardTitle className="text-3xl font-heading">List New Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Hand-Painted Ceramic Vase" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input id="price" type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} placeholder="e.g. Pottery" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} placeholder="https://images.unsplash.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Input id="desc" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={() => setIsAddingProduct(false)}>Cancel</Button>
                  <Button type="submit" className="olive-button flex-1">List Product</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
