const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt'); 
require('dotenv').config();

router.use(expressJWT({ 
    secret: process.env.SECRET_KEY 
}).unless({ 
    path: [
        { url: /\/api*/, methods: ['OPTIONS']  },
        { url: '/api/token', methods: ['POST']  },
        { url: '/favicon.ico'}
    ]
}));

router.options(/\/api*/, (req,res) => {
    res.status(204).send().end();
});

router.get("/api", (req,res,next) => {
    res.status(200).json({
        message:"Welcome to the Group project API! Please, make yourself at home :)",
        routes: [
            {
                resource_name: "",
                url: req.protocol+"://"+req.get('host')+"/api",
            },
        ]
    });
})

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