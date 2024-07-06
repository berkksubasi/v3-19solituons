// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: [String], required: true },
  color: { type: [String], required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  category: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
