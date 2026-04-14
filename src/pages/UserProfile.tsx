import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingBag, Package, MapPin, CreditCard, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(profile?.shipping_address || "");

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    if (profile?.shipping_address) {
      setAddress(profile.shipping_address);
    }
  }, [profile]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("hastoria_token");
      const res = await fetch("/api/orders", {
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

  const handleSaveAddress = async () => {
    try {
      await updateProfile({ shipping_address: address });
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Error updating address", error);
    }
  };

  return (
    <div className="container py-12 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Profile Info */}
        <div className="space-y-8">
          <Card className="artisan-card border-none overflow-hidden">
            <div className="h-32 bg-primary/10" />
            <CardContent className="relative pt-0 px-8 pb-8">
              <div className="absolute -top-12 left-8">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={profile?.photo_url} />
                  <AvatarFallback className="text-2xl font-heading">{profile?.display_name?.[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="mt-16">
                <h2 className="text-3xl font-heading font-bold">{profile?.display_name}</h2>
                <p className="text-muted-foreground mb-6">{profile?.email}</p>
                <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px]">
                  {profile?.role || "Customer"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-heading font-bold">Shipping Details</h3>
              {!isEditingAddress ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingAddress(true)} className="text-primary gap-2">
                  <Edit2 size={14} /> Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleSaveAddress} className="text-green-600 gap-2">
                    <Save size={14} /> Save
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingAddress(false)} className="text-destructive">
                    <X size={14} />
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-border/50">
                <MapPin className="text-primary mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter mb-1">Shipping Address</p>
                  {isEditingAddress ? (
                    <Input 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      placeholder="Enter your full shipping address"
                      className="mt-2"
                    />
                  ) : (
                    <p className="text-sm font-medium">{profile?.shipping_address || "No address added yet."}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border/50">
                <CreditCard className="text-primary" size={20} />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Payment Method</p>
                  <p className="text-sm font-medium">Cash on Delivery (COD)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-heading font-bold">Order History</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShoppingBag size={20} />
              <span className="font-medium">{orders.length} Orders</span>
            </div>
          </div>

          <div className="space-y-6">
            {orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(order => (
              <Card key={order.id} className="artisan-card border-none">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Order #{String(order.id).slice(0, 8)}</p>
                    <p className="text-sm font-medium">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <Badge className={
                    order.status === 'delivered' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                    'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                  }>
                    {order.status}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex gap-6 items-center mb-8">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                      <img src={order.product_image || "https://picsum.photos/seed/product/200/200"} alt="Product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-heading font-bold">{order.product_name || "Handmade Treasure"}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {order.quantity || 1} • Total: ₹{order.total} • <span className="text-primary font-bold">{order.payment_method || 'COD'}</span></p>
                    </div>
                  </div>

                  {/* Shipping Progress */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Shipping Progress</span>
                      <span className="text-primary">{order.shipping_progress || 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000" 
                        style={{ width: `${order.shipping_progress || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                      <span>Ordered</span>
                      <span>Shipped</span>
                      <span>Out for Delivery</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-24 artisan-card bg-white">
                <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-8">You haven't made any purchases yet. Explore our collection!</p>
                <button className="olive-button">Start Shopping</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
