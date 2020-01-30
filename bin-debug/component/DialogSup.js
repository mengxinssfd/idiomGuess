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
var DialogSup = (function (_super) {
    __extends(DialogSup, _super);
    function DialogSup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogSup.prototype.show = function (parent) {
        var other = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            other[_i - 1] = arguments[_i];
        }
        parent.addChild(this);
    };
    DialogSup.prototype.hide = function () {
        this.parent.removeChild(this);
    };
    return DialogSup;
}(eui.Component));
__reflect(DialogSup.prototype, "DialogSup");
