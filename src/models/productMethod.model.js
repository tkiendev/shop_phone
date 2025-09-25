const mongoose = require('mongoose');

const productMethodSchema = new mongoose.Schema({
    os: String,
    cpu: String,
    cpuSpeed: String,
    gpu: String,
    ram: Number,
    storage: Number,
    availableStorage: Number,
    contacts: String,
    batteryCapacity: Number,
    batteryType: {
        type: String,
        default: 'lipo'
    },
    chargingSupport: Number,
    batteryTechnology: Number,
    security: String,
    waterResistance: String,
    recording: String,
    music: String,
    mobileNetwork: String,
    sim: Number,
    wifi: String,
    gps: String,
    bluetooth: String,
    port: {
        type: String,
        default: 'Type-C'
    },
    headphoneJack: {
        type: String,
        default: 'Type-C'
    },
    otherConnections: {
        type: String,
        default: 'Nguyên khối'
    },
    design: String,
    material: String,
    dimensions: String,
    launchDate: String,
    brand: String
}, {
    timestamps: true
});

const productMethodModel = mongoose.model('product-methods', productMethodSchema);
module.exports = productMethodModel;