import React, { useState, useEffect, createContext, useContext } from "react";

interface AuthContextType {
  user: any | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isVendor: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async (token: string) => {
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem("hastoria_token");
      }
    } catch (error) {
      console.error("Fetch me error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("hastoria_token");
    if (token) {
      fetchMe(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("hastoria_token", data.token);
      setUser(data.user);
    } else {
      throw new Error(data.error);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    console.log("Attempting to register:", email);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, displayName }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log("Registration successful, token received");
      localStorage.setItem("hastoria_token", data.token);
      setUser(data.user);
    } else {
      console.error("Registration failed:", data.error);
      throw new Error(data.error);
    }
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("hastoria_token");
    setUser(null);
  };

  const updateProfile = async (data: any) => {
    console.log("Updating profile with:", data);
    const token = localStorage.getItem("hastoria_token");
    if (!token) {
      console.error("Update profile failed: No token found");
      throw new Error("No authentication token");
    }

    const res = await fetch("/api/auth/me", {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      console.log("Profile update successful");
      setUser(result.user);
    } else {
      console.error("Profile update failed:", result.error);
      throw new Error(result.error);
    }
  };

  const value = {
    user,
    profile: user, // Alias for backward compatibility
    loading,
    isAdmin: user?.role === "admin" || user?.email === "ravi2009u@gmail.com",
    isVendor: user?.role === "vendor",
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
