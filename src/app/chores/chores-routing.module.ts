import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChoresComponent } from "./chores.component";
import { ChoreListComponent } from "./chore-list/chore-list.component";
import { AddChoreComponent } from "./add-chore/add-chore.component";
import { EditChoreComponent } from "./edit-chore/edit-chore.component";

const routes : Routes = [ { path: "chores", component: ChoresComponent, children: [
    { path: "chore-management", component: ChoreListComponent },
    { path: "new", component: AddChoreComponent },
    { path: ":id/edit", component: EditChoreComponent }
] }]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ChoresRoutingModule {

}