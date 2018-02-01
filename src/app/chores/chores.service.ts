import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Chore } from "./chore.model";


@Injectable()
export class ChoresService {
    choresChanged = new Subject<Chore[]>();
    url: string = "https://love-your-home.firebaseio.com/";
    chores: Chore[] = [];

    constructor(private http: Http) { }

    getChores() {        
        this.http.get(this.url + "chores.json").subscribe(
            (response: Response) => {
                let responseBody = JSON.parse(response["_body"]);
                let arr = Object.keys(responseBody).map((k) => responseBody[k]);
                console.log(arr);
                // for (var key in responseBody){

                // }
                // var keys = Object.keys(responseBody);
                // var values = Object.values(responseBody);
                // console.log("keys: ", keys);
                // console.log("values", values);
                // var chores = a.map((databaseObject) => {
                //     var m = Object.keys(databaseObject)[0];
                //     console.log(m);
                //    // let modifiedChode: Chore = new Chore(databaseObject)
                // })
                // this.chores = Object.values(JSON.parse(response["_body"]) || [])
                //     .map(
                //         (chore: Chore) => {
                //             let modifiedChore : Chore = new Chore(chore.id, chore.name, chore.frequency, new Date(chore.lastTime));
                //             return modifiedChore;
                //         });                
                // this.choresChanged.next(this.chores.slice());         
            }
        )
    }

    getById(id: number): Chore {
        let found : Chore;
        if (this.chores.length > 0) {
            let found = this.chores.find((chore) => {
                return chore.id === id;               
            });            
        } else {
            this.http.get(this.url + "chores")
        }
       
        return found;
    }

    addChore(newChore: Chore) {      
        this.http.post(this.url + "chores.json", newChore).subscribe(
            (response: Response) => {
                this.chores.push(newChore);
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