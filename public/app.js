// app.js

// API endpoint base URL
const API_URL = "/api/inventory";

// Fetch and display items
async function fetchItems() {
  const response = await fetch(API_URL);
  const items = await response.json();
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = "";

  items.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <span>${item.name} - ${item.description} (Qty: ${item.quantity}) - ${item.status}</span>
      <button class="edit" onclick="editItem('${item._id}')">Edit</button>
      <button class="delete" onclick="deleteItem('${item._id}')">Delete</button>
    `;
    inventoryDiv.appendChild(itemDiv);
  });
}

// Add a new item
document.getElementById("item-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const quantity = document.getElementById("quantity").value;
  const status = document.getElementById("status").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, quantity, status })
  });

  document.getElementById("item-form").reset();
  fetchItems();
});

// Delete an item
async function deleteItem(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchItems();
}

// Edit an item
async function editItem(id) {
  const newQuantity = prompt("Enter new quantity:");
  if (newQuantity) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity })
    });
    fetchItems();
  }
}

// Initial load of items
fetchItems();
