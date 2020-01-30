class DialogSup extends eui.Component {
    public show(parent: Scene, ...other: any[]) {
        parent.addChild(this);
    }

    public hide() {
        this.parent.removeChild(this);
    }
}