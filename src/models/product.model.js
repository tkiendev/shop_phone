const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    productCode: String,
    description: String,
    price: Number,
    discountPercent: Number,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    position: Number,
    quantity: Number,
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;