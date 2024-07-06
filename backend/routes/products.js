const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Tüm ürünleri al
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni ürün oluştur
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
    salePrice: req.body.salePrice,
    category: req.body.category
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
