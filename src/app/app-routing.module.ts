import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ChoreListComponent } from "./chores/chores-management/chore-list.component";

const appRoutes : Routes = [
    { path: "", component: HomeComponent },
    { path: "chores", component: ChoreListComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule]
})
export class AppRouterModule {
    
}