const express = require('express');
const route = express.Router();

// controller
const homeController = require('../../controller/user/home.controller.js')

route.get('/', homeController.index);

module.exports = route