import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { ConfirmDialogData } from "./confirm-dialog-data.model";

@Component({
    selector: "app-confirm-dialog",
    templateUrl: "./confirm-dialog.component.html",
    styleUrls: ["./confirm-dialog.component.css"]
})
export class ConfirmDialogComponent implements OnInit {
    message: string;
    confirmText: string;
    denyText: string;

    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, 
                @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogData) { }

    ngOnInit(){
        this.message = this.data.title;
        this.confirmText = this.data.confirmText;
        this.denyText = this.data.denyText;
    }

    onNoClick() : void {
        this.dialogRef.close(false);
    }

    onAccept(){       
        this.dialogRef.close(true);
    }

    onDeny(){
       this.dialogRef.close(false);
    }
}