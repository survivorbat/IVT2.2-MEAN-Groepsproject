const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt'); 
require('dotenv').config();

router.options(/\/api*/, (req,res) => {
    res.status(204).send().end();
});

const authroutes = require('./routes/auth_routes');
router.use('/api',authroutes);

router.use((error,req,res,next) => {
    if(error.name==="ValidationError"){
        error.status=422;
    } else if(error.name==="CastError"){
        error.status=422
    }
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