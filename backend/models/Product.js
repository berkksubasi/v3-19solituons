const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    required: false
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
