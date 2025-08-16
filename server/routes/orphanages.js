const express = require('express');
const { body, validationResult } = require('express-validator');
const Orphanage = require('../models/Orphanage');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/orphanages
// @desc    Get all orphanages with search and filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      city,
      state,
      category,
      verified,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (verified === 'true') {
      filter.verificationStatus = 'verified';
    }
    
    if (city) {
      filter['address.city'] = { $regex: city, $options: 'i' };
    }
    
    if (state) {
      filter['address.state'] = { $regex: state, $options: 'i' };
    }
    
    if (category) {
      filter['needs.category'] = category;
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const orphanages = await Orphanage.find(filter)
      .select('name description address images needs verificationStatus')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const total = await Orphanage.countDocuments(filter);

    res.json({
      success: true,
      orphanages,
      pagination: {
        currentPage: page * 1,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit * 1
      }
    });

  } catch (error) {
    console.error('Get orphanages error:', error);
    res.status(500).json({ 
      error: 'Failed to get orphanages' 
    });
  }
});

// @route   GET /api/orphanages/search
// @desc    Search orphanages by location (nearby search)
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { lat, lng, radius = 50, limit = 20 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ 
        error: 'Latitude and longitude are required' 
      });
    }

    const coordinates = [parseFloat(lng), parseFloat(lat)];

    const orphanages = await Orphanage.find({
      isActive: true,
      verificationStatus: 'verified',
      'address.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    })
    .select('name description address images needs')
    .limit(parseInt(limit))
    .exec();

    res.json({
      success: true,
      orphanages,
      searchParams: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        radius: parseFloat(radius),
        results: orphanages.length
      }
    });

  } catch (error) {
    console.error('Search orphanages error:', error);
    res.status(500).json({ 
      error: 'Failed to search orphanages' 
    });
  }
});

// @route   GET /api/orphanages/:id
// @desc    Get orphanage by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const orphanage = await Orphanage.findById(req.params.id)
      .populate('verifiedBy', 'name');

    if (!orphanage) {
      return res.status(404).json({ 
        error: 'Orphanage not found' 
      });
    }

    if (!orphanage.isActive) {
      return res.status(404).json({ 
        error: 'Orphanage is not active' 
      });
    }

    res.json({
      success: true,
      orphanage
    });

  } catch (error) {
    console.error('Get orphanage error:', error);
    res.status(500).json({ 
      error: 'Failed to get orphanage' 
    });
  }
});

// @route   POST /api/orphanages
// @desc    Create new orphanage (admin only)
// @access  Private
router.post('/', protect, authorize('admin'), [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('contactPerson.name')
    .trim()
    .notEmpty()
    .withMessage('Contact person name is required'),
  body('contactPerson.phone')
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Valid phone number is required'),
  body('contactPerson.email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('address.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  body('address.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('address.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('address.coordinates.lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid latitude is required'),
  body('address.coordinates.lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid longitude is required'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive number'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required')
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

    const orphanage = new Orphanage(req.body);
    await orphanage.save();

    res.status(201).json({
      success: true,
      message: 'Orphanage created successfully',
      orphanage
    });

  } catch (error) {
    console.error('Create orphanage error:', error);
    res.status(500).json({ 
      error: 'Failed to create orphanage' 
    });
  }
});

// @route   PUT /api/orphanages/:id
// @desc    Update orphanage (admin or orphanage owner)
// @access  Private
router.put('/:id', protect, authorize('admin', 'orphanage'), [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('contactPerson.phone')
    .optional()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Valid phone number is required'),
  body('contactPerson.email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required')
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

    const orphanage = await Orphanage.findById(req.params.id);
    if (!orphanage) {
      return res.status(404).json({ 
        error: 'Orphanage not found' 
      });
    }

    // Check if user has access to this orphanage
    if (req.user.role === 'orphanage' && orphanage._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        error: 'Access denied' 
      });
    }

    // Update orphanage
    Object.keys(req.body).forEach(key => {
      if (key !== 'verificationStatus' || req.user.role === 'admin') {
        orphanage[key] = req.body[key];
      }
    });

    await orphanage.save();

    res.json({
      success: true,
      message: 'Orphanage updated successfully',
      orphanage
    });

  } catch (error) {
    console.error('Update orphanage error:', error);
    res.status(500).json({ 
      error: 'Failed to update orphanage' 
    });
  }
});

// @route   PUT /api/orphanages/:id/verify
// @desc    Verify orphanage (admin only)
// @access  Private
router.put('/:id/verify', protect, authorize('admin'), [
  body('verificationStatus')
    .isIn(['verified', 'rejected'])
    .withMessage('Valid verification status is required'),
  body('verificationNotes')
    .optional()
    .isString()
    .withMessage('Verification notes must be a string')
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

    const { verificationStatus, verificationNotes } = req.body;

    const orphanage = await Orphanage.findById(req.params.id);
    if (!orphanage) {
      return res.status(404).json({ 
        error: 'Orphanage not found' 
      });
    }

    orphanage.verificationStatus = verificationStatus;
    orphanage.verificationNotes = verificationNotes;
    orphanage.verifiedBy = req.user._id;
    orphanage.verifiedAt = new Date();

    await orphanage.save();

    res.json({
      success: true,
      message: `Orphanage ${verificationStatus} successfully`,
      orphanage
    });

  } catch (error) {
    console.error('Verify orphanage error:', error);
    res.status(500).json({ 
      error: 'Failed to verify orphanage' 
    });
  }
});

// @route   GET /api/orphanages/stats/overview
// @desc    Get orphanage statistics (admin only)
// @access  Private
router.get('/stats/overview', protect, authorize('admin'), async (req, res) => {
  try {
    const stats = await Orphanage.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          verified: { $sum: { $cond: [{ $eq: ['$verificationStatus', 'verified'] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ['$verificationStatus', 'pending'] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ['$verificationStatus', 'rejected'] }, 1, 0] } },
          active: { $sum: { $cond: ['$isActive', 1, 0] } }
        }
      }
    ]);

    const cityStats = await Orphanage.aggregate([
      {
        $group: {
          _id: '$address.city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const stateStats = await Orphanage.aggregate([
      {
        $group: {
          _id: '$address.state',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        total: 0,
        verified: 0,
        pending: 0,
        rejected: 0,
        active: 0
      },
      cityStats,
      stateStats
    });

  } catch (error) {
    console.error('Get orphanage stats error:', error);
    res.status(500).json({ 
      error: 'Failed to get orphanage statistics' 
    });
  }
});

module.exports = router;
