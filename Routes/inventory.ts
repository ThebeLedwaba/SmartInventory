import express from 'express';
import { body, query, param, validationResult } from 'express-validator';
import Item, { IItem } from '../models/Item.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { AppError } from '../utils/errors.js';
import { emitInventoryUpdate } from '../config/socket.js';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Validation schemas
const createItemValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('sku').isUppercase().matches(/^[A-Z0-9-]+$/).withMessage('Invalid SKU format'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('minQuantity').isInt({ min: 0 }).withMessage('Minimum quantity must be non-negative'),
  body('maxQuantity').isInt({ min: 0 }).withMessage('Maximum quantity must be non-negative'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('cost').isFloat({ min: 0 }).withMessage('Cost must be non-negative'),
  body('location').trim().notEmpty().withMessage('Location is required'),
];

const updateItemValidation = [
  param('id').isMongoId().withMessage('Invalid item ID'),
  ...createItemValidation.map(validation => validation.optional())
];

// GET /api/inventory - Get all items with advanced filtering
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().trim(),
  query('category').optional().trim(),
  query('status').optional().isIn(['in-stock', 'out-of-stock', 'low-stock', 'maintenance', 'discontinued']),
  query('location').optional().trim(),
  query('minQuantity').optional().isInt({ min: 0 }),
  query('maxQuantity').optional().isInt({ min: 0 }),
  query('sortBy').optional().isIn(['name', 'quantity', 'price', 'createdAt', 'updatedAt']),
  query('sortOrder').optional().isIn(['asc', 'desc']),
], validateRequest, async (req: any, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      status,
      location,
      minQuantity,
      maxQuantity,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (location) filter.location = location;

    // Quantity range filter
    if (minQuantity || maxQuantity) {
      filter.quantity = {};
      if (minQuantity) filter.quantity.$gte = parseInt(minQuantity);
      if (maxQuantity) filter.quantity.$lte = parseInt(maxQuantity);
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      Item.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Item.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/inventory/stats - Get inventory statistics
router.get('/stats', async (req: any, res, next) => {
  try {
    const stats = await Item.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalValue: { $sum: { $multiply: ['$quantity', '$cost'] } },
          averagePrice: { $avg: '$price' },
          lowStockItems: {
            $sum: {
              $cond: [
                { $and: [
                  { $lte: ['$quantity', '$minQuantity'] },
                  { $ne: ['$status', 'discontinued'] }
                ]},
                1,
                0
              ]
            }
          },
          outOfStockItems: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'out-of-stock'] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalItems: 1,
          totalQuantity: 1,
          totalValue: { $round: ['$totalValue', 2] },
          averagePrice: { $round: ['$averagePrice', 2] },
          lowStockItems: 1,
          outOfStockItems: 1
        }
      }
    ]);

    const categoryStats = await Item.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {},
        byCategory: categoryStats
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/inventory - Create a new item
router.post('/', createItemValidation, validateRequest, async (req: any, res, next) => {
  try {
    const itemData = {
      ...req.body,
      createdBy: req.user.userId
    };

    const item = new Item(itemData);
    await item.save();

    // Emit real-time update
    emitInventoryUpdate('item_created', item);

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new AppError('SKU already exists', 400));
    }
    next(error);
  }
});

// PUT /api/inventory/:id - Update an item
router.put('/:id', updateItemValidation, validateRequest, async (req: any, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return next(new AppError('Item not found', 404));
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Emit real-time update
    emitInventoryUpdate('item_updated', updatedItem);

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/inventory/:id - Delete an item
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid item ID')
], validateRequest, async (req: any, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return next(new AppError('Item not found', 404));
    }

    await Item.findByIdAndDelete(req.params.id);

    // Emit real-time update
    emitInventoryUpdate('item_deleted', { _id: req.params.id });

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/inventory/:id/checkout - Checkout item
router.post('/:id/checkout', [
  param('id').isMongoId().withMessage('Invalid item ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('reason').trim().notEmpty().withMessage('Reason is required')
], validateRequest, async (req: any, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return next(new AppError('Item not found', 404));
    }

    const { quantity, reason } = req.body;

    if (item.quantity < quantity) {
      return next(new AppError('Insufficient quantity available', 400));
    }

    const newQuantity = item.quantity - quantity;
    await item.updateQuantity(newQuantity, reason, req.user.userId);

    // Emit real-time update
    emitInventoryUpdate('item_checked_out', item);

    res.json({
      success: true,
      message: 'Item checked out successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/inventory/:id/restock - Restock item
router.post('/:id/restock', [
  param('id').isMongoId().withMessage('Invalid item ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('reason').trim().notEmpty().withMessage('Reason is required')
], validateRequest, async (req: any, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return next(new AppError('Item not found', 404));
    }

    const { quantity, reason } = req.body;
    const newQuantity = item.quantity + quantity;

    await item.updateQuantity(newQuantity, reason, req.user.userId);
    item.lastRestocked = new Date();
    await item.save();

    // Emit real-time update
    emitInventoryUpdate('item_restocked', item);

    res.json({
      success: true,
      message: 'Item restocked successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/inventory/low-stock - Get low stock items
router.get('/low-stock', async (req: any, res, next) => {
  try {
    const lowStockItems = await Item.findLowStock();

    res.json({
      success: true,
      data: lowStockItems
    });
  } catch (error) {
    next(error);
  }
});

export default router;
