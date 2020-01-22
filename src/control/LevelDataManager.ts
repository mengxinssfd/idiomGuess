class Question {
    public answer: string;
    public img: string;
    public word: string;
    public tip: string;
    public content: string;
}

class LevelDataManager {
    public questions: Question[];
    private static instance: LevelDataManager;
    private currentLevel$: number;

    private constructor() {
        this.questions = RES.getRes("questions_json");
    }

    public static get Instance(): LevelDataManager {
        if (!LevelDataManager.instance) {
            LevelDataManager.instance = new LevelDataManager();
        }
        return LevelDataManager.instance;
    }

    public getLevel(level: number): Question {
        const len = this.questions.length;
        // [0 - len-1)
        const index = Math.max(0, Math.min(level, len - 1));
        return this.questions[index];
    }

// 获取当前游戏的最远进度
    public get currentLevel(): number {
        if (this.currentLevel$ !== undefined) return this.currentLevel$;
        let currentLevel: string = egret.localStorage.getItem("currentLevel");
        // 如果没有数据,那默认就是第一关
        return parseInt(currentLevel || "1");
    }

    // 设置当前游戏的最远进度
    public set currentLevel(level: number) {
        this.currentLevel$ = level;
        egret.localStorage.setItem("currentLevel", level.toString());
    }

    public get currentQuestion(): Question {
        return this.questions[this.currentLevel - 1];
    }
}
