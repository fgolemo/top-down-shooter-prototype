var PlayerHandler = function (parentScope) {
    var scope = this;
    this.players = {};
    this.playerIDs = [];
    this.addPlayer = function (data) {
        cc.log("new player joining");
        cc.log(data);
        this.playerIDs.push(data.id);
        this.players[data.id] = {};
        this.updatePlayerData(data);

        this.players[data.id].player = new cc.Sprite(res.player1_png);
        this.players[data.id].player.attr({
            x: data.position.x,
            y: data.position.y
        });
        this.players[data.id].player.setAnchorPoint(cc.p(0.25, 0.5));
        parentScope.addChild(this.players[data.id].player, 10);
    };
    this.updatePlayerData = function (data) {
        this.players[data.id].position = data.position;
        this.players[data.id].rotation = data.rotation;
    };
    this.updatePlayer = function (data) {
        this.updatePlayerData(data);
        this.players[data.id].player.setPosition(cc.p(
            this.players[data.id].position.x,
            this.players[data.id].position.y
        ));
        this.players[data.id].player.setRotation(this.players[data.id].rotation);

    };
};