const express = require('express');
const routes = express.Router();

const authcontroller = require('../controllers/ctrl_authentication');

routes.post('/token', authcontroller.checkAuthentication);

module.exports = routes;