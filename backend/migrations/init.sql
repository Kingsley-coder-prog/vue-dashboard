-- Create stats table (single row for dashboard summary)
CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    total_sales NUMERIC DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    total_customers INTEGER DEFAULT 0,
    revenue_change NUMERIC DEFAULT 0,
    orders_change NUMERIC DEFAULT 0,
    customers_change NUMERIC DEFAULT 0
);
-- Charts data
CREATE TABLE IF NOT EXISTS charts (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    value NUMERIC NOT NULL
);
-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT,
    product TEXT,
    price NUMERIC,
    status TEXT,
    created_at TIMESTAMP DEFAULT now()
);
-- Activities
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    description TEXT,
    type TEXT,
    created_at TIMESTAMP DEFAULT now()
);
-- Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT now()
);
-- Products
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    price NUMERIC,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);
-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender TEXT,
    subject TEXT,
    body TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);
-- Settings (key-value)
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);