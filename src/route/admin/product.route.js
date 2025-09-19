const express = require('express');
const route = express.Router();

const productController = require('../../controller/admin/product.controller.js');

route.get('/', productController.index);
route.patch('/change-status/:id/:status', productController.changeStatus);

route.delete('/delete/:id', productController.delete);

module.exports = route;