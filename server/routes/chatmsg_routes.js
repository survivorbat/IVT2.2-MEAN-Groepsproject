const express = require('express')
const routes = express.Router()

const chatmessageRoutes = require('../controllers/ctrl_chatmessage')

routes.get('/', chatmessageRoutes.getAll)
//routes.post('/', chatmessageRoutes.add)
//routes.patch('/:id', chatmessageRoutes.update)
//routes.delete('/:id', chatmessageRoutes.delete)

module.exports = routes;