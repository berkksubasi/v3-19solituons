const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    quantity: Number,
    sizes: [String],
});

const transferSchema = new mongoose.Schema({
    products: [productSchema],
    source: String,
    destination: String,
    status: { type: String, default: 'pending' },
});

const Transfer = mongoose.models.Transfer || mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
