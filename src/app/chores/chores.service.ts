import { Chore } from "./chore.model";

import { Subject } from "rxjs/Subject";

export class ChoresService {
    choresChanged: Subject<Chore []>

    chores : Chore [] = [
        new Chore("vacuuming", 7, new Date()),
        new Chore("brushing carpet", 30, new Date())
    ]

    getChores(){
        return this.chores.slice();
    }

    addChore(newChore: Chore){
        this.chores.push(newChore);
        this.choresChanged.next(this.chores);
    }
}