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
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        var _this = _super.call(this) || this;
        _this.promise = new Promise(function (resolve) {
            _this.addEventListener(eui.UIEvent.COMPLETE, resolve, _this);
        });
        return _this;
    }
    Word.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.label_word.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    Word.prototype.onClick = function () {
        console.log(this.word);
    };
    Object.defineProperty(Word.prototype, "word", {
        get: function () {
            var w = this.label_word;
            return w ? w.text : "";
        },
        set: function (word) {
            var _this = this;
            this.promise.then(function () {
                _this.label_word.text = word;
            });
        },
        enumerable: true,
        configurable: true
    });
    return Word;
}(eui.Component));
__reflect(Word.prototype, "Word", ["eui.UIComponent", "egret.DisplayObject"]);
