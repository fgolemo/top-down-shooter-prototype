var Movments = {
    up: new cc.p(0, 1),
    down: new cc.p(0, -1),
    right: new cc.p(1, 0),
    left: new cc.p(-1, 0)
};

var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    moving: {
        up: 0.0,
        down: 0.0,
        left: 0.0,
        right: 0.0
    },
    player: null,
    arena: null,
    velocity: 500.0,
    aim: {x: 0, y: 0},
    totalPosition: cc.p(0,0),
    arenaSize: {width: 450, height: 500},
    updatePosition: function (dt) {
        var trajectory = cc.p(0.0, 0.0);
        trajectory = cc.pAdd(trajectory, cc.pMult(Movments.up, this.moving.up));
        trajectory = cc.pAdd(trajectory, cc.pMult(Movments.down, this.moving.down));
        trajectory = cc.pAdd(trajectory, cc.pMult(Movments.right, this.moving.right));
        trajectory = cc.pAdd(trajectory, cc.pMult(Movments.left, this.moving.left));
        trajectory = cc.pMult(trajectory, dt * this.velocity);

        // var newPos = cc.pAdd(this.player.getPosition(), trajectory);
        var newPos = cc.pAdd(this.totalPosition, trajectory);

        // this.player.setPosition(newPos);
        if (newPos.x < 0) {
            newPos.x = 0
        } else if (newPos.x > this.arenaSize.width) {
            newPos.x = this.arenaSize.width
        }
        if (newPos.y < 0) {
            newPos.y = 0
        } else if (newPos.y > this.arenaSize.height) {
            newPos.y = this.arenaSize.height
        }

        this.totalPosition = newPos;
        this.arena.setPosition(this.totalPosition);
    },
    updateOrientation: function (dt) {
        xDiff = this.aim.x - this.player.x;
        yDiff = this.aim.y - this.player.y;
        angleRad = Math.atan(yDiff / xDiff);
        angleDeg = angleRad * 180 / Math.PI;
        if (xDiff > 0 && yDiff < 0) {
            angleDeg = -1 * angleDeg;
        } else if (xDiff < 0 && yDiff <= 0) {
            angleDeg = 180 - angleDeg;
        } else if (xDiff < 0 && yDiff > 0) {
            angleDeg = 180 - 1 * angleDeg;
        } else if (xDiff >= 0 && yDiff > 0) {
            angleDeg = 360 - angleDeg
        }

        this.player.setRotation(angleDeg);
    },
    update: function (dt) {
        this.updatePosition(dt);
        this.updateOrientation(dt);
    },
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        this.player = new cc.Sprite(res.player1_png);
        this.player.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.player.setAnchorPoint(cc.p(0.25, 0.5));
        this.totalPosition = cc.p(Math.random()*this.arenaSize.width, Math.random()*this.arenaSize.height);
        this.addChild(this.player, 10);

        this.arena = new cc.Sprite(res.arena_png);
        this.arena.attr({x:50, y:50});
        this.arena.setAnchorPoint(cc.p(-0.05,0.38));
        this.addChild(this.arena, 5);

        var scope = this;

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function (event) {
                scope.aim = {
                    x: event.getLocationX(),
                    y: event.getLocationY()
                };
            }
        }, this);

        var setMovement = function (keycode, up) {
            switch (keycode) {
                case 87:
                    scope.moving.down = up;
                    break;
                case 83:
                    scope.moving.up = up;
                    break;
                case 65:
                    scope.moving.right = up;
                    break;
                case 68:
                    scope.moving.left = up;
                    break;
            }
        };

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keycode, event) {
                setMovement(keycode, 1);
            },
            onKeyReleased: function (keycode, event) {
                setMovement(keycode, 0);
            }

        }, this);

        this.scheduleUpdate();

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

