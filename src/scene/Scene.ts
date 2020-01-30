class Scene extends eui.Component {

    constructor() {
        super();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    clickHandler() {
        SoundManager.Instance.playClick();
    }

    public refresh() {
    }
}
