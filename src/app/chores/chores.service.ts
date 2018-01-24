import { Chore } from "./chore.model";

import { Subject } from "rxjs/Subject";

export class ChoresService {
    choresChanged = new Subject<Chore []>();

    chores : Chore [] = [
        new Chore(1, "vacuuming", 7, new Date()),
        new Chore(2, "brushing carpet", 30, new Date())
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

    updateChore(chore: Chore){
        let foundIndex = this.chores.findIndex(x => x.id === chore.id);      
        let brandNew : Chore = new Chore(chore.id, chore.name, chore.frequency, chore.lastTime);
        this.chores[foundIndex] = brandNew;
        this.choresChanged.next(this.chores.slice());
    }   
}