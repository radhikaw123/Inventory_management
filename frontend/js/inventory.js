// Inventory Management JavaScript
const API_URL = 'http://localhost:3000/api';

let allInventory = [];
let currentFilter = '';
let lowStockOnly = false;

// Load all inventory
async function loadInventory() {
    try {
        const response = await fetch(`${API_URL}/products`);
        allInventory = await response.json();
        displayInventory(allInventory);
    } catch (error) {
        console.error('Error loading inventory:', error);
        document.getElementById('inventoryTable').innerHTML = 
            '<tr><td colspan="8" class="loading">Error loading inventory</td></tr>';
    }
}

// Display inventory in table
function displayInventory(inventory) {
    const tbody = document.getElementById('inventoryTable');
    
    if (inventory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="loading">No inventory items found</td></tr>';
        return;
    }
    
    tbody.innerHTML = inventory.map(item => {
        const isLowStock = item.quantity <= item.min_stock_level;
        const statusClass = isLowStock ? 'status-low' : 'status-ok';
        const statusText = isLowStock ? '⚠️ Low Stock' : '✓ In Stock';
        
        return `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>${item.sku}</td>
                <td>${item.category || 'N/A'}</td>
                <td><strong>${item.quantity}</strong></td>
                <td>${item.min_stock_level || 'N/A'}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${item.location || 'N/A'}</td>
                <td>
                    <button class="btn-small btn-primary" onclick="updateInventory(${item.id}, '${item.name}')">✏️ Update</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Search inventory
function searchInventory() {
    currentFilter = document.getElementById('searchInput').value.toLowerCase();
    applyFilters();
}

// Filter inventory
function filterInventory() {
    lowStockOnly = document.getElementById('lowStockFilter').checked;
    applyFilters();
}

function applyFilters() {
    let filtered = allInventory.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(currentFilter) ||
                          item.sku.toLowerCase().includes(currentFilter);
        return matchSearch;
    });
    
    if (lowStockOnly) {
        filtered = filtered.filter(item => item.quantity <= item.min_stock_level);
    }
    
    displayInventory(filtered);
}

// Update inventory
async function updateInventory(id, name) {
    const currentItem = allInventory.find(item => item.id === id);
    
    const quantity = prompt(`Enter new quantity for ${name}:`, currentItem.quantity);
    if (quantity === null) return;
    
    const qtyNum = parseInt(quantity);
    if (isNaN(qtyNum) || qtyNum < 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    const minStock = prompt('Enter minimum stock level:', currentItem.min_stock_level || 10);
    if (minStock === null) return;
    
    const location = prompt('Enter location:', currentItem.location || 'Warehouse A');
    if (location === null) return;
    
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: currentItem.name,
                description: currentItem.description,
                category: currentItem.category,
                sku: currentItem.sku,
                price: currentItem.price,
                cost: currentItem.cost,
                quantity: qtyNum,
                min_stock_level: parseInt(minStock),
                location: location
            })
        });
        
        if (response.ok) {
            loadInventory();
            alert('Inventory updated successfully!');
        } else {
            alert('Failed to update inventory');
        }
    } catch (error) {
        console.error('Error updating inventory:', error);
        alert('Failed to update inventory');
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadInventory);
} else {
    loadInventory();
}

