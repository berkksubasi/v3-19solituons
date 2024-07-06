const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ürün modelini içe aktar

// Tüm ürünleri getir
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ürünleri isme göre getir
router.get('/search', async (req, res) => {
    const { code } = req.query;
    try {
        const products = await Product.find({ name: code });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
