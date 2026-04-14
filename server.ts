import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

import { products as mockProducts } from "./src/data/products";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "hastoria-secret-key";
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Hastoria API is running" });
  });

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    const { email, password, displayName } = req.body;
    try {
      if (!sql) throw new Error("Database not configured");
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const [user] = await sql`
        INSERT INTO users (email, password, display_name, role)
        VALUES (${email}, ${hashedPassword}, ${displayName}, 'customer')
        RETURNING id, email, display_name, role
      `;
      
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ user, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!sql) throw new Error("Database not configured");
      
      const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    
    try {
      if (!sql) throw new Error("Database not configured");
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const [user] = await sql`SELECT id, email, display_name, role, photo_url, shipping_address, shop_name, artisan_type, shop_description, vendor_status FROM users WHERE id = ${decoded.id}`;
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ user });
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  app.patch("/api/auth/me", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    
    try {
      if (!sql) throw new Error("Database not configured");
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const updates = req.body;
      
      // Build dynamic update query
      const keys = Object.keys(updates);
      if (keys.length === 0) return res.json({ message: "No updates" });
      
      // Filter out sensitive fields or fields that shouldn't be updated directly
      const allowedFields = ["display_name", "photo_url", "shipping_address", "shop_name", "artisan_type", "shop_description", "vendor_status", "role"];
      const filteredKeys = keys.filter(k => allowedFields.includes(k));
      
      if (filteredKeys.length === 0) return res.status(400).json({ error: "No valid fields to update" });

      // Neon doesn't support dynamic column names in a simple way with tagged templates easily for SET clause
      // But we can use a workaround or just update one by one for simplicity in this case or use a more complex query
      // For now, let's do a simple update for the common fields
      
      let query = "UPDATE users SET ";
      const values: any[] = [];
      filteredKeys.forEach((key, index) => {
        query += `${key} = $${index + 1}${index === filteredKeys.length - 1 ? "" : ", "}`;
        values.push(updates[key]);
      });
      query += ` WHERE id = $${filteredKeys.length + 1} RETURNING id, email, display_name, role, photo_url, shipping_address, shop_name, artisan_type, shop_description, vendor_status`;
      values.push(decoded.id);

      const [updatedUser] = await (sql as any)(query, values);
      res.json({ user: updatedUser });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      if (!sql) {
        return res.json({ products: [] });
      }
      // Try to fetch products, handle case where table or column might not exist yet
      try {
        let products = await sql`SELECT * FROM products`;
        if (products.length === 0 && mockProducts.length > 0) {
          // Seed if empty
          for (const p of mockProducts) {
            await sql`
              INSERT INTO products (name, price, category, description, images, artisan_name, rating, reviews)
              VALUES (${p.name}, ${p.price}, ${p.category}, ${p.description}, ${p.images}, ${p.artisan}, ${p.rating}, ${p.reviews})
            `;
          }
          products = await sql`SELECT * FROM products`;
        }
        res.json({ products });
      } catch (e) {
        console.error("DB Products fetch error, returning empty", e);
        res.json({ products: [] });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Orders API
  app.post("/api/orders", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    
    try {
      if (!sql) throw new Error("Database not configured");
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const { productId, productName, productImage, vendorId, quantity, total, shippingAddress } = req.body;
      
      const [order] = await sql`
        INSERT INTO orders (customer_id, product_id, product_name, product_image, vendor_id, quantity, total, shipping_address, status, payment_method, shipping_progress)
        VALUES (${decoded.id}, ${productId}, ${productName}, ${productImage}, ${vendorId}, ${quantity}, ${total}, ${shippingAddress}, 'pending', 'COD', 10)
        RETURNING *
      `;
      res.json({ order });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/orders", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    
    try {
      if (!sql) throw new Error("Database not configured");
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const orders = await sql`SELECT * FROM orders WHERE customer_id = ${decoded.id} ORDER BY created_at DESC`;
      res.json({ orders });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Vendor API
  app.get("/api/vendor/products", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    
    try {
      if (!sql) throw new Error("Database not configured");
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const products = await sql`SELECT * FROM products WHERE vendor_id = ${decoded.id} ORDER BY created_at DESC`;
      res.json({ products });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/vendor/products", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    
    try {
      if (!sql) throw new Error("Database not configured");
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const { name, price, category, description, image } = req.body;
      
      const [product] = await sql`
        INSERT INTO products (name, price, category, description, images, vendor_id, artisan_name)
        VALUES (${name}, ${price}, ${category}, ${description}, ${[image]}, ${decoded.id}, ${decoded.displayName})
        RETURNING *
      `;
      res.json({ product });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/vendor/orders", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    
    try {
      if (!sql) throw new Error("Database not configured");
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const orders = await sql`SELECT * FROM orders WHERE vendor_id = ${decoded.id} ORDER BY created_at DESC`;
      res.json({ orders });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
