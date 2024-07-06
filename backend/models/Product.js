const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    size: [String],
    color: [String],
    price: Number,
    discountPrice: Number,
    category: String
});

module.exports = mongoose.model('Product', productSchema);
