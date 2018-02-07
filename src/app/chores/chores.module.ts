import { NgModule } from "@angular/core";
import { ChoresComponent } from "./chores.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ChoreListComponent } from "./chore-list/chore-list.component";
import { AddChoreComponent } from "./add-chore/add-chore.component";
import { EditChoreComponent } from "./edit-chore/edit-chore.component";
import { ChoresRoutingModule } from "./chores-routing.module";
import { CustomMaterialModule } from "../custom-material.module";
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [ 
        ChoresComponent,
        ChoreListComponent,
        AddChoreComponent,
        EditChoreComponent
    ],
    imports: [
        CommonModule,
        ChoresRoutingModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [

    ]   
})
export class ChoresModule {

}