var PlayerLayer = cc.Layer.extend({
    space:null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    init:function () {
        this._super();

        
        this.scheduleUpdate();
    }
});
