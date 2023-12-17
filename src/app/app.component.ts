import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { SesionService } from './services/sesion.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CargaService } from './services/carga.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  public logged: boolean = false;
  public cargando: boolean = false;

  private sesionSubscription: Subscription = new Subscription();
  private cargaSubscription: Subscription = new Subscription();
  title = 'Gimnasio-Front-End';

  constructor(private sesionService: SesionService,
    private cargaService: CargaService,
    private router: Router) {
  }

  ngOnInit() {

    this.sesionSubscription = this.sesionService.getSubject().subscribe((loggedValue: boolean) => {
      this.logged = loggedValue;
    });

    this.cargaSubscription = this.cargaService.getCargandoSubject().subscribe((cargando: boolean) => {
      this.cargando = cargando;
    });

    this.verficarSiEstaLoggeado();
    
  }

  verficarSiEstaLoggeado() {
    if (sessionStorage.getItem('user_id')! == null || sessionStorage.getItem('user_id') == undefined) {
      this.sesionService.getSubject().next(false); //por default, no estamos loggeados
      this.router.navigate(['/login']);
    } else {
      this.sesionService.getSubject().next(true);
      this.router.navigate(['/inicio']);
    }
  }

  ngOnDestroy() {
    this.sesionSubscription.unsubscribe();
    this.cargaSubscription.unsubscribe();
  }

}
