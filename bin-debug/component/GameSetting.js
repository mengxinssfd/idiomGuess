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
// class GameSetting extends eui.Component implements eui.UIComponent {
var GameSetting = (function (_super) {
    __extends(GameSetting, _super);
    function GameSetting() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GameSetting, "Instance", {
        get: function () {
            if (!GameSetting.instance)
                GameSetting.instance = new GameSetting();
            return GameSetting.instance;
        },
        enumerable: true,
        configurable: true
    });
    GameSetting.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.setStatus();
        this.img_sound_disabled.touchEnabled = false;
        this.img_music_disabled.touchEnabled = false;
        this.g_left.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.switchBgm = !SoundManager.Instance.switchBgm;
            _this.setStatus();
        }, this);
        this.g_right.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.Instance.switchSound = !SoundManager.Instance.switchSound;
            _this.setStatus();
        }, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, this);
    };
    GameSetting.prototype.setStatus = function () {
        var switchBgm = SoundManager.Instance.switchBgm;
        var switchSound = SoundManager.Instance.switchSound;
        this.btn_music.enabled = switchBgm;
        this.img_music_disabled.visible = !switchBgm;
        this.btn_sound.enabled = switchSound;
        this.img_sound_disabled.visible = !switchSound;
    };
    return GameSetting;
}(DialogSup));
__reflect(GameSetting.prototype, "GameSetting", ["eui.UIComponent", "egret.DisplayObject"]);
