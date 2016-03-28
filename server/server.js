var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var count = 0;

var players = {};

io.on('connection', function(socket){
    var playerID = 0;

    socket.on('echo', function(req){
        console.log("echotest");
        console.dir(req);
        socket.emit('echo', req);
    });

    socket.on('playerAdd', function (data) {
        data = JSON.parse(data);

        this.playerID = count;
        count += 1;

        console.log("player added: "+this.playerID);
        console.dir(data);


        players[this.playerID] = data;
        data.id = this.playerID;
        socket.broadcast.emit('playerJoined', data);
    });
    
    socket.on('playerUpdate', function (data) {
        data = JSON.parse(data);
        players[this.playerID] = data;
        data.id = this.playerID;
        socket.broadcast.emit('playerUpdate', data);
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
