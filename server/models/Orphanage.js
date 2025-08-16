const mongoose = require('mongoose');

const orphanageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Orphanage name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  contactPerson: {
    name: {
      type: String,
      required: [true, 'Contact person name is required']
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    }
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'India'
    },
    zipCode: String,
    coordinates: {
      lat: {
        type: Number,
        required: [true, 'Latitude is required']
      },
      lng: {
        type: Number,
        required: [true, 'Longitude is required']
      }
    }
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  capacity: {
    type: Number,
    min: [1, 'Capacity must be at least 1'],
    required: [true, 'Capacity is required']
  },
  currentOccupancy: {
    type: Number,
    default: 0,
    min: [0, 'Current occupancy cannot be negative']
  },
  needs: [{
    category: {
      type: String,
      enum: ['food', 'clothes', 'education', 'medical', 'hygiene', 'other'],
      required: true
    },
    subcategory: String,
    quantity: Number,
    unit: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationNotes: String,
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  operatingHours: {
    open: String,
    close: String,
    days: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }]
  },
  facilities: [String],
  website: String,
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String
  }
}, {
  timestamps: true
});

// Index for geospatial queries
orphanageSchema.index({ "address.coordinates": "2dsphere" });

// Index for search functionality
orphanageSchema.index({ name: "text", description: "text" });

// Virtual for full address
orphanageSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state}, ${this.address.country}`;
});

// Method to check if orphanage is open
orphanageSchema.methods.isOpen = function() {
  if (!this.operatingHours.open || !this.operatingHours.close) return true;
  
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
  
  return this.operatingHours.days.includes(currentDay) &&
         currentTime >= this.operatingHours.open &&
         currentTime <= this.operatingHours.close;
};

module.exports = mongoose.model('Orphanage', orphanageSchema);
