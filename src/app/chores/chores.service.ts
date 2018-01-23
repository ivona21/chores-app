import { Chore } from "./chore.model";

import { Subject } from "rxjs/Subject";

export class ChoresService {
    choresChanged = new Subject<Chore []>();

    chores : Chore [] = [
        new Chore("vacuuming", 7, new Date()),
        new Chore("brushing carpet", 30, new Date())
    ]

    getChores(){
        return this.chores.slice();
    }

    getById(id: number) : Chore {
        let found = this.chores.find((chore) => {
            return chore.id === id;
        })
        return found;
    }

    addChore(newChore: Chore){
        this.chores.push(newChore);
        this.choresChanged.next(this.chores.slice());
    }

    updateChore(id: number, chore: Chore){
        let foundIndex = this.chores.findIndex(x => x.id === id);
        this.chores[foundIndex] = chore;
        this.choresChanged.next(this.chores.slice());
    }

   
}