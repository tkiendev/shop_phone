const express = require('express');
const route = express.Router();

const productController = require('../../controller/admin/product.controller.js');

route.get('/', productController.index);

module.exports = route;