// Products Management JavaScript
const API_URL = 'http://localhost:3000/api';

let allProducts = [];
let currentFilter = '';
let currentCategory = '';

// Load all products
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('productsTable').innerHTML = 
            '<tr><td colspan="6" class="loading">Error loading products</td></tr>';
    }
}

// Display products in table
function displayProducts(products) {
    const tbody = document.getElementById('productsTable');
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">No products found</td></tr>';
        return;
    }
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td><strong>${product.name}</strong></td>
            <td>${product.sku}</td>
            <td>${product.category || 'N/A'}</td>
            <td>$${parseFloat(product.price).toFixed(2)}</td>
            <td>
                <span class="status-badge ${product.quantity <= product.min_stock_level ? 'status-low' : 'status-ok'}">
                    ${product.quantity}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-primary" onclick="editProduct(${product.id})">✏️ Edit</button>
                    <button class="btn-small btn-danger" onclick="deleteProduct(${product.id})">🗑️ Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Search products
function searchProducts() {
    currentFilter = document.getElementById('searchInput').value.toLowerCase();
    applyFilters();
}

// Filter products
function filterProducts() {
    currentCategory = document.getElementById('categoryFilter').value;
    applyFilters();
}

function applyFilters() {
    const filtered = allProducts.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(currentFilter) ||
                          product.sku.toLowerCase().includes(currentFilter);
        const matchCategory = !currentCategory || product.category === currentCategory;
        return matchSearch && matchCategory;
    });
    displayProducts(filtered);
}

// Show add product modal
function showAddProductModal() {
    document.getElementById('modalTitle').textContent = 'Add Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Edit product
async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const product = await response.json();
        
        document.getElementById('modalTitle').textContent = 'Edit Product';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productSku').value = product.sku;
        document.getElementById('productCategory').value = product.category || '';
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCost').value = product.cost;
        document.getElementById('productQuantity').value = product.quantity;
        document.getElementById('productMinStock').value = product.min_stock_level;
        document.getElementById('productLocation').value = product.location || 'Warehouse A';
        
        document.getElementById('productModal').style.display = 'block';
    } catch (error) {
        console.error('Error loading product:', error);
        alert('Failed to load product data');
    }
}

// Handle form submission
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const productData = {
        name: document.getElementById('productName').value,
        sku: document.getElementById('productSku').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        cost: parseFloat(document.getElementById('productCost').value),
        quantity: parseInt(document.getElementById('productQuantity').value),
        min_stock_level: parseInt(document.getElementById('productMinStock').value),
        location: document.getElementById('productLocation').value
    };
    
    try {
        const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        
        if (response.ok) {
            closeModal();
            loadProducts();
            alert(id ? 'Product updated successfully!' : 'Product added successfully!');
        } else {
            alert('Failed to save product');
        }
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product');
    }
});

// Delete product
async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadProducts();
            alert('Product deleted successfully!');
        } else {
            alert('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProducts);
} else {
    loadProducts();
}

