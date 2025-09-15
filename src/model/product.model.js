const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    productCode: String,
    description: String,
    price: Number,
    discountPercent: Number
});

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;