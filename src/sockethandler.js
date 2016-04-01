/** @expose */
window.io;

var SocketIO = SocketIO || window.io;

var SocketHandler = function (parentScope, playerHandler) {
    this.socketClient = null;

    var scope = this;

    this.init = function () {
        this.socketClient = SocketIO.connect("ws://localhost:3000");

        this.socketClient.on("connect", function () {
            var msg = "Connected!";
            parentScope._sioClientStatus.setString(msg);
            cc.log(msg);
            var data = {
                position: {
                    x: parentScope.totalPosition.x,
                    y: parentScope.totalPosition.y
                }
            };
            scope.socketClient.emit('playerAdd', JSON.stringify(data));
        });

        this.socketClient.on("disconnect", function (data) {
            var msg = "disconnected";
            cc.log(msg);
            parentScope._sioClientStatus.setString(msg);
            cc.log(data);
        });
    };

    this.setupPlayerListener = function () {
        if (this.socketClient != null) {
            this.socketClient.on("playerJoined", function (data) {
                if ((typeof data) == "string") {
                    data = JSON.parse(data);
                }
                playerHandler.addPlayer(data);
            });
            this.socketClient.on("playerLeft", function (data) {
                if ((typeof data) == "string") {
                    data = JSON.parse(data);
                }
                playerHandler.removePlayer(data);
            });
            this.socketClient.on("playerUpdate", function (data) {
                if ((typeof data) == "string") {
                    data = JSON.parse(data);
                }
                playerHandler.updatePlayer(data);
            });
            this.socketClient.on('playerConnect', function(data) {
                if ((typeof data) == "string") {
                    data = JSON.parse(data);
                }
                playerHandler.initPlayers(data);
            });
        }
    };

    this.updatePos = function (newPos, newDeg) {
        var data = {
            position: {
                x: newPos.x,
                y: newPos.y
            },
            rotation: newDeg
        };
        this.socketClient.emit('playerUpdate', JSON.stringify(data));
    };

    // this._sioClient.emit("echo",{a:9,b:8});


    this.init();
    this.setupPlayerListener();
};