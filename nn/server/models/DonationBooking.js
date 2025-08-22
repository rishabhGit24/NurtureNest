const mongoose = require('mongoose');

const donationBookingSchema = new mongoose.Schema({
  // User who made the booking
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Orphanage where donation is being made
  orphanageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrphanageContact',
    required: true
  },
  
  // Donation category
  category: {
    type: String,
    enum: ['food', 'clothing', 'education', 'medical', 'financial', 'hygiene'],
    required: true
  },
  
  // Specific items being donated
  items: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    description: String
  }],
  
  // Special instructions or notes
  specialInstructions: String,
  
  // Booking status
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Orphanage response
  orphanageResponse: {
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    message: String,
    respondedAt: Date,
    respondedBy: String // orphanage owner name
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Preferred donation date (optional)
  preferredDate: Date,
  
  // Admin notes
  adminNotes: String
});

// Update timestamp on save
donationBookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
donationBookingSchema.index({ userId: 1, status: 1 });
donationBookingSchema.index({ orphanageId: 1, status: 1 });
donationBookingSchema.index({ category: 1, status: 1 });
donationBookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('DonationBooking', donationBookingSchema);
