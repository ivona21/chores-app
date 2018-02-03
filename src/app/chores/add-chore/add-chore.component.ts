import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ChoresService } from "../chores.service";
import { Chore } from "../chore.model";

@Component({
    selector: "app-add-chore",
    templateUrl: "./add-chore.component.html",
    styleUrls: ["./add-chore.component.css"]
})
export class AddChoreComponent implements OnInit {
    createChoreForm: FormGroup;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private choresService: ChoresService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.createChoreForm = new FormGroup({
            "name": new FormControl(null, [Validators.required]),
            "frequency": new FormControl(null, [Validators.required, Validators.min(1)]),
            "lastTime": new FormControl(null, [Validators.required])
        });
    }

    private clearForm(){
        this.createChoreForm.reset();
    }

    onSubmit() {
        let chore: Chore = new Chore("",
                                     this.createChoreForm.value["name"],
                                     this.createChoreForm.value["frequency"],
                                     this.createChoreForm.value["lastTime"]);
        this.choresService.addChore(chore);
        this.clearForm();
        this.router.navigate(["chores"])
    }
}