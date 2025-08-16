const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Donor is required']
  },
  orphanage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orphanage',
    required: [true, 'Orphanage is required']
  },
  category: {
    type: String,
    enum: ['food', 'clothes', 'education', 'medical', 'money', 'hygiene', 'other'],
    required: [true, 'Category is required']
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  estimatedValue: {
    type: Number,
    min: [0, 'Estimated value cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  deliveryMethod: {
    type: String,
    enum: ['pickup', 'delivery', 'dropoff'],
    required: [true, 'Delivery method is required']
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pickupAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  preferredDeliveryDate: {
    type: Date,
    required: [true, 'Preferred delivery date is required']
  },
  actualDeliveryDate: Date,
  notes: {
    donor: String,
    orphanage: String,
    admin: String
  },
  images: [String],
  isUrgent: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trackingNumber: String,
  feedback: {
    donor: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      submittedAt: Date
    },
    orphanage: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      submittedAt: Date
    }
  },
  notifications: {
    donorNotified: { type: Boolean, default: false },
    orphanageNotified: { type: Boolean, default: false },
    volunteerNotified: { type: Boolean, default: false },
    lastNotificationSent: Date
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
donationSchema.index({ donor: 1, createdAt: -1 });
donationSchema.index({ orphanage: 1, status: 1 });
donationSchema.index({ category: 1, status: 1 });
donationSchema.index({ status: 1, preferredDeliveryDate: 1 });

// Virtual for donation age
donationSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for days until delivery
donationSchema.virtual('daysUntilDelivery').get(function() {
  if (!this.preferredDeliveryDate) return null;
  const now = new Date();
  const delivery = new Date(this.preferredDeliveryDate);
  return Math.ceil((delivery - now) / (1000 * 60 * 60 * 24));
});

// Method to check if donation is overdue
donationSchema.methods.isOverdue = function() {
  if (!this.preferredDeliveryDate) return false;
  return new Date() > this.preferredDeliveryDate && this.status === 'pending';
};

// Method to update status
donationSchema.methods.updateStatus = function(newStatus, notes = '') {
  this.status = newStatus;
  if (notes) {
    this.notes.admin = notes;
  }
  return this.save();
};

// Pre-save middleware to set priority based on urgency
donationSchema.pre('save', function(next) {
  if (this.isUrgent && this.priority !== 'urgent') {
    this.priority = 'urgent';
  }
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
