const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// ID ile ürün arama
router.get('/search', async (req, res) => {
    const { id } = req.query;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const product = await Product.findById(id);
        if (product) {
            res.json([product]); // Ürünü bir dizi içinde döndür
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
