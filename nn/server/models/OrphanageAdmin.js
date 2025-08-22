const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const orphanageAdminSchema = new mongoose.Schema({
  // Basic admin information
  name: {
    type: String,
    required: true
  },
  
  // Contact information
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Password for authentication
  password: {
    type: String,
    required: true
  },
  
  // Phone number
  phoneNumber: {
    type: String,
    required: true
  },
  
  // Role (owner, manager, staff)
  role: {
    type: String,
    enum: ['owner', 'manager', 'staff'],
    default: 'owner'
  },
  
  // Associated orphanage
  orphanageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrphanageContact',
    required: true
  },
  
  // Profile information
  profile: {
    avatar: String,
    bio: String,
    address: String
  },
  
  // Permissions
  permissions: {
    canManageBookings: {
      type: Boolean,
      default: true
    },
    canViewAnalytics: {
      type: Boolean,
      default: true
    },
    canManageStaff: {
      type: Boolean,
      default: false
    }
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Email verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  // Last login
  lastLogin: {
    type: Date,
    default: null
  },
  
  // Password reset token
  passwordResetToken: String,
  passwordResetExpires: Date,
  
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

// Hash password before saving
orphanageAdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
orphanageAdminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
orphanageAdminSchema.methods.getPublicProfile = function() {
  const adminObject = this.toObject();
  delete adminObject.password;
  delete adminObject.passwordResetToken;
  delete adminObject.passwordResetExpires;
  return adminObject;
};

// Index for efficient queries
orphanageAdminSchema.index({ email: 1 });
orphanageAdminSchema.index({ orphanageId: 1 });
orphanageAdminSchema.index({ isActive: 1 });

module.exports = mongoose.model('OrphanageAdmin', orphanageAdminSchema);
