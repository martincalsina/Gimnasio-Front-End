import { Set } from "./shared.model.set";

export class Entrenamiento {

    private rutina_id: number;
    private fecha: Date;
    private sets: Set[];
    
    constructor(rutina_id: number, fecha: Date, sets: Set[]) {
        this.rutina_id = rutina_id;
        this.fecha = fecha;
        this.sets = sets;
    }

    public getRutinaId(): number {
        return this.rutina_id;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getSets(): Set[] {
        return this.sets;
    }

}