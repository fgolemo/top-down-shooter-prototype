var BackgroundLayer = cc.Layer.extend({
    space:null,
    gameLayer:null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    init:function () {
        this._super();
        this.gameLayer = new cc.Layer();

        this.gameLayer.addChild(new PlayerLayer(this.space), 0, TagOfLayer.player);
        this.gameLayer.addChild(new EnemyLayer(this.space), 0, TagOfLayer.enemies);

        this.scheduleUpdate();
    }
});
