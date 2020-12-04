const express = require('express');
const app = express(); 
const serv = require('http').Server(app);
const env = require('dotenv').config();
const https = require('https');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(8080);

console.log('Server started on: ' + process.env.HOST + ":" + process.env.PORT);

let io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket){
    console.log('New Socket Connection');

    let serverDate = new Date();
    let serverTime = serverDate.getTime();

    socket.emit('server_welcome');

    function getJSON(url){
        https.get(String(url), (resp)=>{
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
                    
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                socket.emit('Data');
                return data;
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });       
    }

    socket.on('client_test', function(){
        let testResponse = 'https://api.nasa.gov/insight_weather/?api_key=' + process.env.KEY + '&feedtype=json&ver=1.0';
        let response = getJSON(testResponse);
        socket.emit('server_test_response', {
            res: response
        });
    });
});
