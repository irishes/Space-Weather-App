let socket = io();

socket.on('server_welcome', function(){
	console.log('Welcome to Mars Weather App');
});

socket.on('server-test');

// Handles Making Requests //
function makeRequest(type){
	switch(type){
    	case("TEST"):
    		socket.emit('client_test');
	}
}
