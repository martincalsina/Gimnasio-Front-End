import { Repeticion } from "./shared.model.repeticion";

export class Set {

    private peso: number;
    private series: number;
    private ejercicio_id: number;
    private listaRepeticiones: Repeticion[];

    constructor(peso: number, series: number, ejercicio_id:number, repeticiones: Repeticion[]) {
        this.peso = peso;
        this.series = series;
        this.ejercicio_id = ejercicio_id;
        this.listaRepeticiones = repeticiones;        
    }

    public getPeso(): number {
        return this.peso;
    }

    public getSeries(): number {
        return this.series;
    }

    public getEjercicioId(): number {
        return this.ejercicio_id;
    }

    public getRepeticiones(): Repeticion[] {
        return this.listaRepeticiones;
    }

}