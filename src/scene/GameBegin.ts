class GameBegin extends Scene implements eui.UIComponent {
    private btn_begin: eui.Button;
    private btn_setting: eui.Button;

    public constructor() {
        super();
    }

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            GameSetting.Instance.show(this);
        }, this);
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SoundManager.Instance.playBgm();
            SceneManager.Instance.redirect(SceneManager.Instance.gameLevels);
        }, this);
    }
}
