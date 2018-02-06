export class Chore {
    public id: string;
    public name: string;
    public frequency: number;
    public lastTime: Date;
    public nextTime: Date;

    constructor(id: string, name: string, frequency: number, lastTime: Date) {
        this.id = id ? id : Math.random().toString();
        this.name = name;
        this.frequency = frequency;
        this.lastTime = lastTime ? lastTime : new Date();
        this.calculateNextTime();
    }

    calculateNextTime(): void {
        let lastTimeMs = this.lastTime.getTime();
        let msToAdd = 1000 * 60 * 60 * 24 * this.frequency;
        this.nextTime = new Date(lastTimeMs + msToAdd);
    }
}