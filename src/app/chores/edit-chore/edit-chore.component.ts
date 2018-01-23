import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
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

    constructor(private route: ActivatedRoute,
        private choresService: ChoresService) { }

    ngOnInit() {
        this.route.params
            .subscribe(
            (params: Params) => {
                this.id = params["id"] ? Number(params["id"]) : 1;
                this.chore = this.choresService.getById(this.id);
            })
    }
}