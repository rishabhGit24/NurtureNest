const mongoose = require('mongoose');

const orphanageContactSchema = new mongoose.Schema({
  // Basic orphanage information
  name: {
    type: String,
    required: true,
    unique: true
  },
  
  // Contact information
  phoneNumber: {
    type: String,
    required: true
  },
  
  whatsappNumber: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true
  },
  
  // Address information
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  
  // Location coordinates
  location: {
    latitude: Number,
    longitude: Number
  },
  
  // Orphanage type and description
  type: String,
  description: String,
  
  // Admin/owner information
  ownerName: String,
  ownerPhone: String,
  ownerEmail: String,
  
  // Operating hours
  operatingHours: {
    open: String,
    close: String,
    days: [String]
  },
  
  // Donation preferences
  donationPreferences: {
    acceptedCategories: [{
      type: String,
      enum: ['food', 'clothing', 'education', 'medical', 'financial', 'hygiene']
    }],
    preferredItems: [String],
    restrictions: [String]
  },
  
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
orphanageContactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
orphanageContactSchema.index({ name: 1 });
orphanageContactSchema.index({ whatsappNumber: 1 });
orphanageContactSchema.index({ isActive: 1 });

module.exports = mongoose.model('OrphanageContact', orphanageContactSchema);
