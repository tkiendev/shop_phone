const express = require('express');
const route = express.Router();

const productController = require('../../controller/admin/product.controller.js');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const uploadCloudinary = require('../../helpers/upload-cloudinary.js');

route.get('/', productController.index);
route.patch('/change-status/:id/:status', productController.changeStatus);

route.delete('/delete/:id', productController.delete);
route.patch('/change-position/:id', productController.changePosition);

route.patch('/change-multi', productController.changeMulti);

route.get('/create', productController.create);
route.post('/create', upload.array('image', 10), uploadCloudinary, productController.activeCreate);

module.exports = route;