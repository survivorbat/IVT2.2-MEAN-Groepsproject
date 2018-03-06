const express = require('express')
const routes = express.Router()

const chatboxcontroller = require('../controllers/ctrl_chatbox')

routes.get('/', chatboxcontroller.getAll)
routes.get('/:id', chatboxcontroller.getById)
routes.post('/', chatboxcontroller.post)
routes.patch('/:id', chatboxcontroller.update)
routes.delete('/:id', chatboxcontroller.delete)

module.exports = routes;