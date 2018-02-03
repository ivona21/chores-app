import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

import { Subscription } from "rxjs/Subscription";

import { Chore } from "../chore.model";
import { ChoresService } from "../chores.service";


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
        private choresService: ChoresService) { }

    ngOnInit() {
        this.choresService.getChores();

        this.subscription = this.choresService.choresChanged.subscribe(
            (chores: Chore[]) => {
                this.chores = chores;
                this.dataSource = new MatTableDataSource(this.chores);
            })
    }

    onAddNewChore() {
        this.router.navigate(["new"], { relativeTo: this.route })
    }

    onDeleteChore(chore: Chore, $event) {
        if ($event.stopPropagation) $event.stopPropagation();
        if ($event.preventDefault) $event.preventDefault();
        $event.cancelBubble = true;
        
        this.choresService.deleteChore(chore);
        this.router.navigate(["/chores"]);
    }

    onRowClick(row) {
        this.selectedRowIndex = row.id;
        this.router.navigate([row.id, "edit"], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}