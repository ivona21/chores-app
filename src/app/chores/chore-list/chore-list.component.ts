import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatDialog, Sort, MatTable } from "@angular/material";

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
    choresTable: MatTableDataSource<Chore>;
    chores: Chore[];
    displayedColumns = ["name", "frequency", "last-time", "next-time", "actions"];
    choresChangedSubscription: Subscription;
    selectedRowIndex: number = -1;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private deleteConfirmDialog: MatDialog,
        private choresService: ChoresService) { }

    ngOnInit() {
        //whenever on only chores (not edit chore) unselect table row
        this.route.url.subscribe(
            (url) => { this.selectedRowIndex = -1; }
        )

        this.choresChangedSubscription = this.choresService.choresChanged.subscribe(
            (chores: Chore[]) => {
                this.chores = chores;
                this.choresTable = new MatTableDataSource(chores);
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
    }

    onDeleteChore(chore: Chore, $event) {
        if ($event.stopPropagation) $event.stopPropagation();
        if ($event.preventDefault) $event.preventDefault();
        $event.cancelBubble = true;

        let deleteConfirmDialogRef = this.deleteConfirmDialog.open(ConfirmDialogComponent, {
            width: "300px",
            data: new ConfirmDialogData("Are you sure you want to delete this chore?", "", "Yes, delete it", "No, go back", {})
        });
        deleteConfirmDialogRef.afterClosed().subscribe(
            (confirmed) => {
                if (confirmed) {
                    this.deleteChore(chore);
                }
            });
    }

    onRowClick(row) {
        this.selectedRowIndex = row.id;
        this.router.navigate([row.id, "edit"], { relativeTo: this.route });
    }

    sortChores(sort: Sort) {
        if (!sort.active || sort.direction == "") {
            return;
        }

        let sortedChores = this.chores.sort((a, b) => {
            let isAsc = sort.direction == "asc";
            switch (sort.active) {
                case "name": return this.compare(a.name, b.name, isAsc);
                case "frequency": return this.compare(a.frequency, b.frequency, isAsc);
                case "last-time": return this.compare(a.lastTime, b.lastTime, isAsc);
                case "next-time": return this.compare(a.nextTime, b.nextTime, isAsc);
            }
        })
        this.choresTable = new MatTableDataSource(sortedChores);
    }

    compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ngOnDestroy() {
        this.choresChangedSubscription.unsubscribe();
    }
}