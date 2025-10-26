const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Mock data for testing without database
const mockProducts = [
    {
        id: 1,
        name: "Laptop Pro 15\"",
        description: "High-performance laptop with 16GB RAM",
        category: "Electronics",
        sku: "LP-001",
        price: 1299.99,
        cost: 899.99,
        quantity: 25,
        min_stock_level: 5,
        location: "Warehouse A"
    },
    {
        id: 2,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with Bluetooth",
        category: "Electronics",
        sku: "WM-001",
        price: 29.99,
        cost: 15.99,
        quantity: 150,
        min_stock_level: 20,
        location: "Warehouse A"
    },
    {
        id: 3,
        name: "Office Chair",
        description: "Comfortable ergonomic office chair",
        category: "Furniture",
        sku: "OC-001",
        price: 249.99,
        cost: 149.99,
        quantity: 30,
        min_stock_level: 10,
        location: "Warehouse B"
    },
    {
        id: 4,
        name: "Standing Desk",
        description: "Adjustable height standing desk",
        category: "Furniture",
        sku: "SD-001",
        price: 599.99,
        cost: 399.99,
        quantity: 12,
        min_stock_level: 5,
        location: "Warehouse B"
    },
    {
        id: 5,
        name: "Monitor 27\"",
        description: "4K Ultra HD 27-inch monitor",
        category: "Electronics",
        sku: "MN-001",
        price: 399.99,
        cost: 249.99,
        quantity: 45,
        min_stock_level: 10,
        location: "Warehouse A"
    }
];

// Products API
app.get('/api/products', (req, res) => {
    res.json(mockProducts);
});

app.get('/api/products/:id', (req, res) => {
    const product = mockProducts.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

app.post('/api/products', (req, res) => {
    const { name, description, category, sku, price, cost, quantity, min_stock_level, location } = req.body;
    const newProduct = {
        id: mockProducts.length + 1,
        name, description, category, sku, price, cost, quantity, min_stock_level, location
    };
    mockProducts.push(newProduct);
    res.status(201).json({ id: newProduct.id, message: 'Product created successfully' });
});

app.put('/api/products/:id', (req, res) => {
    const index = mockProducts.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    mockProducts[index] = { ...mockProducts[index], ...req.body };
    res.json({ message: 'Product updated successfully' });
});

app.delete('/api/products/:id', (req, res) => {
    const index = mockProducts.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    mockProducts.splice(index, 1);
    res.json({ message: 'Product deleted successfully' });
});

// Orders API
const mockOrders = [];

app.get('/api/orders', (req, res) => {
    res.json(mockOrders);
});

app.get('/api/orders/:id', (req, res) => {
    const order = mockOrders.find(o => o.id == req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
});

app.post('/api/orders', (req, res) => {
    const { customer_name, customer_email, customer_phone, items } = req.body;
    const orderNumber = `ORD-${Date.now()}`;
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = {
        id: mockOrders.length + 1,
        order_number: orderNumber,
        customer_name,
        customer_email,
        customer_phone,
        total_amount: totalAmount,
        order_date: new Date(),
        status: 'pending',
        items
    };
    
    mockOrders.push(newOrder);
    res.status(201).json({ id: newOrder.id, order_number: orderNumber, message: 'Order created successfully' });
});

// Dashboard API
app.get('/api/dashboard', (req, res) => {
    const lowStockItems = mockProducts.filter(p => p.quantity <= p.min_stock_level).length;
    const ordersToday = mockOrders.filter(o => {
        const today = new Date().toDateString();
        return new Date(o.order_date).toDateString() === today;
    }).length;
    
    res.json({
        totalProducts: mockProducts.length,
        lowStockItems,
        ordersToday,
        totalOrders: mockOrders.length
    });
});

// Serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📦 Using mock data (no database required)`);
    console.log(`\n🌐 Open your browser and go to: http://localhost:${PORT}`);
});

