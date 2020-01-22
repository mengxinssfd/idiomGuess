class GameLevels extends Scene implements eui.UIComponent {
    private btn_back: eui.Button;
    private scroll: eui.Scroller;
    private group: eui.Group;
    private level: number = 0;
    private levelIconList: LevelIcon[] = [];
    private img_arrow: eui.Image;
    private static instance: GameLevels;

    private constructor() {
        super();
    }

    public static get Instance(): GameLevels {
        if (!GameLevels.instance)
            GameLevels.instance = new GameLevels();
        return GameLevels.instance;
    }

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }


    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init() {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SceneManager.Instance.historyBack();
        }, this);
        // 事件代理
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        this.scroll.scrollPolicyH = eui.ScrollPolicy.OFF;

        const spanY = 77;
        const half = this.width / 2;
        const quarter = half / 2;

        const gkLen = 400;
        const group = new eui.Group();
        group.width = this.width;
        group.height = spanY * gkLen;

        const imgSrc = RES.getRes("GameBG2_jpg");
        // 铺满背景图
        for (let i = 0; i <= (group.height / this.height); i++) {
            const img = new eui.Image();
            img.source = imgSrc;
            img.width = this.width;
            img.y = i * this.height - this.height / 2;
            img.touchEnabled = false;
            group.addChildAt(img, 0);
        }

        const currentLevel = LevelDataManager.Instance.currentLevel;
        for (let i = 0; i < gkLen; i++) {
            const btn = new LevelIcon();
            btn.level = i + 1;
            btn.y = spanY * i;
            btn.x = Math.sin(btn.y / (180 * 6) * Math.PI) * quarter + half - spanY / 2;
            // 从底部排起
            btn.y = group.height - btn.y - spanY;
            btn.enabled = i < currentLevel;
            group.addChild(btn);
            this.levelIconList.push(btn);
        }

        // 开启位图缓存模式
        // group.cacheAsBitmap = true;
        this.group.addChild(group);

        const currentLevelBtn = this.levelIconList[currentLevel - 1];
        const imgArrow = new eui.Image();
        imgArrow.source = RES.getRes("PageDownBtn_png");
        imgArrow.anchorOffsetX = 124 / 2 - currentLevelBtn.width / 2;
        imgArrow.anchorOffsetY = 76;
        imgArrow.touchEnabled = false;
        imgArrow.x = currentLevelBtn.x;
        imgArrow.y = currentLevelBtn.y;
        this.img_arrow = imgArrow;
        group.addChild(imgArrow);
        // 滚动到目的地
        this.group.scrollV = Math.min(currentLevelBtn.y - spanY, group.height - this.height);
    }

    private touchHandler(e: TouchEvent) {
        if (!(e.target instanceof LevelIcon)) return;
        const btn: LevelIcon = e.target;
        console.log(btn.level);
        this.level = btn.level;
        LevelDataManager.Instance.currentLevel = this.level;
        SceneManager.Instance.redirect(SceneManager.Instance.gamePlaying);
        GamePlaying.Instance.initLevel();
    }
}
