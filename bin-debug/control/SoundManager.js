var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this.sound = {
            click: RES.getRes("buttonclick_mp3"),
            bgm: RES.getRes("Music_mp3"),
            right: RES.getRes("right_mp3"),
            wrong: RES.getRes("wrong_mp3"),
            word: RES.getRes("type_word_mp3"),
        };
        console.log(RES.getRes("buttonclick_mp3"));
        // this.sound.click.load("resource/assets/sound/buttonclick.mp3");
        // this.sound.bgm.load("resource/assets/sound/Music.mp3");
        // this.sound.right.load("resource/assets/sound/right.mp3");
        // this.sound.wrong.load("resource/assets/sound/wrong.mp3");
        // this.sound.word.load("resource/assets/sound/type_word.mp3");
        var swc = { bgm: true, sound: true };
        var bgm = egret.localStorage.getItem("switchBgm");
        var sound = egret.localStorage.getItem("switchSound");
        swc.bgm = bgm !== "off";
        swc.sound = sound !== "off";
        this.switch = swc;
    }
    Object.defineProperty(SoundManager, "Instance", {
        get: function () {
            if (!SoundManager.instance)
                SoundManager.instance = new SoundManager();
            return SoundManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.playBgm = function () {
        if (!this.switchSound)
            return;
        if (!this.switchBgm)
            return;
        if (this.bgmChannel)
            return;
        this.bgmChannel = this.sound.bgm.play();
    };
    SoundManager.prototype.stopBgm = function () {
        if (!this.bgmChannel)
            return;
        this.bgmChannel.stop();
        this.bgmChannel = null;
    };
    SoundManager.prototype.playClick = function () {
        if (!this.switchSound)
            return;
        this.sound.click.play(0, 1);
    };
    SoundManager.prototype.playWord = function () {
        if (!this.switchSound)
            return;
        this.sound.word.play(0, 1);
    };
    SoundManager.prototype.playRight = function () {
        if (!this.switchSound)
            return;
        this.sound.right.play(0, 1);
    };
    SoundManager.prototype.playWrong = function () {
        if (!this.switchSound)
            return;
        this.sound.wrong.play(0, 1);
    };
    Object.defineProperty(SoundManager.prototype, "switchBgm", {
        get: function () {
            return this.switch.bgm;
        },
        set: function (status) {
            this.switch.bgm = status;
            egret.localStorage.setItem("switchBgm", status ? "on" : "off");
            if (!status) {
                this.stopBgm();
            }
            else {
                if (this.switchSound) {
                    this.playBgm();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "switchSound", {
        get: function () {
            return this.switch.sound;
        },
        set: function (status) {
            this.switch.sound = status;
            egret.localStorage.setItem("switchSound", status ? "on" : "off");
            if (!status) {
                this.stopBgm();
            }
            else {
                if (this.switchBgm) {
                    this.playBgm();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
