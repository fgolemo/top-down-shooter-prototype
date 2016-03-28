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
    velocity: 500.0,
    aim: null,
    updatePosition: function (dt) {
        var trajectory = cc.p(0.0, 0.0);
        trajectory = cc.pAdd(trajectory, cc.pMult(Movments.up, this.moving.up));
        trajectory = cc.pAdd(trajectory, cc.pMult(Movments.down, this.moving.down));
        trajectory = cc.pAdd(trajectory, cc.pMult(Movments.right, this.moving.right));
        trajectory = cc.pAdd(trajectory, cc.pMult(Movments.left, this.moving.left));
        trajectory = cc.pMult(trajectory, dt * this.velocity);

        var newPos = cc.pAdd(this.player.getPosition(), trajectory);

        this.player.setPosition(newPos);
    },
    updateOrientation: function (dt) {
        xDiff = this.aim._x - this.player.x;
        yDiff = this.aim._y - this.player.y;
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
        this.addChild(this.player, 10);

        var scope = this;

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function (event) {
                // console.log(event._x, event._y);
                scope.aim = event;
            }
        }, this);

        var setMovement = function (keycode, up) {
            switch (keycode) {
                case 87:
                    scope.moving.up = up;
                    break;
                case 83:
                    scope.moving.down = up;
                    break;
                case 65:
                    scope.moving.left = up;
                    break;
                case 68:
                    scope.moving.right = up;
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

