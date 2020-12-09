const express = require('express');
const app = express(); 
const serv = require('http').Server(app);
const env = require('dotenv').config();
const https = require('https');
const fetch = require('node-fetch');
const bluebird = require('bluebird');

fetch.Promise = bluebird;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(8080);

console.log('Server started on: ' + process.env.HOST + ":" + process.env.PORT);

let io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket){
    console.log('New Socket Connection');
	socket.emit('server_welcome');

	let testJSON = 'https://api.nasa.gov/insight_weather/?api_key=' + process.env.KEY + '&feedtype=json&ver=1.0';
	let obj;

	let json = fetch(testJSON)
      .then(res => res.json())
      .then(data => obj = data)
      //.then(() => console.log(obj))
	  return obj

	console.log(json);
    
	socket.emit('server_send_data', {
    	//res: response
    });
});
