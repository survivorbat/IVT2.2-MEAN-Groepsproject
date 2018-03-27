const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt')
require('dotenv').config()
router.options(/\/api*/, (req,res) => {
    res.status(204).send().end();
});

router.use(expressJWT({ 
    secret: process.env.SECRET_KEY 
}).unless({ 
    path: [
        { url: /\/api*/, methods: ['OPTIONS']  },
        { url: '/api', methods: ['GET']  },
        { url: '/api/token', methods: ['POST']  },
        { url: /\/users*/, methods: ['POST']  },
        { url: '/favicon.ico'}
    ]
}))
const authroute = require('./controllers/ctrl_authentication')
router.post('/api/token',authroute.checkAuthentication)
const chatboxroutes = require('./routes/chatbox_routes');
router.use('/api/chatboxes',chatboxroutes);
const chatresources = require('./routes/chatresource_routes');
router.use('/api/chatresources',chatresources);
const userroutes = require('./routes/user_routes');
router.use('/api/users', userroutes)

const chatmessageRoutes = require('./routes/chatmsg_routes');
router.use('/api/chatmessage', chatmessageRoutes);

router.use((error,req,res,next) => {
	res.status(error.status || 500).send({
        message: error.message,
        code: error.code,
        name: error.name,
        status: error.status
	}).end();
});

router.get('*', (req, res) => {
	res.status(404).send({
		message: '404 not found' //To let the caller know his request doesn't have an endpoint
	}).end();
})

module.exports = router;