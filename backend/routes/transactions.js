const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'receipt-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @route   GET /api/transactions
// @desc    Get all transactions for logged in user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/transactions/:id
// @desc    Get single transaction by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, amount, type, date } = req.body;

    // Validation
    if (!title || !amount || !type) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const newTransaction = new Transaction({
      user: req.user.id,
      title,
      amount,
      type,
      image: req.file ? req.file.filename : null,
      date: date || Date.now()
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, amount, type, date } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update fields
    if (title) transaction.title = title;
    if (amount) transaction.amount = amount;
    if (type) transaction.type = type;
    if (date) transaction.date = date;

    // If new image is uploaded, delete old image and update
    if (req.file) {
      // Delete old image if exists
      if (transaction.image) {
        const oldImagePath = path.join(__dirname, '../uploads', transaction.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      transaction.image = req.file.filename;
    }

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete image if exists
    if (transaction.image) {
      const imagePath = path.join(__dirname, '../uploads', transaction.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
