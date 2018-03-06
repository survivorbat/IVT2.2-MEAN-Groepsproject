const express = require('express');
const compression = require('compression')
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware */
app.use(compression());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const router = require('./router');
app.use(router);

server.listen(process.env.PORT || 5000, () => { 
	if(process.env.PORT !== undefined){
		console.log('Server gestart op poort '+process.env.PORT); 
	} else {
		console.log('Server gestart op poort 5000'); 
	}
});

module.exports = app;