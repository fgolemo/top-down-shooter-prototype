
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
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
                xDiff = event._x - scope.player.x;
                yDiff = event._y - scope.player.y;
                angleRad = Math.atan(yDiff/xDiff);
                angleDeg = angleRad * 180 / Math.PI;
                if (xDiff > 0 && yDiff < 0){
                    angleDeg = -1 * angleDeg;
                } else if (xDiff < 0 && yDiff <= 0) {
                    angleDeg = 180 - angleDeg;
                } else if (xDiff < 0 && yDiff > 0) {
                    angleDeg = 180 - 1*angleDeg;
                } else if (xDiff >= 0&& yDiff >0) {
                    angleDeg = 360 - angleDeg
                }
                // console.log(xDiff, yDiff, angleDeg);
                scope.player.setRotation(angleDeg);
            }
        }, this);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

