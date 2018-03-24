const express = require('express')
const routes = express.Router()

const chatresourcecontroller = require('../controllers/ctrl_chatresource')

routes.get('/', chatresourcecontroller.getAll)
routes.post('/', chatresourcecontroller.add)
routes.patch('/:id', chatresourcecontroller.update)
routes.delete('/:id', chatresourcecontroller.delete)

module.exports = routes;