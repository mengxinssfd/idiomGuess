class Win extends DialogSup implements eui.UIComponent {
    private static instance: Win;
    private lb_idiom_desc: eui.Label;
    private lb_idiom_from: eui.Label;
    private btn_next: eui.Button;
    private r_mask: eui.Rect;

    private constructor() {
        super();
    }

    public static get Instance(): Win {
        if (!Win.instance) Win.instance = new Win();
        return Win.instance;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.r_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.hide();
        }, this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickNext, this);
    }

    public show(parent) {
        super.show(parent);
        const question = LevelDataManager.Instance.currentQuestion;
        this.lb_idiom_desc.text = question.tip;
        this.lb_idiom_from.text = question.content;
    }

    private clickNext() {
        LevelDataManager.Instance.currentLevel += 1;
        (this.parent as Scene).refresh();
        this.hide();
    }

}