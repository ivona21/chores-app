import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import { ChoresService } from "../chores.service";
import { ConfirmDialogComponent } from "../../shared/dialogs/confirmDialog/confirm-dialog.component";
import { ConfirmDialogData } from "../../shared/dialogs/confirmDialog/confirm-dialog-data.model";
import { Chore } from "../chore.model";

@Component({
    selector: "app-edit-chore",
    templateUrl: "./edit-chore.component.html",
    styleUrls: ["./edit-chore.component.css"]
})
export class EditChoreComponent implements OnInit, OnDestroy {
    chore: Chore = new Chore("", "", 0, new Date());
    editChoreForm: FormGroup;
    gotChoreSubscription: Subscription;
    submitted: boolean = false;

    constructor(private router: Router,
        private route: ActivatedRoute,      
        private warningDialog: MatDialog,
        private choresService: ChoresService) { }

    ngOnInit() {
        this.gotChoreSubscription = this.choresService.gotChore.subscribe(
            (chore: Chore) => {
                if (!chore) {
                    this.router.navigate(["/chores"]);
                    return;
                }

                if (this.editChoreForm && this.editChoreForm.dirty) {                  
                    let unsavedChore = Object.assign({}, this.chore);
                    this.saveChangesWarning(unsavedChore);
                }

                this.chore = chore;

            }
        )
        this.route.params.subscribe(
            (params: Params) => {
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
        this.submitted = true;
        this.choresService.updateChore(this.chore);
        this.router.navigate(["/chores"]);
    }

    onCancel() {
        this.router.navigate(["/chores"]);
    }

    calculateNextTime() {
        if (this.chore.lastTime && this.chore.frequency) {
            this.chore.calculateNextTime();
        }
    }

    saveChangesWarning(unsavedChore: Chore) {
        let warningDialogRef = this.warningDialog.open(ConfirmDialogComponent, {
            width: "300px",
            data: new ConfirmDialogData("You have unsaved changes. Would you like to continue editing chore?", "", "Yes, go back", "No, just leave", {})
        })
        warningDialogRef.afterClosed().subscribe(
            (continueEditing) => {
                if (continueEditing) { 
                    this.router.navigate(["chores", unsavedChore.id, "edit"]);                    
                } else {                   
                    this.choresService.getChores(true);
                }
                this.editChoreForm.markAsPristine();
            });
    }

    ngOnDestroy() {
        if (this.editChoreForm && this.editChoreForm.dirty && !this.submitted) {
            let unsavedChore: Chore = Object.assign({}, this.chore);
            this.saveChangesWarning(unsavedChore);                    
        }
        this.gotChoreSubscription.unsubscribe();
    }
}