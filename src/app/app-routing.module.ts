import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ChoreListComponent } from "./chores/chore-list/chore-list.component";
import { ChoresComponent } from "./chores/chores.component";
import { AddChoreComponent } from "./chores/add-chore/add-chore.component";
import { EditChoreComponent } from "./chores/edit-chore/edit-chore.component";

const appRoutes : Routes = [
    { path: "", component: HomeComponent }  
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule]
})
export class AppRouterModule {
    
}