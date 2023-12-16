import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private loggedSubject: Subject<boolean> = new Subject();

  constructor() { }

  setSubject(valor: boolean) {
    this.loggedSubject.next(valor);
  }

  getSubject(): Subject<boolean> {
    return this.loggedSubject;
  }

}
