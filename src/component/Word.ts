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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    protected onClick() {
        // console.log(this.word);
        SoundManager.Instance.playWord();
        const e = new WordClickEvent(WordClickEvent.EVENTNAME, true);
        e.word = this.word;
        this.dispatchEvent(e);
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
