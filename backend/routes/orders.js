const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const [orders] = await db.query(
            'SELECT * FROM orders ORDER BY created_at DESC'
        );
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Get single order with items
router.get('/:id', async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (orders.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        const order = orders[0];
        const [items] = await db.query(
            `SELECT oi.*, p.name, p.sku 
             FROM order_items oi 
             JOIN products p ON oi.product_id = p.id 
             WHERE oi.order_id = ?`,
            [req.params.id]
        );
        
        order.items = items;
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// Create new order
router.post('/', async (req, res) => {
    try {
        const { customer_name, customer_email, customer_phone, items } = req.body;
        
        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order must contain at least one item' });
        }
        
        // Validate items
        for (const item of items) {
            if (!item.product_id || !item.quantity || !item.price) {
                return res.status(400).json({ 
                    error: 'Each item must have product_id, quantity, and price' 
                });
            }
            if (isNaN(item.quantity) || item.quantity <= 0) {
                return res.status(400).json({ error: 'Quantity must be a positive number' });
            }
            if (isNaN(item.price) || item.price <= 0) {
                return res.status(400).json({ error: 'Price must be a positive number' });
            }
        }
        
        // Check inventory availability
        for (const item of items) {
            const [inventory] = await db.query(
                'SELECT quantity FROM inventory WHERE product_id = ?',
                [item.product_id]
            );
            
            if (inventory.length === 0) {
                return res.status(404).json({ 
                    error: `Product ${item.product_id} not found in inventory` 
                });
            }
            
            if (inventory[0].quantity < item.quantity) {
                return res.status(400).json({ 
                    error: `Insufficient stock for product ${item.product_id}` 
                });
            }
        }
        
        // Generate order number
        const order_number = `ORD-${Date.now()}`;
        
        // Calculate total
        let total_amount = 0;
        for (const item of items) {
            total_amount += item.price * item.quantity;
        }
        
        // Create order
        const [result] = await db.query(
            'INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, total_amount) VALUES (?, ?, ?, ?, ?)',
            [order_number, customer_name, customer_email, customer_phone, total_amount]
        );
        
        // Insert order items and update inventory
        for (const item of items) {
            await db.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)',
                [result.insertId, item.product_id, item.quantity, item.price, item.price * item.quantity]
            );
            
            // Update inventory
            await db.query(
                'UPDATE inventory SET quantity = quantity - ? WHERE product_id = ?',
                [item.quantity, item.product_id]
            );
            
            // Log stock movement
            await db.query(
                'INSERT INTO stock_movements (product_id, movement_type, quantity, reason, reference_type, reference_id) VALUES (?, ?, ?, ?, ?, ?)',
                [item.product_id, 'out', item.quantity, 'Order sale', 'order', result.insertId]
            );
        }
        
        res.status(201).json({ id: result.insertId, order_number, message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Update order status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        // Validate status
        const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ 
                error: 'Invalid status',
                validStatuses: validStatuses 
            });
        }
        
        const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

module.exports = router;

