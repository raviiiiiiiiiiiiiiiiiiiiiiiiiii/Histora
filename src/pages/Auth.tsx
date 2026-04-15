import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, LogIn, LogOut, UserPlus, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { user, profile, loading, login, register, logout } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, displayName);
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#f5f5f0]">
        <Card className="w-full max-w-md artisan-card border-none text-center p-8">
          <CardHeader>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Store size={40} />
            </div>
            <CardTitle className="text-4xl font-heading">Welcome, {profile?.display_name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">You are currently logged in as a <span className="font-bold text-primary">{profile?.role}</span>.</p>
            <div className="grid gap-4">
              <Button onClick={() => navigate("/profile")} className="olive-button w-full h-14 text-lg">Go to Profile</Button>
              <Button variant="outline" onClick={() => logout()} className="rounded-full w-full h-14 text-lg gap-2">
                <LogOut size={20} /> Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#f5f5f0]">
      <Card className="w-full max-w-md artisan-card border-none p-8">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
            <Store size={32} />
          </div>
          <CardTitle className="text-4xl font-heading mb-2">{isLogin ? "Welcome Back" : "Join Hastoria"}</CardTitle>
          <p className="text-muted-foreground">
            {isLogin ? "Sign in to continue your handmade journey." : "Create an account to support artisans."}
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                <div className="relative">
                  <Input 
                    required
                    placeholder="John Doe" 
                    className="h-12 rounded-xl bg-secondary/10 border-none pl-10"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Input 
                  required
                  type="email"
                  placeholder="name@example.com" 
                  className="h-12 rounded-xl bg-secondary/10 border-none pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
              <div className="relative">
                <Input 
                  required
                  type="password"
                  placeholder="••••••••" 
                  className="h-12 rounded-xl bg-secondary/10 border-none pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="olive-button w-full h-14 text-lg shadow-lg mt-4"
            >
              {isSubmitting ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>
          <div className="text-center space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button 
              variant="link" 
              className="text-primary font-bold underline underline-offset-4"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create an Account" : "Sign In"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
