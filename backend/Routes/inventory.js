import express from 'express';
import { body, validationResult } from 'express-validator';
import Item from '../models/Item.js';

const router = express.Router();

// Validation middleware
const validateItem = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  body('status').isIn(['in-stock', 'out-of-stock', 'maintenance']).withMessage('Invalid status')
];

// GET all items with optional filtering
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/inventory - Fetching all items');
    const { status, minQuantity } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (minQuantity) filter.quantity = { $gte: parseInt(minQuantity) };
    
    const items = await Item.find(filter).sort({ name: 1 });
    console.log(`Found ${items.length} items`);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Server error while fetching items' });
  }
});

// POST a new item
router.post('/', validateItem, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description, quantity, status } = req.body;
    const newItem = new Item({ 
      name: name.trim(),
      description: description ? description.trim() : '',
      quantity,
      status: status || 'in-stock'
    });
    
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while adding item' });
  }
});

// PUT to update an item
router.put('/:id', validateItem, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating item' });
  }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting item' });
  }
});

export default router;
