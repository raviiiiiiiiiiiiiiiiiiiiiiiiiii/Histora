-- Hastoria Database Schema (PostgreSQL)

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    photo_url TEXT,
    role VARCHAR(50) DEFAULT 'customer', -- 'customer', 'vendor', 'admin'
    shipping_address TEXT,
    shop_name VARCHAR(255),
    artisan_type VARCHAR(255),
    shop_description TEXT,
    vendor_status VARCHAR(50), -- 'pending', 'active', 'suspended'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    vendor_id UUID REFERENCES users(id),
    artisan_name VARCHAR(255),
    images TEXT[], -- Array of image URLs
    stock_quantity INTEGER DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(255),
    product_image TEXT,
    quantity INTEGER NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50), -- 'COD', 'Card', etc.
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'shipped', 'delivered', 'cancelled'
    shipping_progress INTEGER DEFAULT 0,
    shipping_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    user_id UUID REFERENCES users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- FAQs Table
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100)
);
