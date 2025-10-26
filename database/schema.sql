-- Inventory Management System Database Schema

CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    sku VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT DEFAULT 0,
    min_stock_level INT DEFAULT 10,
    location VARCHAR(100),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Suppliers Table
CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Stock Movements Table (for tracking inventory changes)
CREATE TABLE IF NOT EXISTS stock_movements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    movement_type ENUM('in', 'out', 'adjustment') NOT NULL,
    quantity INT NOT NULL,
    reason VARCHAR(255),
    reference_type VARCHAR(50), -- 'order', 'restock', 'adjustment'
    reference_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert Sample Data

-- Sample Products
INSERT INTO products (name, description, category, sku, price, cost) VALUES
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM', 'Electronics', 'LP-001', 1299.99, 899.99),
('Wireless Mouse', 'Ergonomic wireless mouse with Bluetooth', 'Electronics', 'WM-001', 29.99, 15.99),
('Office Chair', 'Comfortable ergonomic office chair', 'Furniture', 'OC-001', 249.99, 149.99),
('Standing Desk', 'Adjustable height standing desk', 'Furniture', 'SD-001', 599.99, 399.99),
('Monitor 27"', '4K Ultra HD 27-inch monitor', 'Electronics', 'MN-001', 399.99, 249.99);

-- Sample Inventory
INSERT INTO inventory (product_id, quantity, min_stock_level, location) VALUES
(1, 25, 5, 'Warehouse A'),
(2, 150, 20, 'Warehouse A'),
(3, 30, 10, 'Warehouse B'),
(4, 12, 5, 'Warehouse B'),
(5, 45, 10, 'Warehouse A');

-- Sample Suppliers
INSERT INTO suppliers (name, email, phone, address) VALUES
('Tech Supply Co.', 'contact@techsupply.com', '555-0101', '123 Business St, City, ST 12345'),
('Furniture Hub', 'info@furniturehub.com', '555-0102', '456 Commerce Ave, City, ST 12345');

