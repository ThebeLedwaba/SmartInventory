// Configuration
const API_URL = '/api/inventory';
const STATUS_OPTIONS = {
  'in-stock': 'In Stock',
  'out-of-stock': 'Out of Stock',
  'maintenance': 'In Maintenance'
};

// DOM Elements
const inventoryDiv = document.getElementById('inventory');
const itemForm = document.getElementById('item-form');
const searchInput = document.getElementById('search');
const statusFilter = document.getElementById('status-filter');
const minQuantityFilter = document.getElementById('min-quantity');
const errorDiv = document.getElementById('error-message');

// Helper functions
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => errorDiv.style.display = 'none', 5000);
}

function formatStatus(status) {
  return STATUS_OPTIONS[status] || status;
}

async function handleApiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Request failed');
    }
    
    return await response.json();
  } catch (error) {
    displayError(error.message);
    throw error;
  }
}

// Fetch and display items with filters
async function fetchItems() {
  try {
    const params = new URLSearchParams();
    if (statusFilter.value) params.append('status', statusFilter.value);
    if (minQuantityFilter.value) params.append('minQuantity', minQuantityFilter.value);
    if (searchInput.value) params.append('search', searchInput.value);
    
    const queryString = params.toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;
    
    const items = await handleApiCall(url);
    
    inventoryDiv.innerHTML = items.length === 0 
      ? '<div class="no-items">No items found</div>'
      : items.map(item => `
          <div class="item" data-id="${item._id}">
            <div class="item-info">
              <h3>${item.name}</h3>
              <p>${item.description || 'No description'}</p>
              <div class="item-meta">
                <span class="quantity">Quantity: ${item.quantity}</span>
                <span class="status ${item.status}">${formatStatus(item.status)}</span>
              </div>
            </div>
            <div class="item-actions">
              <button class="edit" onclick="openEditModal('${item._id}')">Edit</button>
              <button class="delete" onclick="confirmDelete('${item._id}')">Delete</button>
            </div>
          </div>
        `).join('');
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

// Add a new item
itemForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(itemForm);
  const itemData = {
    name: formData.get('name').trim(),
    description: formData.get('description').trim(),
    quantity: parseInt(formData.get('quantity')),
    status: formData.get('status')
  };
  
  try {
    await handleApiCall(API_URL, {
      method: 'POST',
      body: JSON.stringify(itemData)
    });
    
    itemForm.reset();
    fetchItems();
  } catch (error) {
    console.error('Error adding item:', error);
  }
});

// Delete an item with confirmation
async function confirmDelete(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  try {
    await handleApiCall(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchItems();
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

// Open edit modal
function openEditModal(id) {
  // In a real app, you would implement a proper modal
  const newName = prompt('Enter new name:');
  const newQuantity = prompt('Enter new quantity:');
  const newStatus = prompt('Enter new status (in-stock, out-of-stock, maintenance):');
  
  if (newName || newQuantity || newStatus) {
    updateItem(id, {
      ...(newName && { name: newName }),
      ...(newQuantity && { quantity: parseInt(newQuantity) }),
      ...(newStatus && { status: newStatus })
    });
  }
}

// Update an item
async function updateItem(id, updates) {
  try {
    await handleApiCall(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    fetchItems();
  } catch (error) {
    console.error('Error updating item:', error);
  }
}

// Filter event listeners
searchInput.addEventListener('input', debounce(fetchItems, 300));
statusFilter.addEventListener('change', fetchItems);
minQuantityFilter.addEventListener('change', fetchItems);

// Debounce helper for search
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Initial load
document.addEventListener('DOMContentLoaded', fetchItems);
