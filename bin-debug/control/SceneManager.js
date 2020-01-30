var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        _this.history = [];
        _this.gameBegin = new GameBegin();
        _this.gameLevels = GameLevels.Instance;
        _this.gamePlaying = GamePlaying.Instance;
        return _this;
    }
    Object.defineProperty(SceneManager, "Instance", {
        get: function () {
            if (!SceneManager.instance) {
                SceneManager.instance = new SceneManager();
            }
            return SceneManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.redirect = function (scene) {
        if (this.currentScene) {
            this.removeChild(this.currentScene);
        }
        this.switch(scene);
    };
    SceneManager.prototype.switch = function (scene) {
        this.history.push(this.currentScene);
        this.currentScene = scene;
        this.addChild(scene);
    };
    // 回退
    SceneManager.prototype.historyBack = function (isRefresh) {
        if (isRefresh === void 0) { isRefresh = true; }
        this.removeChild(this.currentScene);
        var back = this.history.pop();
        this.currentScene = back;
        this.addChild(back);
        if (isRefresh)
            back.refresh();
    };
    return SceneManager;
}(egret.DisplayObjectContainer));
__reflect(SceneManager.prototype, "SceneManager");
