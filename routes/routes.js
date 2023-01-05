const express = require('express');
const route = express.Router();
const indexController = require('./../src/controllers/indexController');
const registerController = require('./../src/controllers/RegisterController');


route.get('/', indexController.index);
route.post('/home', indexController.home);

route.get('/recovery', indexController.recoveryIndex);
route.post('/recovery/code', indexController.recovery); 
route.get('/recovery/confirmation/:email', indexController.code)
route.post('/recovery/teste', indexController.codeConfirmation); 


route.get('/register', registerController.registerIndex);
route.post('/register/register', registerController.registerUser);


module.exports = route;