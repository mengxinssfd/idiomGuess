class SceneManager extends egret.DisplayObjectContainer {
    public currentScene: Scene;
    private history: Scene[] = [];
    public gameBegin: GameBegin;
    public gameLevels: GameLevels;
    public gamePlaying: GamePlaying;
    private static instance: SceneManager;

    private constructor() {
        super();
        this.gameBegin = new GameBegin();
        this.gameLevels = GameLevels.Instance;
        this.gamePlaying = GamePlaying.Instance;
    }

    public static get Instance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }

    public redirect(scene: Scene) {
        if (this.currentScene) {
            this.removeChild(this.currentScene);
        }
        this.switch(scene);
    }

    public switch(scene: Scene) {
        this.history.push(this.currentScene);
        this.currentScene = scene;
        this.addChild(scene);
    }

    // 回退
    public historyBack(isRefresh = true) {
        this.removeChild(this.currentScene);
        const back = this.history.pop();
        this.currentScene = back;
        this.addChild(back);
        if (isRefresh) back.refresh();
    }
}

