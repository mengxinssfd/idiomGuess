class Word extends eui.Component implements eui.UIComponent {
    private label_word: eui.Label;
    private promise: Promise<any>;

    public constructor() {
        super();
        this.promise = new Promise(resolve => {
            this.addEventListener(eui.UIEvent.COMPLETE, resolve, this);
        });
    }


    protected childrenCreated(): void {
        super.childrenCreated();
        this.label_word.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    private onClick() {
        console.log(this.word);
    }

    public get word(): string {
        const w = this.label_word;
        return w ? w.text : "";
    }

    public set word(word) {
        this.promise.then(() => {
            this.label_word.text = word;
        });
    }
}
