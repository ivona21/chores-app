import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Chore } from "../chore.model";
import { ChoresService } from "../chores.service";

@Component({
    selector: "app-edit-chore",
    templateUrl: "./edit-chore.component.html",
    styleUrls: ["./edit-chore.component.css"]
})
export class EditChoreComponent implements OnInit, OnDestroy {
    chore: Chore = new Chore("", "", 0, new Date());
    id: string;
    editChoreForm: FormGroup;
    gotChoreSubscription: Subscription;
    //just to check if form is submitted
    @ViewChild("ngForm") editChoreNgForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private choresService: ChoresService) { }

    ngOnInit() {
        this.gotChoreSubscription = this.choresService.gotChore.subscribe(
            (chore: Chore) => {
                this.chore = chore;
            }
        )
        this.route.params.subscribe(
            (params: Params) => {
                this.saveChangesWarning();
                this.id = params["id"] ? params["id"] : "1";
                this.choresService.getById(this.id);
            })

        this.initForm();
    }

    initForm() {
        this.editChoreForm = new FormGroup({
            "name": new FormControl(null, [Validators.required]),
            "frequency": new FormControl(null, [Validators.required, Validators.min(1)]),
            "lastTime": new FormControl(null, [Validators.required]),
        });
    }

    onSubmit() {       
        this.choresService.updateChore(this.chore);
        this.router.navigate(["chores"]);
    }

    onCancel() {
        this.router.navigate(["/chores"]);
    }

    calculateNextTime() {
        if (this.chore.lastTime){
            let nextTime = new Date().setDate(this.chore.lastTime.getDate() + this.chore.frequency);
            this.chore.nextTime = new Date(nextTime);
        }      
    }

    saveChangesWarning() {      
        if (this.editChoreForm && this.editChoreForm.dirty && !this.editChoreNgForm.submitted) {
            let saveChanges = confirm("Would you like to save your changes first?");           
            saveChanges ? this.router.navigate(["/chores", this.chore.id, "edit"]) : this.choresService.getChores(true);
            this.editChoreForm.reset();         
        }
    }

    ngOnDestroy() {
        this.saveChangesWarning();
        this.gotChoreSubscription.unsubscribe();
    }
}