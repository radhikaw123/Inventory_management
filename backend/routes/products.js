const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all products
router.get('/', async (req, res) => {
    try {
        const [products] = await db.query(
            `SELECT p.*, i.quantity, i.min_stock_level, i.location 
             FROM products p 
             LEFT JOIN inventory i ON p.id = i.product_id 
             ORDER BY p.created_at DESC`
        );
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const [products] = await db.query(
            `SELECT p.*, i.quantity, i.min_stock_level, i.location 
             FROM products p 
             LEFT JOIN inventory i ON p.id = i.product_id 
             WHERE p.id = ?`,
            [req.params.id]
        );
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(products[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Create new product
router.post('/', async (req, res) => {
    try {
        const { name, description, category, sku, price, cost, quantity, min_stock_level, location } = req.body;
        
        // Validate required fields
        if (!name || !sku || !price || !cost) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                required: ['name', 'sku', 'price', 'cost']
            });
        }
        
        // Validate numeric fields
        if (isNaN(price) || isNaN(cost) || price <= 0 || cost <= 0) {
            return res.status(400).json({ error: 'Price and cost must be positive numbers' });
        }
        
        const [result] = await db.query(
            'INSERT INTO products (name, description, category, sku, price, cost) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, category, sku, price, cost]
        );
        
        // Create inventory entry
        await db.query(
            'INSERT INTO inventory (product_id, quantity, min_stock_level, location) VALUES (?, ?, ?, ?)',
            [result.insertId, quantity || 0, min_stock_level || 10, location || 'Warehouse A']
        );
        
        res.status(201).json({ id: result.insertId, message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Product with this SKU already exists' });
        } else {
            res.status(500).json({ error: 'Failed to create product' });
        }
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        const { name, description, category, sku, price, cost, quantity, min_stock_level, location } = req.body;
        
        // Validate numeric fields if provided
        if (price !== undefined && (isNaN(price) || price <= 0)) {
            return res.status(400).json({ error: 'Price must be a positive number' });
        }
        if (cost !== undefined && (isNaN(cost) || cost <= 0)) {
            return res.status(400).json({ error: 'Cost must be a positive number' });
        }
        
        const [updateResult] = await db.query(
            'UPDATE products SET name = ?, description = ?, category = ?, sku = ?, price = ?, cost = ? WHERE id = ?',
            [name, description, category, sku, price, cost, req.params.id]
        );
        
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Update inventory
        await db.query(
            'UPDATE inventory SET quantity = ?, min_stock_level = ?, location = ? WHERE product_id = ?',
            [quantity, min_stock_level, location, req.params.id]
        );
        
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Product with this SKU already exists' });
        } else {
            res.status(500).json({ error: 'Failed to update product' });
        }
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;

