import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

import { Chore } from "../chore.model";
import { ChoresService } from "../chores.service";


@Component({
    selector: "app-chore-list",
    templateUrl: "./chore-list.component.html",
    styleUrls: ["./chore-list.component.css"]
})
export class ChoreListComponent implements OnInit {
    chores: Chore[];
    dataSource: MatTableDataSource<Chore>;
    displayedColumns = ["name", "frequency", "last-time", "next-time"]

    constructor(private router: Router,
                private route: ActivatedRoute, 
                private choresService: ChoresService) { }

    ngOnInit() {
        this.chores = this.choresService.getChores();
        this.dataSource = new MatTableDataSource(this.chores)
    }

    onAddNewChore() {
        this.router.navigate(["new"], { relativeTo: this.route})
    }

    onCellClick(chore: Chore) {
        this.router.navigate([chore.id, "edit"], {relativeTo: this.route});
    }
}