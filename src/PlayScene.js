
var PlayScene = cc.Scene.extend({
    space:null,
    gameLayer:null,
    initPhysics:function() {
        this.space = new cp.Space();

        // this.space.gravity = cp.v(0, -350);

        // var wallBottom = new cp.SegmentShape(this.space.staticBody,
        //     cp.v(0, g_groundHeight),// start point
        //     cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
        //     0);// thickness of wall
        // this.space.addStaticShape(wallBottom);

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(false);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 10);

    },
    onEnter:function () {
        this._super();
        this.initPhysics();

        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        // this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        // this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        this.scheduleUpdate();

    },
    update:function (dt) {
        // chipmunk step
        this.space.step(dt);
        // var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
        // var eyeX = animationLayer.getEyeX();
        //
        // this.gameLayer.setPosition(cc.p(-eyeX,0));
    }
});

