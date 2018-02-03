import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Chore } from "./chore.model";


@Injectable()
export class ChoresService {
    choresChanged = new Subject<Chore[]>();
    gotChore = new Subject<Chore>();
    url: string = "https://love-your-home.firebaseio.com/";
    chores: Chore[] = [];

    constructor(private http: Http) { }

    getChores() : void {
        this.http.get(this.url + "chores.json").subscribe(
            (response: Response) => {
                let responseBody = JSON.parse(response["_body"]);
                this.chores = Object.keys(responseBody).map((key) => {
                    let chore = new Chore(
                        key,
                        responseBody[key].name,
                        responseBody[key].frequency,
                        new Date(responseBody[key].lastTime))

                    return chore;
                });
                this.choresChanged.next(this.chores.slice());
            }
        )
    }

    getById(id: string): void {
        let found : Chore;
        if (this.chores.length > 0) {
            found = this.chores.find((chore) => {
                return chore.id === id;          
            });              
            this.gotChore.next(found);       
        } else {
        this.http.get(this.url + "chores" + "/" + id + ".json").subscribe(
            (response: Response) => {
                let responseBody = JSON.parse(response["_body"]);
                let chore = new Chore(responseBody.id, responseBody.name, responseBody.frequency, new Date(responseBody.lastTime));
                this.gotChore.next(chore);
            }
        )}       
      
    }

    addChore(choreToInsert: Chore) {
        this.http.post(this.url + "chores.json", choreToInsert).subscribe(
            (response: Response) => {
                let key = JSON.parse(response["_body"]).name;               
                let insertedChore: Chore = new Chore(key, choreToInsert.name, choreToInsert.frequency, choreToInsert.lastTime);               
                this.chores.push(insertedChore);
                this.choresChanged.next(this.chores.slice());
            }
        )
    }

    updateChore(chore: Chore) {
        let foundIndex = this.chores.findIndex(x => x.id === chore.id);
        let brandNew: Chore = new Chore(chore.id, chore.name, chore.frequency, chore.lastTime);
        this.chores[foundIndex] = brandNew;
        this.choresChanged.next(this.chores.slice());
    }
}