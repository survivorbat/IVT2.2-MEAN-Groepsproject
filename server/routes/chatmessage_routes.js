const express = require('express')
const routes = express.Router()

const chatMessageController = require('../controllers/ctrl_chatmessage')

routes.get('/', chatMessageController.getAll)
routes.get('/chatbox/:chatbox', chatMessageController.getByChatbox)
routes.post('/', chatMessageController.add)
routes.patch('/:id', chatMessageController.update)
routes.delete('/:id', chatMessageController.delete)

module.exports = routes;