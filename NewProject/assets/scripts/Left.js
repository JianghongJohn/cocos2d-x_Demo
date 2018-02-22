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

    },
    setInputControl: function () {
        //获取Player对象


        var sprite = this;  

            sprite.node.on(cc.Node.EventType.TOUCH_START, function(e){  
                console.log( "cc.Node.EventType.TOUCH_START" );  
                this.node.emit('say-hello', {
                    msg: 'Hello, this is Cocos Creator',
                  });              
                // return true;  
            }.bind(this), this );  
            sprite.node.on(cc.Node.EventType.TOUCH_MOVE, function(e){  
                console.log( "cc.Node.EventType.TOUCH_MOVE" );  
                
            }.bind(this), this );  
            sprite.node.on(cc.Node.EventType.TOUCH_END, function(e){  
                console.log( "cc.Node.EventType.TOUCH_END" );  
                
            }.bind(this), this );  
            sprite.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e){  
                console.log( "cc.Node.EventType.TOUCH_CANCEL" ); 
            }.bind(this), this);  
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setInputControl();
    },

    start() {

    },

    // update (dt) {},
});
