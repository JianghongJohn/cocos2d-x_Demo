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
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        replayPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        isGameOver: false,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        play: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        left: {
            default: null,
            type: cc.Node
        },
        right: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },
    //添加监听器
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 初始化计分
        this.score = 0;
        //添加监听器
        // 将 Game 组件的实例传入left
        this.left.getComponent('Left').game = this;
        // 将 Game 组件的实例传入right
        this.right.getComponent('Right').game = this;
        // 将 Game 组件的实例传入play
        this.play.getComponent('Play').game = this;
        // 将 Game 组件的实例传入play
        this.player.getComponent('Player').game = this;
        //是否开始的判断（限制不运行就开始左右平移）
        this.isRunning = false;
    },
    //生成星星
    spawnNewStar: function () {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());

        // 将 Game 组件的实例传入星星组件
        newStar.getComponent('star').game = this;

        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;

    },
    //设置星星位置
    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标(0-1)
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width / 2;
        //随机数（-1——1）
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    },
    //生成再来一次
    spawnNewReplay: function () {
        // 使用给定的模板在场景中生成一个新节点
        var newReplay = cc.instantiate(this.replayPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newReplay);
        // 为星星设置一个随机位置
        newReplay.setPosition(cc.p(0, -200));

        // 将 Game 组件的实例传入星星组件
        newReplay.getComponent('replay').game = this;

    },
    start() {

    },

    update(dt) {
        if (!this.isRunning) return;
        // 每帧更新计时器，超过限度还没有生成新的星星
        if (this.play.getComponent('Play').node.active == false) {
            // 就会调用游戏失败逻辑
            if (this.timer > this.starDuration) {
                if (this.isGameOver == false) {
                    this.gameOver();
                }

                return;
            }
            this.timer += dt;
        }

    },
    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
    replay: function () {
        cc.director.loadScene('game');
    },
    gameOver: function () {
        this.isGameOver = true;
        this.isRunning = false;
        this.player.getComponent('Player').isGameOver = true;
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        //生成再来一次
        this.spawnNewReplay();
    }
});