// Dashboard JavaScript
const API_URL = 'http://localhost:3000/api';

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_URL}/dashboard`);
        const data = await response.json();
        
        document.getElementById('totalProducts').textContent = data.totalProducts;
        document.getElementById('lowStockItems').textContent = data.lowStockItems;
        document.getElementById('ordersToday').textContent = data.ordersToday;
        document.getElementById('totalOrders').textContent = data.totalOrders;
        
        // Load recent products
        await loadRecentProducts();
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Load recent products
async function loadRecentProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        
        const recentProductsDiv = document.getElementById('recentProducts');
        if (products.length === 0) {
            recentProductsDiv.innerHTML = '<p class="loading">No products found</p>';
            return;
        }
        
        const recent = products.slice(0, 5);
        recentProductsDiv.innerHTML = recent.map(product => `
            <div class="product-item">
                <div>
                    <strong>${product.name}</strong>
                    <br>
                    <small>Stock: ${product.quantity} | ${product.category}</small>
                </div>
                <span class="status-badge ${product.quantity <= product.min_stock_level ? 'status-low' : 'status-ok'}">
                    ${product.quantity <= product.min_stock_level ? '⚠️ Low Stock' : '✓ In Stock'}
                </span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading recent products:', error);
        document.getElementById('recentProducts').innerHTML = '<p class="loading">Error loading products</p>';
    }
}

// Initialize dashboard on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDashboardStats);
} else {
    loadDashboardStats();
}

