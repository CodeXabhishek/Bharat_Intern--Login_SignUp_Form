const express = require('express');
const routes = express.Router();
const viewsController = require('../controllers/viewsController');
const authenController = require('../controllers/authenController');
routes.get('/', viewsController.getLoginForm);
routes.post('/login', authenController.getLogin);
routes.post('/register', authenController.signUp);
module.exports = routes;
