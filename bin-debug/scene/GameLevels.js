var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var spanY = 77;
var GameLevels = (function (_super) {
    __extends(GameLevels, _super);
    function GameLevels() {
        var _this = _super.call(this) || this;
        _this.level = 0;
        _this.levelIconList = [];
        _this.totalHeight = 0;
        return _this;
    }
    Object.defineProperty(GameLevels, "Instance", {
        get: function () {
            if (!GameLevels.instance)
                GameLevels.instance = new GameLevels();
            return GameLevels.instance;
        },
        enumerable: true,
        configurable: true
    });
    GameLevels.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameLevels.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    GameLevels.prototype.init = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SceneManager.Instance.historyBack();
        }, this);
        // 事件代理
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        this.scroll.scrollPolicyH = eui.ScrollPolicy.OFF;
        // const spanY = 77;
        var half = this.width / 2;
        var quarter = half / 2;
        var gkLen = 400;
        var group = new eui.Group();
        group.width = this.width;
        group.height = spanY * gkLen;
        var imgSrc = RES.getRes("GameBG2_jpg");
        // 铺满背景图
        for (var i = 0; i <= (group.height / this.height); i++) {
            var img = new eui.Image();
            img.source = imgSrc;
            img.width = this.width;
            img.y = i * this.height - this.height / 2;
            img.touchEnabled = false;
            group.addChildAt(img, 0);
        }
        var currentLevel = LevelDataManager.Instance.currentLevel;
        var maxLevel = LevelDataManager.Instance.maxLevel;
        for (var i = 0; i < gkLen; i++) {
            var btn = new LevelIcon();
            btn.level = i + 1;
            btn.y = spanY * i;
            btn.x = Math.sin(btn.y / (180 * 6) * Math.PI) * quarter + half - spanY / 2;
            // 从底部排起
            btn.y = group.height - btn.y - spanY;
            btn.enabled = i < maxLevel;
            group.addChild(btn);
            this.levelIconList.push(btn);
        }
        // 开启位图缓存模式
        // group.cacheAsBitmap = true;
        this.group.addChild(group);
        var currentLevelBtn = this.levelIconList[currentLevel - 1];
        var imgArrow = new eui.Image();
        imgArrow.source = RES.getRes("PageDownBtn_png");
        imgArrow.anchorOffsetX = 124 / 2 - currentLevelBtn.width / 2;
        imgArrow.anchorOffsetY = 76;
        imgArrow.touchEnabled = false;
        imgArrow.x = currentLevelBtn.x;
        imgArrow.y = currentLevelBtn.y;
        this.img_arrow = imgArrow;
        group.addChild(imgArrow);
        this.totalHeight = group.height;
        // 滚动到目的地
        this.group.scrollV = Math.min(currentLevelBtn.y - spanY, group.height - this.height);
    };
    GameLevels.prototype.touchHandler = function (e) {
        if (!(e.target instanceof LevelIcon))
            return;
        var btn = e.target;
        console.log(btn.level);
        this.level = btn.level;
        LevelDataManager.Instance.currentLevel = this.level;
        SceneManager.Instance.redirect(SceneManager.Instance.gamePlaying);
        GamePlaying.Instance.initLevel();
    };
    GameLevels.prototype.refresh = function () {
        var currentLevel = LevelDataManager.Instance.currentLevel;
        var maxLevel = LevelDataManager.Instance.maxLevel;
        this.levelIconList.forEach(function (item, index) {
            item.enabled = item.level <= maxLevel;
        });
        var currentLevelBtn = this.levelIconList[currentLevel - 1];
        this.img_arrow.y = currentLevelBtn.y;
        this.img_arrow.x = currentLevelBtn.x;
        // 滚动到目的地
        this.group.scrollV = Math.min(currentLevelBtn.y - spanY, this.totalHeight - this.height);
    };
    return GameLevels;
}(Scene));
__reflect(GameLevels.prototype, "GameLevels", ["eui.UIComponent", "egret.DisplayObject"]);
