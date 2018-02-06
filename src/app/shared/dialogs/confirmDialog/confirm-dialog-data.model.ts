export class ConfirmDialogData {
    public title: string;
    public text: string;
    public confirmText: string;
    public denyText: string;
    public data: any;

    constructor(title, text, confirmText, denyText, data){
        this.title = title;
        this.text = text;
        this.confirmText = confirmText || "Yes";
        this.denyText = denyText || "No";
        this.data = data || {}
    }
}