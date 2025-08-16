const express = require('express');
const { body, validationResult } = require('express-validator');
const Donation = require('../models/Donation');
const Orphanage = require('../models/Orphanage');
const { protect, authorize } = require('../middleware/auth');
const { sendNotification } = require('../services/notificationService');

const router = express.Router();

// @route   POST /api/donations
// @desc    Create a new donation
// @access  Private
router.post('/', protect, [
  body('orphanage')
    .isMongoId()
    .withMessage('Valid orphanage ID is required'),
  body('category')
    .isIn(['food', 'clothes', 'education', 'medical', 'money', 'hygiene', 'other'])
    .withMessage('Valid category is required'),
  body('subcategory')
    .notEmpty()
    .withMessage('Subcategory is required'),
  body('quantity')
    .isNumeric()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive number'),
  body('unit')
    .notEmpty()
    .withMessage('Unit is required'),
  body('deliveryMethod')
    .isIn(['pickup', 'delivery', 'dropoff'])
    .withMessage('Valid delivery method is required'),
  body('preferredDeliveryDate')
    .isISO8601()
    .withMessage('Valid delivery date is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array() 
      });
    }

    const {
      orphanage,
      category,
      subcategory,
      quantity,
      unit,
      description,
      estimatedValue,
      deliveryMethod,
      deliveryAddress,
      pickupAddress,
      preferredDeliveryDate,
      notes,
      isUrgent
    } = req.body;

    // Verify orphanage exists and is active
    const orphanageDoc = await Orphanage.findById(orphanage);
    if (!orphanageDoc) {
      return res.status(404).json({ 
        error: 'Orphanage not found' 
      });
    }

    if (!orphanageDoc.isActive) {
      return res.status(400).json({ 
        error: 'Orphanage is not active' 
      });
    }

    // Create donation
    const donation = new Donation({
      donor: req.user._id,
      orphanage,
      category,
      subcategory,
      quantity,
      unit,
      description,
      estimatedValue,
      deliveryMethod,
      deliveryAddress,
      pickupAddress,
      preferredDeliveryDate,
      notes: { donor: notes },
      isUrgent
    });

    await donation.save();

    // Send notification to orphanage
    try {
      await sendNotification({
        type: 'donation_request',
        donation,
        orphanage: orphanageDoc,
        donor: req.user
      });
    } catch (notificationError) {
      console.error('Notification failed:', notificationError);
      // Don't fail the donation creation if notification fails
    }

    // Populate references for response
    await donation.populate([
      { path: 'orphanage', select: 'name address contactPerson' },
      { path: 'donor', select: 'name email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      donation
    });

  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ 
      error: 'Failed to create donation' 
    });
  }
});

// @route   GET /api/donations
// @desc    Get donations with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      orphanage,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (orphanage) filter.orphanage = orphanage;
    
    // Users can only see their own donations unless they're admin/orphanage
    if (req.user.role === 'donor') {
      filter.donor = req.user._id;
    } else if (req.user.role === 'orphanage') {
      filter.orphanage = req.user._id;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const donations = await Donation.find(filter)
      .populate('orphanage', 'name address')
      .populate('donor', 'name email')
      .populate('volunteer', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const total = await Donation.countDocuments(filter);

    res.json({
      success: true,
      donations,
      pagination: {
        currentPage: page * 1,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit * 1
      }
    });

  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ 
      error: 'Failed to get donations' 
    });
  }
});

// @route   GET /api/donations/:id
// @desc    Get donation by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('orphanage', 'name address contactPerson')
      .populate('donor', 'name email phone')
      .populate('volunteer', 'name email phone');

    if (!donation) {
      return res.status(404).json({ 
        error: 'Donation not found' 
      });
    }

    // Check if user has access to this donation
    if (req.user.role === 'donor' && donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        error: 'Access denied' 
      });
    }

    if (req.user.role === 'orphanage' && donation.orphanage.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        error: 'Access denied' 
      });
    }

    res.json({
      success: true,
      donation
    });

  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ 
      error: 'Failed to get donation' 
    });
  }
});

// @route   PUT /api/donations/:id
// @desc    Update donation status (orphanage/admin only)
// @access  Private
router.put('/:id', protect, authorize('orphanage', 'admin'), [
  body('status')
    .isIn(['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'])
    .withMessage('Valid status is required'),
  body('notes.orphanage')
    .optional()
    .isString()
    .withMessage('Notes must be a string')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array() 
      });
    }

    const { status, notes } = req.body;

    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ 
        error: 'Donation not found' 
      });
    }

    // Check if user has access to this donation
    if (req.user.role === 'orphanage' && donation.orphanage.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        error: 'Access denied' 
      });
    }

    // Update donation
    donation.status = status;
    if (notes && notes.orphanage) {
      donation.notes.orphanage = notes.orphanage;
    }

    await donation.save();

    // Send notification to donor about status change
    try {
      await sendNotification({
        type: 'donation_status_update',
        donation,
        orphanage: req.user,
        donor: donation.donor
      });
    } catch (notificationError) {
      console.error('Notification failed:', notificationError);
    }

    res.json({
      success: true,
      message: 'Donation updated successfully',
      donation
    });

  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({ 
      error: 'Failed to update donation' 
    });
  }
});

// @route   DELETE /api/donations/:id
// @desc    Cancel donation (donor only, if status is pending)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ 
        error: 'Donation not found' 
      });
    }

    // Only donor can cancel their own donation
    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        error: 'Access denied' 
      });
    }

    // Only pending donations can be cancelled
    if (donation.status !== 'pending') {
      return res.status(400).json({ 
        error: 'Only pending donations can be cancelled' 
      });
    }

    donation.status = 'cancelled';
    await donation.save();

    res.json({
      success: true,
      message: 'Donation cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel donation error:', error);
    res.status(500).json({ 
      error: 'Failed to cancel donation' 
    });
  }
});

// @route   GET /api/donations/stats/overview
// @desc    Get donation statistics
// @access  Private
router.get('/stats/overview', protect, async (req, res) => {
  try {
    const filter = {};
    
    // Filter by user role
    if (req.user.role === 'donor') {
      filter.donor = req.user._id;
    } else if (req.user.role === 'orphanage') {
      filter.orphanage = req.user._id;
    }

    const stats = await Donation.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          accepted: { $sum: { $cond: [{ $eq: ['$status', 'accepted'] }, 1, 0] } },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          totalValue: { $sum: { $ifNull: ['$estimatedValue', 0] } }
        }
      }
    ]);

    const categoryStats = await Donation.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: { $ifNull: ['$estimatedValue', 0] } }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        total: 0,
        pending: 0,
        accepted: 0,
        completed: 0,
        totalValue: 0
      },
      categoryStats
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      error: 'Failed to get statistics' 
    });
  }
});

module.exports = router;
