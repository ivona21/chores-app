import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Chore } from "../chore.model";
import { ChoresService } from "../chores.service";

@Component({
    selector: "app-edit-chore",
    templateUrl: "./edit-chore.component.html",
    styleUrls: ["./edit-chore.component.css"]
})
export class EditChoreComponent implements OnInit {
    chore: Chore;
    id: number;
    editChoreForm: FormGroup;

    constructor(private route: ActivatedRoute,
        private choresService: ChoresService) { }

    ngOnInit() {

        
        this.route.params
            .subscribe(
            (params: Params) => {
                this.id = params["id"] ? Number(params["id"]) : 1;
                this.chore = this.choresService.getById(this.id);
            })
        this.initForm();
    }

    initForm() {
        this.editChoreForm = new FormGroup({
            "name": new FormControl(this.chore.name, [Validators.required]),
            "frequency": new FormControl(this.chore.frequency, [Validators.required, Validators.min(1)]),
            "lastTime": new FormControl(this.chore.lastTime, [Validators.required])
        });
    }

    onSubmit(){
        console.log(this.chore);
    }
}