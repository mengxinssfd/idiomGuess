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
var Tips = (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Tips, "Instance", {
        get: function () {
            if (!Tips.instance)
                Tips.instance = new Tips();
            return Tips.instance;
        },
        enumerable: true,
        configurable: true
    });
    Tips.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.r_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, this);
    };
    Tips.prototype.show = function (parent, msg) {
        _super.prototype.show.call(this, parent);
        this.lb_content.text = msg;
    };
    return Tips;
}(DialogSup));
__reflect(Tips.prototype, "Tips", ["eui.UIComponent", "egret.DisplayObject"]);
