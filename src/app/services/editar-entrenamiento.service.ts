import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarEntrenamientoService {

  private entrenamientoIdSubject: Subject<number> = new Subject();

  constructor() { }

  public getEntrenamientoIdSubject(): Subject<number> {
    return this.entrenamientoIdSubject;
  }

  public setEntrenamientoId(entrenamiento_id: number): void {
    this.entrenamientoIdSubject.next(entrenamiento_id);
  }



}
