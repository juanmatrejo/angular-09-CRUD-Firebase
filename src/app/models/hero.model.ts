export class HeroModel {
    id: string | null;
    name: string;
    power: string;
    isAlive: boolean;

    constructor() {
        this.id = null;
        this.name = '';
        this.power = '';
        this.isAlive = true;
    }
}
