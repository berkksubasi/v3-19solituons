const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Import Product model

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get product by id
router.get('/search', async (req, res) => {
    const { id } = req.query;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const product = await Product.findById(mongoose.Types.ObjectId(id));
        if (product) {
            res.json([product]); // Return the product in an array
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
