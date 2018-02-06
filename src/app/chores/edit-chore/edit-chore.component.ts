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
    editChoreForm: FormGroup;
    gotChoreSubscription: Subscription;
    redirectAfterSubmit: boolean = true;
    //just to check if form is submitted
    @ViewChild("ngForm") editChoreNgForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private choresService: ChoresService) { }

    ngOnInit() {
        this.gotChoreSubscription = this.choresService.gotChore.subscribe(
            (chore: Chore) => {
                chore ? this.chore = chore : this.router.navigate(["/chores"]);
            }
        )
        this.route.params.subscribe(
            (params: Params) => {
                this.saveChangesWarning();
                if (params["id"]) {
                    this.choresService.getById(params["id"]);
                }
            });

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
        this.redirectAfterSubmit ? this.router.navigate(["/chores"]) : this.redirectAfterSubmit = true;
    }

    onCancel() {
        this.router.navigate(["/chores"]);
    }

    calculateNextTime() {      
        this.chore.calculateNextTime();
    }

    saveChangesWarning() {
        if (this.editChoreForm && this.editChoreForm.dirty && !this.editChoreNgForm.submitted) {
            if (this.editChoreForm.valid) {
                let saveChanges = confirm("Would you like to save your changes first?");
                if (saveChanges) {                  
                    this.redirectAfterSubmit = false;
                    this.editChoreNgForm.ngSubmit.emit(this.chore);
                } else {
                    this.choresService.getChores(true);
                }
                this.editChoreForm.reset();
            } else {
                this.choresService.getChores(true);
                this.editChoreForm.reset();
            }
        }
    }

    ngOnDestroy() {
        this.saveChangesWarning();
        this.gotChoreSubscription.unsubscribe();
    }
}