const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
      message: '{VALUE} is not a valid category'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  ingredients: {
    type: [String],
    default: []
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    min: [0, 'Preparation time cannot be negative'],
    comment: 'Time in minutes'
  },
  imageUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Text index for search functionality
menuItemSchema.index({ name: 'text', ingredients: 'text' });

// Compound index for filtering
menuItemSchema.index({ category: 1, isAvailable: 1 });
menuItemSchema.index({ price: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
