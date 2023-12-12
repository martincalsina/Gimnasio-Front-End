export class Repeticion {

    private cantidad: number;
    private numero_serie: number;

    constructor(cantidad: number, numero_serie: number) {
        this.cantidad = cantidad;
        this.numero_serie = numero_serie;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getNumeroSerie(): number {
        return this.numero_serie;
    }
}