var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Question = (function () {
    function Question() {
    }
    return Question;
}());
__reflect(Question.prototype, "Question");
var LevelDataManager = (function () {
    function LevelDataManager() {
        this.questions = RES.getRes("questions_json");
    }
    Object.defineProperty(LevelDataManager, "Instance", {
        get: function () {
            if (!LevelDataManager.instance) {
                LevelDataManager.instance = new LevelDataManager();
            }
            return LevelDataManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    LevelDataManager.prototype.getLevel = function (level) {
        var len = this.questions.length;
        // [0 - len-1)
        var index = Math.max(0, Math.min(level, len - 1));
        return this.questions[index];
    };
    Object.defineProperty(LevelDataManager.prototype, "currentLevel", {
        // 获取当前游戏的最远进度
        get: function () {
            if (this.currentLevel$ !== undefined)
                return this.currentLevel$;
            var currentLevel = egret.localStorage.getItem("currentLevel");
            // 如果没有数据,那默认就是第一关
            return parseInt(currentLevel || "1");
        },
        // 设置当前游戏的最远进度
        set: function (level) {
            this.currentLevel$ = level;
            if (this.maxLevel < level)
                this.maxLevel = level;
            egret.localStorage.setItem("currentLevel", level.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelDataManager.prototype, "maxLevel", {
        get: function () {
            if (this.maxLevel$ !== undefined)
                return this.maxLevel$;
            var maxLevel = egret.localStorage.getItem("maxLevel");
            // 如果没有数据,那默认就是第一关
            return parseInt(maxLevel || "1");
        },
        // 设置当前游戏的最远进度
        set: function (level) {
            this.maxLevel$ = level;
            egret.localStorage.setItem("maxLevel", level.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelDataManager.prototype, "currentQuestion", {
        get: function () {
            return this.questions[this.currentLevel - 1];
        },
        enumerable: true,
        configurable: true
    });
    return LevelDataManager;
}());
__reflect(LevelDataManager.prototype, "LevelDataManager");
