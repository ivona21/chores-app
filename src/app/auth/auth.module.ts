import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { CommonModule } from "@angular/common/src/common_module";
import { SharedModule } from "../shared/shared.module";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,       
        AuthRoutingModule
    ],
    exports: [
        AuthRoutingModule      
    ]
})
export class AuthModule {

}