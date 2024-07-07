const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Middleware to get product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

// Delete a product by ID
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search for a product by ID
router.get('/search', async (req, res) => {
  const { id } = req.query;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json([product]);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update product newPrice
router.post('/update-price', async (req, res) => {
  const { id, newPrice } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { newPrice: newPrice },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Price updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
