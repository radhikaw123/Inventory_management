const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// API route for dashboard stats
app.get('/api/dashboard', async (req, res) => {
    try {
        const db = require('./config/database');
        
        const [products] = await db.query('SELECT COUNT(*) as total FROM products');
        const [lowStock] = await db.query(
            'SELECT COUNT(*) as total FROM inventory WHERE quantity <= min_stock_level'
        );
        const [ordersToday] = await db.query(
            'SELECT COUNT(*) as total FROM orders WHERE DATE(created_at) = CURDATE()'
        );
        const [totalOrders] = await db.query('SELECT COUNT(*) as total FROM orders');
        
        res.json({
            totalProducts: products[0].total,
            lowStockItems: lowStock[0].total,
            ordersToday: ordersToday[0].total,
            totalOrders: totalOrders[0].total
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

// Fallback to serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌐 Open your browser: http://localhost:${PORT}\n`);
});

