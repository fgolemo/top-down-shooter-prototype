var BackgroundLayer = cc.Layer.extend({
    space:null,
    gameLayer:null,
    arena: null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    init:function () {
        this._super();

        var size = cc.winSize;

        // load arena sprite
        this.arena = new cc.Sprite(res.arena_png);
        this.arena.attr({x:size.width/2, y:size.height/2});
        // this.arena.setAnchorPoint(cc.p(-0.05,0.38));
        this.addChild(this.arena, 0);

        // set up game content layers, player & enemies
        this.gameLayer = new cc.Layer();
        this.gameLayer.addChild(new EnemyLayer(this.space), 20, TagOfLayer.enemies);
        this.gameLayer.addChild(new PlayerLayer(this.space), 30, TagOfLayer.player);
        this.addChild(this.gameLayer, 10);

        this.scheduleUpdate();
    },
    update: function(dt) {
        
    }
});
