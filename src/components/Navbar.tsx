import { ShoppingCart, User, Search, Menu, Store, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, profile, isVendor, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
            <Store size={24} />
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight">Hastoria</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Input 
            placeholder="Search handmade treasures..." 
            className="pl-10 rounded-full bg-secondary/50 border-none focus-visible:ring-primary/20"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
          <Link to="/sell" className="text-sm font-medium hover:text-primary transition-colors">Sell</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">Our Story</Link>
          
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart size={20} />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={profile?.photo_url} />
                        <AvatarFallback>{profile?.display_name?.[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 artisan-card border-none p-2">
                  <DropdownMenuLabel className="font-heading text-lg px-4 py-2">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="rounded-lg gap-3 px-4 py-3 cursor-pointer">
                    <User size={18} /> Profile
                  </DropdownMenuItem>
                  {isVendor && (
                    <DropdownMenuItem onClick={() => navigate("/dashboard")} className="rounded-lg gap-3 px-4 py-3 cursor-pointer">
                      <LayoutDashboard size={18} /> Vendor Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="rounded-lg gap-3 px-4 py-3 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut size={18} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate("/auth")} className="olive-button ml-2">
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search size={20} />
          </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu size={20} />
                </Button>
              }
            />
            <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-none">
              <div className="flex flex-col h-full bg-[#fdfcfb]">
                <div className="p-6 border-b border-border/50 flex justify-between items-center">
                                    <Link to="/" className="text-2xl font-heading font-bold tracking-tight">Hastoria</Link>
                </div>
                <div className="flex-1 px-6 py-8 space-y-6">
                  <Link to="/shop" className="block text-3xl font-heading font-bold hover:text-primary transition-colors">Shop Handmade</Link>
                  <Link to="/sell" className="block text-3xl font-heading font-bold hover:text-primary transition-colors">Sell on Hastoria</Link>
                  <Link to="/about" className="block text-3xl font-heading font-bold hover:text-primary transition-colors">Our Story</Link>
                  <Link to="/faq" className="block text-3xl font-heading font-bold hover:text-primary transition-colors">FAQs</Link>
                  <Link to="/contact" className="block text-3xl font-heading font-bold hover:text-primary transition-colors">Contact</Link>
                  {user && (
                    <div className="pt-6 border-t border-border/50 space-y-6">
                      <Link to="/profile" className="block text-2xl font-heading font-bold text-muted-foreground hover:text-primary transition-colors">My Profile</Link>
                      {isVendor && <Link to="/dashboard" className="block text-2xl font-heading font-bold text-muted-foreground hover:text-primary transition-colors">Vendor Dashboard</Link>}
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-border/50">
                  {user ? (
                    <Button onClick={() => logout()} variant="outline" className="w-full h-14 rounded-full text-lg font-bold border-primary/20">Logout</Button>
                  ) : (
                    <Button onClick={() => navigate("/auth")} className="olive-button w-full h-14 text-lg shadow-lg">Login / Register</Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {isSearchOpen && (
        <div className="md:hidden p-4 border-t border-border/50 animate-in slide-in-from-top duration-300">
          <div className="relative">
            <Input
              placeholder="Search handmade treasures..."
              className="pl-10 rounded-full bg-secondary/50 border-none"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
        </div>
      )}
    </nav>
  );
}

