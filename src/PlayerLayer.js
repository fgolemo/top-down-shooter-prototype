var PlayerLayer = cc.Layer.extend({
    space:null,
    player: null,
    body: null,
    shape: null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    init:function () {
        this._super();

        this.player = new cc.PhysicsSprite(res.player1_png);
        var contentSize = this.player.getContentSize();
        // 2. init the runner physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //3. set the position of the runner
        this.body.p = cc.p(Math.random()*config.arenaSize.width, Math.random()*config.arenaSize.height);
        //4. apply impulse to the body
        // this.body.applyForce(cp.v(150, 0), cp.v(0, 0));//run speed
        // this.body.applyForce(cp.v(0, 20), cp.v(0, 0));//run speed
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width, contentSize.height);
        //7. add shape to space
        this.space.addShape(this.shape);
        //8. set body to the physic sprite
        this.player.setBody(this.body);

        this.addChild(this.player, 100);

        this.scheduleUpdate();
    },
    update: function(dt) {

    }
});
