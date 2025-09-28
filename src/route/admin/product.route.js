const express = require('express');
const route = express.Router();

const productController = require('../../controller/admin/product.controller.js');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const uploadCloudinary = require('../../helpers/upload-cloudinary.js');

route.get('/', productController.index);

route.get('/recycle-bin', productController.recycleBin);
route.patch('/restore/:id', productController.restore);

route.patch('/change-status/:id/:status', productController.changeStatus);

route.delete('/delete/:id', productController.delete);
route.patch('/change-position/:id', productController.changePosition);

route.patch('/change-multi', productController.changeMulti);

route.get('/create', productController.create);
route.post('/create', upload.array('image', 10), uploadCloudinary, productController.activeCreate);

route.get('/detail/:id', productController.detail);

route.get('/edit/:id', productController.edit);
route.patch('/edit/:id', upload.array('image', 10), uploadCloudinary, productController.actionEdit);




module.exports = route;