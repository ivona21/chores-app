import { Component, OnInit } from "@angular/core";

import { Chore } from "../chore.model";
import { ChoresService} from "../chores.service";

@Component({
    selector: "app-chore-list",
    templateUrl: "./chore-list.component.html",
    styleUrls: ["./chore-list.component.css"]
})
export class ChoreListComponent implements OnInit {
   chores: Chore [];

   constructor(private choresService: ChoresService) { }

   ngOnInit(){
       this.chores = this.choresService.getChores();       
   }
}