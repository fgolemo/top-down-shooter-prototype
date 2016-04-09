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

        var scope = this;
        
        this.player = new cc.PhysicsSprite(res.player1_png);
        var contentSize = this.player.getContentSize();
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p(Math.random()*config.arenaSize.width, Math.random()*config.arenaSize.height);
        
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width, contentSize.height);
        this.space.addShape(this.shape);
        this.player.setBody(this.body);

        this.addChild(this.player, 10);

        this.player.setRotation(45);
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keycode, event) {
                movementHandler.setMovement(keycode, scope.body, config.keys.pressed);
            },
            onKeyReleased: function (keycode, event) {
                movementHandler.setMovement(keycode, scope.body, config.keys.released);
            }
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function (event) {
                movementHandler.aim = {
                    x: event.getLocationX(),
                    y: event.getLocationY()
                };
            }
        }, this);

        helpers.addDebugNode(this);

        this.scheduleUpdate();
    },
    update: function(dt) {
        movementHandler.updateOrientation(this);
    }
});
