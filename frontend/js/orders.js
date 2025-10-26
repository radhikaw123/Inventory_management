// Orders Management JavaScript
const API_URL = 'http://localhost:3000/api';

let allProducts = [];
let orderItems = [];

// Load all orders
async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`);
        const orders = await response.json();
        displayOrders(orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        document.getElementById('ordersTable').innerHTML = 
            '<tr><td colspan="7" class="loading">Error loading orders</td></tr>';
    }
}

// Display orders in table
function displayOrders(orders) {
    const tbody = document.getElementById('ordersTable');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="loading">No orders found</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.order_number}</strong></td>
            <td>${order.customer_name}</td>
            <td>${order.customer_email || 'N/A'}</td>
            <td>${new Date(order.order_date).toLocaleDateString()}</td>
            <td>$${parseFloat(order.total_amount).toFixed(2)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-primary" onclick="viewOrder(${order.id})">👁️ View</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load all products for order creation
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        allProducts = await response.json();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Show create order modal
function showCreateOrderModal() {
    orderItems = [];
    document.getElementById('orderForm').reset();
    renderOrderItems();
    document.getElementById('orderModal').style.display = 'block';
}

// Close order modal
function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    orderItems = [];
}

// Add order item
function addOrderItem() {
    if (allProducts.length === 0) {
        alert('Please wait for products to load');
        return;
    }
    
    const productId = prompt('Enter product ID (from the products page)');
    if (!productId) return;
    
    const product = allProducts.find(p => p.id == productId);
    if (!product) {
        alert('Product not found');
        return;
    }
    
    const quantity = parseInt(prompt(`Enter quantity for ${product.name}:`, '1'));
    if (!quantity || quantity <= 0) return;
    
    if (quantity > product.quantity) {
        alert(`Insufficient stock. Available: ${product.quantity}`);
        return;
    }
    
    orderItems.push({
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
    });
    
    renderOrderItems();
}

// Render order items
function renderOrderItems() {
    const container = document.getElementById('orderItems');
    
    if (orderItems.length === 0) {
        container.innerHTML = '<p class="loading">No items added yet</p>';
        return;
    }
    
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    container.innerHTML = `
        ${orderItems.map((item, index) => `
            <div class="order-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button type="button" class="btn-small btn-danger" onclick="removeOrderItem(${index})">Remove</button>
            </div>
        `).join('')}
        <div style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 5px;">
            <strong>Total: $${total.toFixed(2)}</strong>
        </div>
    `;
}

// Remove order item
function removeOrderItem(index) {
    orderItems.splice(index, 1);
    renderOrderItems();
}

// Handle order form submission
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (orderItems.length === 0) {
        alert('Please add at least one item to the order');
        return;
    }
    
    const orderData = {
        customer_name: document.getElementById('customerName').value,
        customer_email: document.getElementById('customerEmail').value,
        customer_phone: document.getElementById('customerPhone').value,
        items: orderItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
        }))
    };
    
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            closeOrderModal();
            loadOrders();
            alert('Order created successfully!');
        } else {
            alert('Failed to create order');
        }
    } catch (error) {
        console.error('Error creating order:', error);
        alert('Failed to create order');
    }
});

// View order details
async function viewOrder(id) {
    try {
        const response = await fetch(`${API_URL}/orders/${id}`);
        const order = await response.json();
        
        let itemsHtml = order.items.map(item => 
            `${item.quantity}x ${item.name} - $${(item.quantity * item.price).toFixed(2)}`
        ).join('\n');
        
        alert(`Order: ${order.order_number}\n` +
              `Customer: ${order.customer_name}\n` +
              `Date: ${new Date(order.order_date).toLocaleString()}\n` +
              `Status: ${order.status}\n` +
              `Items:\n${itemsHtml}\n` +
              `Total: $${parseFloat(order.total_amount).toFixed(2)}`);
    } catch (error) {
        console.error('Error loading order:', error);
        alert('Failed to load order details');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target == modal) {
        closeOrderModal();
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadOrders();
        loadProducts();
    });
} else {
    loadOrders();
    loadProducts();
}

