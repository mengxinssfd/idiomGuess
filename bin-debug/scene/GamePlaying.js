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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        var _this = this;
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameSetting.Instance.show(_this);
        }, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SceneManager.Instance.historyBack();
        }, this);
        this.select_word_group.addEventListener(WordClickEvent.EVENTNAME, this.clickSelectWord, this);
        this.selected_word_group.addEventListener(WordClickEvent.EVENTNAME, this.clickSelectedWord, this);
        this.img_question.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Tips.Instance.show(_this, _this.question.tip);
        }, this);
    };
    GamePlaying.prototype.initLevel = function () {
        var currentLevel = LevelDataManager.Instance.currentLevel;
        this.lb_level.text = "\u7B2C" + currentLevel + "\u5173";
        var question = this.question = LevelDataManager.Instance.currentQuestion;
        var imgName = question.img.replace("images/", "");
        this.img_question.source = "resource/assets/images/question/" + imgName;
        var selectedWords = this.selected_word_group.$children;
        selectedWords.forEach(function (word, index) {
            // word.word = question.answer[index];
            word.word = "";
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
            word.enabled = true;
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
    GamePlaying.prototype.clickSelectWord = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var w, target, selectedWords, findEmpty, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        w = e.word, target = e.target;
                        selectedWords = this.selected_word_group.$children;
                        findEmpty = selectedWords.find(function (word) {
                            var wd = word.word;
                            return !wd;
                        });
                        if (!findEmpty) return [3 /*break*/, 2];
                        return [4 /*yield*/, (findEmpty.word = w)];
                    case 1:
                        _a.sent();
                        findEmpty.clickFrom = target;
                        target.visible = false;
                        _a.label = 2;
                    case 2:
                        answer = selectedWords.map(function (word) { return word.word; }).join("");
                        console.log(answer);
                        if (answer.length === 4) {
                            if (answer === LevelDataManager.Instance.currentQuestion.answer) {
                                console.log("答对了");
                                this.onRight();
                            }
                            else {
                                SoundManager.Instance.playWrong();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GamePlaying.prototype.onRight = function () {
        SoundManager.Instance.playRight();
        Win.Instance.show(this);
    };
    GamePlaying.prototype.clickSelectedWord = function (e) {
        var target = e.target;
        target.clickFrom.visible = true;
        target.word = "";
    };
    GamePlaying.prototype.refresh = function () {
        // 选中的字重新显示
        var selectedWords = this.selected_word_group.$children;
        selectedWords.forEach(function (item) {
            if (!item.clickFrom)
                return;
            item.clickFrom.visible = true;
            item.clickFrom = null;
        });
        this.initLevel();
    };
    return GamePlaying;
}(Scene));
__reflect(GamePlaying.prototype, "GamePlaying", ["eui.UIComponent", "egret.DisplayObject"]);
