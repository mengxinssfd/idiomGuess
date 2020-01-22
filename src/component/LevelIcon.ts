class LevelIcon extends eui.Button implements eui.UIComponent {
    private promise: Promise<any>;
    private label_level: eui.Label;

    public constructor() {
        super();
        this.promise = new Promise((resolve => {
            this.addEventListener(eui.UIEvent.COMPLETE, resolve, this);
        }));
    }

    public get level(): number {
        return parseInt(this.label_level.text);
    }

    public set level(level) {
        this.promise.then(() => {
            this.label_level.text = String(level);
        });
    }
}
