const express = require('express');
const route = express.Router();
const indexController = require('./../src/controllers/indexController');
const registerController = require('./../src/controllers/RegisterController');

route.get('/', indexController.index);


route.get('/register', registerController.registerIndex);
route.post('/register/register', registerController.registerUser);


module.exports = route;