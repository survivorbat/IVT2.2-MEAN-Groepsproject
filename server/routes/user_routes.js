const express = require('express')
const routes = express.Router()

const usercontroller = require('../controllers/ctrl_user')

routes.get('/', usercontroller.getAll)
routes.post('/', usercontroller.post)
routes.patch('/:id', usercontroller.update)
routes.delete('/:id', usercontroller.delete)

module.exports = routes;