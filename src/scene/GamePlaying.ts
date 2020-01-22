class GamePlaying extends Scene implements eui.UIComponent {
    private static instance: GamePlaying;
    private btn_back: eui.Button;
    private btn_setting: eui.Button;
    private img_question: eui.Image;
    private select_word_group: eui.Group;
    private selected_word_group: eui.Group;
    private question: Question;


    public static get Instance(): GamePlaying {
        if (!GamePlaying.instance)
            GamePlaying.instance = new GamePlaying();
        return GamePlaying.instance;
    }

    private constructor() {
        super();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init() {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            SceneManager.Instance.historyBack();
        }, this);
        this.select_word_group.addEventListener(WordClickEvent.EVENTNAME, this.clickSelectWord, this);
        this.selected_word_group.addEventListener(WordClickEvent.EVENTNAME, this.clickSelectedWord, this);
    }

    public initLevel() {
        const question = this.question = LevelDataManager.Instance.currentQuestion;
        const imgName = question.img.replace("images/", "");
        this.img_question.source = "resource/assets/images/question/" + imgName;
        const selectedWords = this.selected_word_group.$children as Word[];
        selectedWords.forEach((word, index) => {
            // word.word = question.answer[index];
            word.word = "";
        });
        let words = question.answer + question.word;
        // 随机一个其他题目的字段混进本题目
        while (words.length == 10) {
            const index = Math.floor(Math.random() * 400);
            if (index === LevelDataManager.Instance.currentLevel - 1) continue;
            // 取出i索引对应的题目信息,与words进行拼接,构成二十个字符
            const temp = LevelDataManager.Instance.questions[index];
            words += temp.word + temp.answer;
        }
        let wordsList = this.shuffle(words.split(""));
        const selectWords = this.select_word_group.$children as Word[];
        selectWords.forEach((word, index) => {
            word.word = wordsList[index];
        });
    }

    private shuffle<T>(arr: T[]): T[] {
        const newArr = arr.slice();
        for (let i = 0; i < newArr.length; i++) {
            const rand = ~~(Math.random() * newArr.length);
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    }

    private async clickSelectWord(e: WordClickEvent) {
        const {word: w, target} = e;
        const selectedWords = this.selected_word_group.$children as Word[];
        const findEmpty = selectedWords.find((word) => {
            const wd = word.word;
            return !wd;
        });
        if (findEmpty) {
            await (findEmpty.word = w);
            (<AnswerWord>findEmpty).clickFrom = target;
            target.visible = false;
        }
        const answer = selectedWords.map(word => word.word).join("");
        console.log(answer);
        if (answer === LevelDataManager.Instance.currentQuestion.answer) {
            console.log("答对了");
        }
    }

    clickSelectedWord(e: WordClickEvent) {
        const target: AnswerWord = e.target;
        target.clickFrom.visible = true;
        target.word = "";
    }
}
