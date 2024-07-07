const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Ürün sorgulama
router.get('/search', async (req, res) => {
  const { id } = req.query;
  try {
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json([]);
    }
    res.json([product]);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;


// Ürün güncelleme
router.post('/update-price', async (req, res) => {
    const { id, newPrice } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const product = await Product.findByIdAndUpdate(
            id,
            { price: newPrice },
            { new: true }
        );
        if (product) {
            res.json({ message: 'Price updated successfully', product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
