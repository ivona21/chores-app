import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent } from "./dialogs/confirmDialog/confirm-dialog.component";
import { CustomMaterialModule } from "../custom-material.module";

@NgModule({
    entryComponents: [
        ConfirmDialogComponent
    ],
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        CustomMaterialModule
    ],
    exports: [
        CommonModule,        
        ConfirmDialogComponent
    ]
})
export class SharedModule {

}