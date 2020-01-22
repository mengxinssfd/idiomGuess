class WordClickEvent extends egret.Event {
    public static EVENTNAME = "WordClickEvent";
    public word:string;

    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }

}
