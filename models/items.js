import mongoose, { Document, Schema, Model } from 'mongoose';
import { generateQRCode } from '../utils/qrGenerator.js';

export interface IItem extends Document {
  name: string;
  description?: string;
  sku: string;
  category: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  price: number;
  cost: number;
  supplier: string;
  location: string;
  status: 'in-stock' | 'out-of-stock' | 'low-stock' | 'maintenance' | 'discontinued';
  qrCode: string;
  barcode?: string;
  imageUrl?: string;
  tags: string[];
  lastRestocked: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IItemMethods {
  updateQuantity(newQuantity: number, reason: string, userId: mongoose.Types.ObjectId): Promise<void>;
  isLowStock(): boolean;
  needsRestocking(): boolean;
}

export type ItemModel = Model<IItem, {}, IItemMethods>;

const ItemSchema = new Schema<IItem, ItemModel, IItemMethods>({
  name: { 
    type: String, 
    required: [true, 'Item name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    index: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    uppercase: true,
    match: [/^[A-Z0-9-]+$/, 'SKU can only contain letters, numbers, and hyphens']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    index: true
  },
  quantity: { 
    type: Number, 
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  minQuantity: {
    type: Number,
    required: true,
    min: [0, 'Minimum quantity cannot be negative'],
    default: 5
  },
  maxQuantity: {
    type: Number,
    required: true,
    min: [0, 'Maximum quantity cannot be negative'],
    default: 100
  },
  unit: {
    type: String,
    required: true,
    default: 'pcs'
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  cost: {
    type: Number,
    min: [0, 'Cost cannot be negative'],
    default: 0
  },
  supplier: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    index: true
  },
  status: { 
    type: String, 
    enum: {
      values: ['in-stock', 'out-of-stock', 'low-stock', 'maintenance', 'discontinued'],
      message: 'Status must be: in-stock, out-of-stock, low-stock, maintenance, or discontinued'
    },
    default: 'in-stock',
    index: true
  },
  qrCode: {
    type: String
  },
  barcode: {
    type: String
  },
  imageUrl: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  lastRestocked: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for stock value
ItemSchema.virtual('stockValue').get(function(this: IItem) {
  return this.quantity * this.cost;
});

// Virtual for profit margin
ItemSchema.virtual('profitMargin').get(function(this: IItem) {
  if (this.cost === 0) return 0;
  return ((this.price - this.cost) / this.cost) * 100;
});

// Indexes for better query performance
ItemSchema.index({ name: 'text', description: 'text', tags: 'text' });
ItemSchema.index({ category: 1, status: 1 });
ItemSchema.index({ quantity: 1 });
ItemSchema.index({ createdAt: -1 });

// Pre-save middleware to generate QR code and update status
ItemSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('sku')) {
    this.qrCode = await generateQRCode(this.sku);
  }

  // Update status based on quantity
  if (this.isModified('quantity')) {
    if (this.quantity === 0) {
      this.status = 'out-of-stock';
    } else if (this.quantity <= this.minQuantity) {
      this.status = 'low-stock';
    } else if (this.status === 'out-of-stock' || this.status === 'low-stock') {
      this.status = 'in-stock';
    }
  }

  next();
});

// Instance methods
ItemSchema.methods.updateQuantity = async function(
  newQuantity: number, 
  reason: string, 
  userId: mongoose.Types.ObjectId
): Promise<void> {
  const oldQuantity = this.quantity;
  this.quantity = newQuantity;
  
  // Create transaction record
  const Transaction = mongoose.model('Transaction');
  await Transaction.create({
    item: this._id,
    type: newQuantity > oldQuantity ? 'restock' : 'withdrawal',
    quantityChanged: Math.abs(newQuantity - oldQuantity),
    previousQuantity: oldQuantity,
    newQuantity,
    reason,
    performedBy: userId
  });

  await this.save();
};

ItemSchema.methods.isLowStock = function(): boolean {
  return this.quantity <= this.minQuantity;
};

ItemSchema.methods.needsRestocking = function(): boolean {
  return this.quantity <= this.minQuantity;
};

// Static methods
ItemSchema.statics.findLowStock = function() {
  return this.find({ 
    $expr: { $lte: ['$quantity', '$minQuantity'] },
    status: { $ne: 'discontinued' }
  });
};

ItemSchema.statics.findByCategory = function(category: string) {
  return this.find({ category }).sort({ name: 1 });
};

export default mongoose.model<IItem, ItemModel>('Item', ItemSchema);
