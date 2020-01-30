import SoundChannel = egret.SoundChannel;

class SoundManager {
    private static instance: SoundManager;
    private switch: { bgm: boolean, sound: boolean };
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

        const swc = {bgm: true, sound: true};
        const bgm = egret.localStorage.getItem("switchBgm");
        const sound = egret.localStorage.getItem("switchSound");
        swc.bgm = bgm !== "off";
        swc.sound = sound !== "off";
        this.switch = swc;
    }

    public static get Instance(): SoundManager {
        if (!SoundManager.instance)
            SoundManager.instance = new SoundManager();
        return SoundManager.instance;
    }

    public playBgm() {
        if (!this.switchSound) return;
        if (!this.switchBgm) return;
        if (this.bgmChannel) return;
        this.bgmChannel = this.sound.bgm.play();
    }

    public stopBgm() {
        if (!this.bgmChannel) return;
        this.bgmChannel.stop();
        this.bgmChannel = null;
    }

    public playClick() {
        if (!this.switchSound) return;
        this.sound.click.play(0, 1);
    }

    public playWord() {
        if (!this.switchSound) return;
        this.sound.word.play(0, 1);
    }

    public playRight() {
        if (!this.switchSound) return;
        this.sound.right.play(0, 1);
    }

    public playWrong() {
        if (!this.switchSound) return;
        this.sound.wrong.play(0, 1);
    }

    public set switchBgm(status: boolean) {
        this.switch.bgm = status;
        egret.localStorage.setItem("switchBgm", status ? "on" : "off");
        if (!status) {
            this.stopBgm();
        } else {
            if (this.switchSound) {
                this.playBgm();
            }
        }
    }

    public get switchBgm(): boolean {
        return this.switch.bgm;
    }

    public set switchSound(status: boolean) {
        this.switch.sound = status;
        egret.localStorage.setItem("switchSound", status ? "on" : "off");
        if (!status) {
            this.stopBgm();
        } else {
            if (this.switchBgm) {
                this.playBgm();
            }
        }
    }

    public get switchSound() {
        return this.switch.sound;
    }
}
