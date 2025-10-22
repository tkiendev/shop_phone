const express = require('express');
const route = express.Router();

const categoryController = require('../../controller/admin/category.controller');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const uploadCloudinary = require('../../helpers/upload-cloudinary.js');


route.get('/', categoryController.index);

route.get('/create', categoryController.create);
route.patch('/create', upload.array('image', 10), uploadCloudinary, categoryController.actionCreate);

module.exports = route;