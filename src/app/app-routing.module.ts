import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "chores", loadChildren: "./chores/chores.module#ChoresModule" },

]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRouterModule {

}