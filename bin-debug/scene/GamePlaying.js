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
var GamePlaying = (function (_super) {
    __extends(GamePlaying, _super);
    function GamePlaying() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GamePlaying, "Instance", {
        get: function () {
            if (!GamePlaying.instance)
                GamePlaying.instance = new GamePlaying();
            return GamePlaying.instance;
        },
        enumerable: true,
        configurable: true
    });
    GamePlaying.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    GamePlaying.prototype.init = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SceneManager.Instance.historyBack();
        }, this);
    };
    GamePlaying.prototype.initLevel = function () {
        var question = this.question = LevelDataManager.Instance.currentQuestion;
        var imgName = question.img.replace("images/", "");
        this.img_question.source = "resource/assets/images/question/" + imgName;
        var selectedWords = this.selected_word_group.$children;
        selectedWords.forEach(function (word, index) {
            word.word = question.answer[index];
        });
        var words = question.answer + question.word;
        // 随机一个其他题目的字段混进本题目
        while (words.length == 10) {
            var index = Math.floor(Math.random() * 400);
            if (index === LevelDataManager.Instance.currentLevel - 1)
                continue;
            // 取出i索引对应的题目信息,与words进行拼接,构成二十个字符
            var temp = LevelDataManager.Instance.questions[index];
            words += temp.word + temp.answer;
        }
        var wordsList = this.shuffle(words.split(""));
        var selectWords = this.select_word_group.$children;
        selectWords.forEach(function (word, index) {
            word.word = wordsList[index];
        });
    };
    GamePlaying.prototype.shuffle = function (arr) {
        var newArr = arr.slice();
        for (var i = 0; i < newArr.length; i++) {
            var rand = ~~(Math.random() * newArr.length);
            _a = [newArr[rand], newArr[i]], newArr[i] = _a[0], newArr[rand] = _a[1];
        }
        return newArr;
        var _a;
    };
    return GamePlaying;
}(Scene));
__reflect(GamePlaying.prototype, "GamePlaying", ["eui.UIComponent", "egret.DisplayObject"]);
