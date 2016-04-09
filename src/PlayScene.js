
var PlayScene = cc.Scene.extend({
    space:null,
    gameLayer:null,
    size: null,
    initPhysics:function() {
        this.space = new cp.Space();

        // this.space.gravity = cp.v(0, -350);

        // var wallBottom = new cp.SegmentShape(this.space.staticBody,
        //     cp.v(0, g_groundHeight),// start point
        //     cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
        //     0);// thickness of wall
        // this.space.addStaticShape(wallBottom);


    },
    onEnter:function () {
        this._super();
        this.initPhysics();

        this.size = cc.winSize;

        this.gameLayer = new cc.Layer();
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
        this.addChild(this.gameLayer);
        // this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function (event) {
                movementHandler.aim = {
                    x: event.getLocationX(),
                    y: event.getLocationY()
                };
            }
        }, this);

        this.scheduleUpdate();
    },
    update:function (dt) {
        // chipmunk step
        this.space.step(dt);

        var backgroundLayer = this.gameLayer.getChildByTag(TagOfLayer.background);
        var player = backgroundLayer.getPlayer();
        var playerPos = player.getPosition();
        var centeredPlayer = cc.pSub(cc.p(this.size.width/2, this.size.height/2), playerPos);
        // cc.log(playerPos);
        // cc.log("player:"+playerPos.x,+", "+playerPos.y);
        // cc.log(this.size);
        this.gameLayer.setPosition(centeredPlayer);

        movementHandler.updateOrientation(player);

        // var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
        // var eyeX = animationLayer.getEyeX();
        //
        // this.gameLayer.setPosition(cc.p(-eyeX,0));
    }
});

