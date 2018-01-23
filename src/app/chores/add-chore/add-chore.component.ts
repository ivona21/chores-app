import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
    selector: "app-add-chore",
    templateUrl: "./add-chore.component.html",
    styleUrls: ["./add-chore.component.css"]
})
export class AddChoreComponent {
    createChoreForm: FormGroup;   

    constructor(fb: FormBuilder) {
        // this.createChoreForm = fb.group({
        //     floatLabel: "auto"
        // })
        this.initForm();
    }

    initForm() {
        this.createChoreForm = new FormGroup({
            "name": new FormControl(),
            "frequency": new FormControl()
        });        
    }

    onSubmit(){
        console.log(this.createChoreForm);
    }
}