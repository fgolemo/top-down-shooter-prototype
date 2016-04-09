var movementHandler = {
    moving: {
        up: false,
        down: false,
        left: false,
        right: false
    },
    setMovement: function(keycode, body, keyAction) {
        // cc.log("key pressed: "+keycode+", action: "+keyAction);
        var impulse = false;
        var impulseVal = cp.v(0, 0);
        switch (keycode) {
            case 87:
                if ((keyAction == 1 && !this.moving.up) || (keyAction == -1 && this.moving.up)) {
                    this.moving.up = (keyAction == 1);
                    impulse = true;
                    impulseVal = cp.v(0, keyAction * config.player.velocity);
                }
                break;
            case 83:
                if ((keyAction == 1 && !this.moving.down) || (keyAction == -1 && this.moving.down)) {
                    this.moving.down = (keyAction == 1);
                    impulse = true;
                    impulseVal = cp.v(0, -keyAction * config.player.velocity);
                }
                break;
            case 65:
                if ((keyAction == 1 && !this.moving.left) || (keyAction == -1 && this.moving.left)) {
                    this.moving.left = (keyAction == 1);
                    impulse = true;
                    impulseVal = cp.v(-keyAction * config.player.velocity, 0);
                }
                break;
            case 68:
                if ((keyAction == 1 && !this.moving.right) || (keyAction == -1 && this.moving.right)){
                    this.moving.right = (keyAction == 1);
                    impulse = true;
                    impulseVal = cp.v(keyAction * config.player.velocity, 0);
                }
                break;
        }
        if (impulse) {
            // cc.log(impulseVal);
            body.applyImpulse(impulseVal, cp.v(0, 0));
        }
    }
};