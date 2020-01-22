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
var LevelIcon = (function (_super) {
    __extends(LevelIcon, _super);
    function LevelIcon() {
        var _this = _super.call(this) || this;
        _this.promise = new Promise((function (resolve) {
            _this.addEventListener(eui.UIEvent.COMPLETE, resolve, _this);
        }));
        return _this;
    }
    Object.defineProperty(LevelIcon.prototype, "level", {
        get: function () {
            return parseInt(this.label_level.text);
        },
        set: function (level) {
            var _this = this;
            this.promise.then(function () {
                _this.label_level.text = String(level);
            });
        },
        enumerable: true,
        configurable: true
    });
    return LevelIcon;
}(eui.Button));
__reflect(LevelIcon.prototype, "LevelIcon", ["eui.UIComponent", "egret.DisplayObject"]);
