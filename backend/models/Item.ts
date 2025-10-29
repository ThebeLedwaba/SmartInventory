import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Item name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  quantity: { 
    type: Number, 
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  status: { 
    type: String, 
    enum: {
      values: ['in-stock', 'out-of-stock', 'maintenance'],
      message: 'Status is either in-stock, out-of-stock, or maintenance'
    },
    default: 'in-stock'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add text index for searching
ItemSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Item', ItemSchema);
