export class Chore {
    public id: number;
    public name: string;
    public frequency: number;
    public lastTime: Date;
    public nextTime: Date;

    constructor(id: number, name: string, frequency: number, lastTime: Date) {
        this.id = id ? id : Math.random();
        this.name = name;
        this.frequency = frequency;
        this.lastTime = lastTime ? lastTime : new Date();
        this.nextTime = this.calculateNextTime();
    }

    private calculateNextTime(): Date {
        let nextTime = new Date();
        nextTime.setDate(this.lastTime.getDate() + this.frequency);
        return nextTime;
    }
}