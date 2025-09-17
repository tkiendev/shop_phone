const express = require('express');
const route = express.Router();

const dashbordController = require('../../controller/admin/dashbord.controlller.js');

route.get('/', dashbordController.index);

module.exports = route;
