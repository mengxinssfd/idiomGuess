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
var GameBegin = (function (_super) {
    __extends(GameBegin, _super);
    function GameBegin() {
        return _super.call(this) || this;
    }
    GameBegin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameBegin.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameSetting.Instance.show(_this);
        }, this);
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.playBgm();
            SceneManager.Instance.redirect(SceneManager.Instance.gameLevels);
        }, this);
    };
    return GameBegin;
}(Scene));
__reflect(GameBegin.prototype, "GameBegin", ["eui.UIComponent", "egret.DisplayObject"]);
