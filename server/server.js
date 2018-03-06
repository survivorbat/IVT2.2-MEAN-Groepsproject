const express = require('express');
const compression = require('compression')
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);

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

users = [];
connections = [];
io.on('connection', (socket) => {
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length)
	socket.on('disconnect', (data) => {
		users.splice(users.indexOf(socket.username, 1));
		updateUsernames();
		connections.splice(connections.indexOf(socket),1);
		console.log('Disconnected: %s sockets connected', connections.length);
	})
	socket.on('send message', (data) => {
		io.emit("new message", {msg: data, user: socket.username})
	})
	socket.on('join', (data, callback) => {
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	})

	function updateUsernames(){
		io.emit('get users', users);
	}
})

module.exports = app;