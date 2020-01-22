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
        this.sound.click.play(0, 1);
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
