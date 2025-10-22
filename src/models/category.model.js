const mongoose = require('mongoose');

const categoryProductSchema = new mongoose.Schema({
    name: String,
    images: String,
    description: String,
    parentId: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const categoryProductModel = mongoose.model('category-products', categoryProductSchema);
module.exports = categoryProductModel;