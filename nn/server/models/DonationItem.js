const mongoose = require('mongoose');

const donationItemSchema = new mongoose.Schema({
  // Item name
  name: {
    type: String,
    required: true
  },
  
  // Category this item belongs to
  category: {
    type: String,
    enum: ['food', 'clothing', 'education', 'medical', 'financial', 'hygiene'],
    required: true
  },
  
  // Subcategory for better organization
  subcategory: String,
  
  // Description of the item
  description: String,
  
  // Default unit for this item
  defaultUnit: {
    type: String,
    required: true
  },
  
  // Alternative units
  alternativeUnits: [String],
  
  // Whether this item is currently needed
  isNeeded: {
    type: Boolean,
    default: true
  },
  
  // Priority level (high, medium, low)
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  
  // Tags for search and filtering
  tags: [String],
  
  // Image URL for the item
  imageUrl: String,
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
donationItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
donationItemSchema.index({ category: 1, subcategory: 1 });
donationItemSchema.index({ isNeeded: 1, priority: 1 });
donationItemSchema.index({ tags: 1 });
donationItemSchema.index({ isActive: 1 });

module.exports = mongoose.model('DonationItem', donationItemSchema);
