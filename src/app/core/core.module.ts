import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRouterModule } from "../app-routing.module";
import { ChoresService } from "../chores/chores.service";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRouterModule
    ],
    exports: [
        HeaderComponent,
        AppRouterModule,
        SharedModule
    ],
    providers: [ChoresService]
})
export class CoreModule {

}