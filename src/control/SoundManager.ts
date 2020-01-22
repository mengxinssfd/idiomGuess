import SoundChannel = egret.SoundChannel;

class SoundManager {
    private static instance: SoundManager;
    private sound: {
        click: egret.Sound; // 点击声音
        word: egret.Sound;  // 点击字块的声音
        right: egret.Sound; // 胜利的声音
        wrong: egret.Sound;  // 失败的声音
        bgm: egret.Sound; // 背景音乐
    };
    private bgmChannel: SoundChannel;

    private constructor() {
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

    public static get Instance(): SoundManager {
        if (!SoundManager.instance)
            SoundManager.instance = new SoundManager();
        return SoundManager.instance;
    }

    public playBgm() {
        if (this.bgmChannel) return;
        this.bgmChannel = this.sound.bgm.play();
    }

    public stopBgm() {
        if (!this.bgmChannel) return;
        this.bgmChannel.stop();
        this.bgmChannel = null;
    }

    public playClick() {
        this.sound.click.play(0, 1);
    }
}
