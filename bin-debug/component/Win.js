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
var Win = (function (_super) {
    __extends(Win, _super);
    function Win() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Win, "Instance", {
        get: function () {
            if (!Win.instance)
                Win.instance = new Win();
            return Win.instance;
        },
        enumerable: true,
        configurable: true
    });
    Win.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.r_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.hide();
        }, this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickNext, this);
    };
    Win.prototype.show = function (parent) {
        _super.prototype.show.call(this, parent);
        var question = LevelDataManager.Instance.currentQuestion;
        this.lb_idiom_desc.text = question.tip;
        this.lb_idiom_from.text = question.content;
    };
    Win.prototype.clickNext = function () {
        LevelDataManager.Instance.currentLevel += 1;
        this.parent.refresh();
        this.hide();
    };
    return Win;
}(DialogSup));
__reflect(Win.prototype, "Win", ["eui.UIComponent", "egret.DisplayObject"]);
