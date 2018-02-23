// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    setInputControl: function () {
        //获取Player对象
        var sprite = this;  
        var player = this.game.player.getComponent('Player');
        //触摸事件监听
            sprite.node.on(cc.Node.EventType.TOUCH_START, function(e){  
                // console.log( "cc.Node.EventType.TOUCH_START" );  
                player.accLeft = false;
                player.accRight = true;
                // return true;  
            }.bind(this), this );  
            sprite.node.on(cc.Node.EventType.TOUCH_MOVE, function(e){  
                // console.log( "cc.Node.EventType.TOUCH_MOVE" );  
                
            }.bind(this), this );  
            sprite.node.on(cc.Node.EventType.TOUCH_END, function(e){  
                // console.log( "cc.Node.EventType.TOUCH_END" );  
                player.accRight = false;
            }.bind(this), this );  
            sprite.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e){  
                // console.log( "cc.Node.EventType.TOUCH_CANCEL" ); 
                player.accRight = false;
            }.bind(this), this);  
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setInputControl();
    },

    start () {

    },

    // update (dt) {},
});
