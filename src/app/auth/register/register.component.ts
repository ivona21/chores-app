import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    ngOnInit(){
        this.initForm();
    }

    initForm(){
        this.registerForm = new FormGroup({
            "username": new FormControl("", null),
            "password": new FormControl("", null);
        })
    }
}