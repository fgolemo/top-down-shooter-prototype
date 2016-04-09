
var Movments = {
    up: new cc.p(0, 1),
    down: new cc.p(0, -1),
    right: new cc.p(1, 0),
    left: new cc.p(-1, 0)
};

var HelloWorldLayer = cc.Layer.extend({
    _sioClientStatus: null,
    sprite: null,
    moving: {
        up: false,
        down: false,
        left: false,
        right: false
    },
    player: null,
    arena: null,
    velocity: 400.0,
    aim: {x: 0, y: 0},
    totalPosition: cc.p(0,0),
    arenaSize: {width: 450, height: 500},
    arenaMax: null,
    sockHandler: null,
    playerHandler: null,
    lastPos: {x:0,y:0},
    space: null,
    updatePosition: function (dt) {
        this.arena.setPosition(cc.pSub(this.arenaMax, this.body.p));
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
            angleDeg = 180 - angleDeg;
        } else if (xDiff >= 0 && yDiff > 0) {
            angleDeg = 360 - angleDeg
        }

        angleDeg -= 13; // correcting for sprite orientation
        if (angleDeg < 0) {
            angleDeg+= 360;
        }
        this.angleDeg = angleDeg;
        this.player.setRotation(this.angleDeg);
    },
    update: function (dt) {
        // this.updatePosition(dt);
        // this.updateOrientation(dt);
        // if (this.totalPosition.x != this.lastPos.x || this.totalPosition.y != this.lastPos.y || this.angleDeg != this.lastDeg) {
        //     this.sockHandler.updatePos(this.totalPosition, this.angleDeg);
        //     this.lastPos = {
        //         x: this.totalPosition.x,
        //         y: this.totalPosition.y
        //     };
        //     this.lastDeg = this.angleDeg;
        // }
        this.sockHandler.updateCycle(dt);
        this.space.step(dt);
    },
    initPhysics:function() {
        //1. new space object
        this.space = new cp.Space();
        //2. setup the  Gravity
        // this.space.gravity = cp.v(0, -350);

        //Add the Debug Layer:
        var debugNode = new cc.PhysicsDebugNode(this.space);
        debugNode.visible = true;
        this.addChild(debugNode);


        // 3. set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, 0),// start point
            cp.v(this.arenaSize.width, 0),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);
    },
    getEyeX: function () {
        var pos = this.player.getPosition();
        cc.log("getEye:" +pos.x+", "+pos.y);
        return pos;
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
        this.arenaMax = cc.p(this.arenaSize.width, this.arenaSize.height);

        this.initPhysics();

        // /////////////////////////////
        // // 3. add your codes below...
        // // add a label shows "Hello World"
        // // create and initialize a label
        // var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // // position the label on the center of the screen
        // helloLabel.x = size.width / 2;
        // helloLabel.y = size.height / 2 + 200;
        // // add the label as a child to this layer
        // this.addChild(helloLabel, 5);
        //
        // // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png);
        // this.sprite.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // this.addChild(this.sprite, 0);

        //1. create PhysicsSprite with a sprite frame name
        this.player = new cc.PhysicsSprite(res.player1_png);
        var contentSize = this.player.getContentSize();
        // 2. init the runner physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //3. set the position of the runner
        this.body.p = cc.p(Math.random()*this.arenaSize.width, Math.random()*this.arenaSize.height);
        //4. apply impulse to the body
        // this.body.applyForce(cp.v(150, 0), cp.v(0, 0));//run speed
        // this.body.applyForce(cp.v(0, 20), cp.v(0, 0));//run speed
        // this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width, contentSize.height);
        //7. add shape to space
        this.space.addShape(this.shape);
        //8. set body to the physic sprite
        this.player.setBody(this.body);


        // this.player = new cc.Sprite(res.player1_png);
        // this.player.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // this.player.setAnchorPoint(cc.p(0.25, 0.5));
        // this.totalPosition =
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
            var impulse = false;
            switch (keycode) {
                case 87:
                    if (up == 1 && !scope.moving.up) {
                        impulse = true;
                        scope.moving.up = true;
                    } else if (up == -1 && scope.moving.up) {
                        impulse = true;
                        scope.moving.up = false;
                    }
                    if (impulse) {
                        scope.body.applyImpulse(cp.v(0, up * scope.velocity), cp.v(0, 0));
                    }
                    break;
                case 83:
                    if (up == 1 && !scope.moving.down) {
                        impulse = true;
                        scope.moving.down = true;
                    } else if (up == -1 && scope.moving.down) {
                        impulse = true;
                        scope.moving.down = false;
                    }
                    if (impulse) {
                        scope.body.applyImpulse(cp.v(0, -up * scope.velocity), cp.v(0, 0));
                    }
                    break;
                case 65:
                    if (up == 1 && !scope.moving.left) {
                        impulse = true;
                        scope.moving.left = true;
                    } else if (up == -1 && scope.moving.left) {
                        impulse = true;
                        scope.moving.left = false;
                    }
                    if (impulse) {
                        scope.body.applyImpulse(cp.v(-up * scope.velocity, 0), cp.v(0, 0));
                    }
                    break;
                case 68:
                    if (up == 1 && !scope.moving.right) {
                        impulse = true;
                        scope.moving.right = true;
                    } else if (up == -1 && scope.moving.right) {
                        impulse = true;
                        scope.moving.right = false;
                    }
                    if (impulse) {
                        scope.body.applyImpulse(cp.v(up * scope.velocity, 0), cp.v(0, 0));
                    }
                    break;
            }
        };

        var specialKeys = [49,50,51,52];

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keycode, event) {
                setMovement(keycode, 1);
            },
            onKeyReleased: function (keycode, event) {
                if (specialKeys.indexOf(keycode) > -1) {
                    // switch(keycode) {
                    //     case 49: //1
                    //         socketConnect();
                    //         break;
                    //     case 50: //2
                    //         socketSend();
                    //         break;
                    //     case 51: //3
                    //         socketDisconnect();
                    //         break;

                } else {
                    // setMovement(keycode, 0);
                    setMovement(keycode, -1);
                }
            }

        }, this);


        this._sioClientStatus = new cc.LabelTTF("Not connected...", "Arial", 14);
        this._sioClientStatus.setAnchorPoint(cc.p(0, 0));
        this._sioClientStatus.setPosition(cc.p(0,size.height * .25));
        this.addChild(this._sioClientStatus);

        this.playerHandler = new PlayerHandler(scope);
        this.sockHandler = new SocketHandler(scope, this.playerHandler);
        
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

