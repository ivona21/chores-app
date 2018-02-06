import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Chore } from "../chore.model";
import { ChoresService } from "../chores.service";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../../shared/dialogs/confirmDialog/confirm-dialog.component";
import { ConfirmDialogData } from "../../shared/dialogs/confirmDialog/confirm-dialog-data.model";

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
        private choresService: ChoresService,
        private warningDialog: MatDialog) { }

    ngOnInit() {      
        this.gotChoreSubscription = this.choresService.gotChore.subscribe(
            (chore: Chore) => {
                console.log("got chore ", new Date());
                chore ? this.chore = chore : this.router.navigate(["/chores"]);
            }
        )
        this.route.params.subscribe(
            (params: Params) => {
                if (this.editChoreForm && this.editChoreForm.dirty && !this.editChoreNgForm.submitted) {
                    let choreToCheck : Chore = Object.assign({}, this.chore);
                    console.log("params check", choreToCheck);
                    this.saveChangesWarning(choreToCheck);
                }
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

    onSubmit(choreToSave: Chore) {
        console.log("chore to save on submit: ", choreToSave);
        this.choresService.updateChore(choreToSave);
        this.redirectAfterSubmit ? this.router.navigate(["/chores"]) : this.redirectAfterSubmit = true;
    }

    onCancel() {
        this.router.navigate(["/chores"]);
    }

    calculateNextTime() {
        if (this.chore.lastTime && this.chore.frequency){
            this.chore.calculateNextTime();
        }     
    }    

    saveChangesWarning(choreToSave: Chore) {
        if (!this.editChoreForm.valid) {
            this.choresService.getChores(true);
            this.editChoreForm.reset();
            return;
        }
       
        let warningDialogRef = this.warningDialog.open(ConfirmDialogComponent, {
            width: "300px",
            data: new ConfirmDialogData("Would you like to save your changes first?", "", "Yes, save it", "No, just leave", {})
        })
        warningDialogRef.afterClosed().subscribe(
            (saveChanges) => {
                if (saveChanges) {                   
                    this.redirectAfterSubmit = false;
                    this.editChoreNgForm.ngSubmit.emit(choreToSave);                  
                } else {
                    this.choresService.getChores(true);                 
                }  
                this.editChoreForm.markAsPristine();              
            });
    }

    ngOnDestroy() {
        console.log("on destroj", new Date());
        if (this.editChoreForm && this.editChoreForm.dirty && !this.editChoreNgForm.submitted) {
            let choreToSave : Chore = Object.assign({}, this.chore);
            this.saveChangesWarning(choreToSave);
        }
        this.gotChoreSubscription.unsubscribe();
    }
}