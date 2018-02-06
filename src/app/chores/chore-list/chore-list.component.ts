import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatDialog } from "@angular/material";

import { Subscription } from "rxjs/Subscription";

import { Chore } from "../chore.model";
import { ChoresService } from "../chores.service";
import { ConfirmDialogComponent } from "../../shared/dialogs/confirmDialog/confirm-dialog.component";
import { ConfirmDialogData } from "../../shared/dialogs/confirmDialog/confirm-dialog-data.model";


@Component({
    selector: "app-chore-list",
    templateUrl: "./chore-list.component.html",
    styleUrls: ["./chore-list.component.css"]
})
export class ChoreListComponent implements OnInit, OnDestroy {
    chores: Chore[];
    dataSource: MatTableDataSource<Chore>;
    displayedColumns = ["name", "frequency", "last-time", "next-time", "actions"];
    subscription: Subscription;
    selectedRowIndex: number = -1;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private choresService: ChoresService,
        private deleteConfirmDialog: MatDialog) { }

    ngOnInit() {
        this.route.url.subscribe(
            (url) => { this.selectedRowIndex = -1; }
        )

        this.subscription = this.choresService.choresChanged.subscribe(
            (chores: Chore[]) => {
                this.chores = chores;
                this.dataSource = new MatTableDataSource(this.chores);
            });

        this.choresService.getChores(false);
        this.findSelectedRow();
    }

    private findSelectedRow() {
        let selectedChoreId = this.route.snapshot["_urlSegment"].segments &&
            this.route.snapshot["_urlSegment"].segments[1] ? this.route.snapshot["_urlSegment"].segments[1].path : "";
        if (selectedChoreId) {
            this.selectedRowIndex = selectedChoreId;
        }
    }

    onAddNewChore() {
        this.router.navigate(["new"], { relativeTo: this.route })
        this.selectedRowIndex = -1;
    }

    private deleteChore(chore) {
        this.choresService.deleteChore(chore);
        this.router.navigate(["/chores"]);
        this.selectedRowIndex = -1;
    }

    onDeleteChore(chore: Chore, $event) {
        if ($event.stopPropagation) $event.stopPropagation();
        if ($event.preventDefault) $event.preventDefault();
        $event.cancelBubble = true;
        this.selectedRowIndex = -1;
     
        let deleteConfirmDialogRef = this.deleteConfirmDialog.open(ConfirmDialogComponent, {
            width: "300px",
            data: new ConfirmDialogData("Are you sure you want to delete this chore?", "", "Yes, delete it", "No, go back", chore)
        });
        deleteConfirmDialogRef.afterClosed().subscribe(
            (result) => {
                if (result) {
                    this.deleteChore(chore);
                }
            });
    }

    onRowClick(row) {
        this.selectedRowIndex = row.id;
        this.router.navigate([row.id, "edit"], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}