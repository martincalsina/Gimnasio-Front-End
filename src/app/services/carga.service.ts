import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  private cargandoSubject: Subject<boolean> = new Subject();

  constructor() { }

  public getCargandoSubject(): Subject<boolean> {
    return this.cargandoSubject;
  }

  public setCargandoSubject(value: boolean): void {
    this.cargandoSubject.next(value);
  }
  
}
