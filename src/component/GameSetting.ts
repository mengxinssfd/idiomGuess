// class GameSetting extends eui.Component implements eui.UIComponent {
class GameSetting extends DialogSup implements eui.UIComponent {
    private g_left: eui.Group;
    private g_right: eui.Group;
    private btn_music: eui.Button;
    private btn_sound: eui.Button;
    private btn_confirm: eui.Button;
    private img_music_disabled: eui.Image;
    private img_sound_disabled: eui.Image;
    private r_mask: eui.Rect;
    private static instance: GameSetting;

    private constructor() {
        super();
    }

    public static get Instance(): GameSetting {
        if (!GameSetting.instance) GameSetting.instance = new GameSetting();
        return GameSetting.instance;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.setStatus();
        this.img_sound_disabled.touchEnabled = false;
        this.img_music_disabled.touchEnabled = false;

        this.g_left.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.switchBgm = !SoundManager.Instance.switchBgm;
            this.setStatus();
        }, this);
        this.g_right.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.switchSound = !SoundManager.Instance.switchSound;
            this.setStatus();
        }, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.hide();
        }, this);
    }

    private setStatus() {
        const switchBgm = SoundManager.Instance.switchBgm;
        const switchSound = SoundManager.Instance.switchSound;
        this.btn_music.enabled = switchBgm;
        this.img_music_disabled.visible = !switchBgm;
        this.btn_sound.enabled = switchSound;
        this.img_sound_disabled.visible = !switchSound;
    }
}