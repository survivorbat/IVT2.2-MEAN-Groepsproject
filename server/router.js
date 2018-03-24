const express = require('express');
const router = express.Router();

router.options(/\/api*/, (req,res) => {
    res.status(204).send().end();
});

const chatboxroutes = require('./routes/chatbox_routes');
router.use('/api/chatboxes',chatboxroutes);
const chatresources = require('./routes/chatresource_routes');
router.use('/api/chatresources',chatresources);

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