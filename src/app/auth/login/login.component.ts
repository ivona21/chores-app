import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "app-login-component",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    loginForm : FormGroup
    ngOnInit(){
        this.initForm();
    }

    initForm(){
        this.loginForm = new FormGroup({
            "username": new FormControl("", null),
            "password": new FormControl("", null)
        })
    }

    onSubmit(){
        console.log("submitted: ", this.loginForm);
    }
}