import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Chore } from "./chore.model";


@Injectable()
export class ChoresService {
    choresChanged = new Subject<Chore[]>();
    gotChore = new Subject<Chore>();
    url: string = "https://love-your-home.firebaseio.com/";
    chores: Chore[] = [];
    choresChangesSubscription: Subscription;

    constructor(private http: Http) { }

    getChores(): void {
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

    private getChoreFromChores(id: string) {
        let found: Chore = this.chores.find((chore) => {
            return chore.id === id;
        });
        this.gotChore.next(found);
    }

    getById(id: string): void {
        //always get chore from all chores and not from the server to simplify two way binding
        if (this.chores.length > 0) {
            if (this.choresChangesSubscription) {
                this.choresChangesSubscription.unsubscribe();
            }
            this.getChoreFromChores(id);
        } else {
            this.choresChangesSubscription = this.choresChanged.subscribe(
                (chores: Chore[]) => {
                    this.getChoreFromChores(id);
                }
            )
        }
        //get chore from server
        // else {
        // this.http.get(this.url + "chores" + "/" + id + ".json").subscribe(
        //     (response: Response) => {
        //         let responseBody = JSON.parse(response["_body"]);
        //         let chore = responseBody ? new Chore(responseBody.id, responseBody.name, responseBody.frequency, new Date(responseBody.lastTime)) : new Chore("", "", 0, new Date());
        //         this.gotChore.next(chore);
        //     }
        // )}       

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
        let index = this.chores.findIndex(c => c.id === chore.id);
        let updateUrl = this.url + "chores/" + chore.id + ".json";
        let choreToUpdate: Chore = new Chore(chore.id, chore.name, chore.frequency, new Date(chore.lastTime));
        this.http.put(updateUrl, choreToUpdate).subscribe(
            (response: Response) => {
                let responseBody = JSON.parse(response["_body"]);
                let updatedChore: Chore = new Chore(
                    responseBody.id, responseBody.name, responseBody.frequency, new Date(responseBody.lastTime)
                );
                this.chores[index] = updatedChore;
                this.choresChanged.next(this.chores.slice());
            }
        )
    }

    deleteChore(choreToDelete: Chore) {
        let index = this.chores.findIndex(chore => chore.id === choreToDelete.id);
        this.http.delete(this.url + "chores/" + choreToDelete.id + ".json").subscribe(
            (response: Response) => {
                console.log("delete: ", response);
                this.chores.splice(index, 1);
                this.choresChanged.next(this.chores.slice());
            }
        )
    }
}