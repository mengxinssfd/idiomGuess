class Tips extends DialogSup implements eui.UIComponent {
    private lb_content: eui.Label;
    private r_mask: eui.Rect;
    private static instance: Tips;

    private constructor() {
        super();
    }

    public static get Instance(): Tips {
        if (!Tips.instance) Tips.instance = new Tips();
        return Tips.instance;
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.r_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.hide();
        }, this);
    }


    show(parent, msg: string) {
        super.show(parent);
        this.lb_content.text = msg;
    }

}