// routes/inventory.js
const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
});

// POST a new item
router.post("/", async (req, res) => {
  try {
    const { name, description, quantity, status } = req.body;
    const newItem = new Item({ name, description, quantity, status });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
});

// PUT to update an item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

// DELETE an item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

module.exports = router;
