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

  //con estas variables vamos a decidir si mostrar el componente de la topbar y/o la pantalla de carga
  //al usuario
  public logged: boolean = false;
  public cargando: boolean = false;

  //para actualizar dinámicamente las variables de arriba, usamos Subjects
  private sesionSubscription: Subscription = new Subscription();
  private cargaSubscription: Subscription = new Subscription();
  title = 'Gimnasio-Front-End';

  constructor(private sesionService: SesionService,
    private cargaService: CargaService,
    private router: Router) {
  }

  ngOnInit() {
   
    //nos subscribimos a un subject que nos dirá si la sesión ha sido, o no, iniciado,
    //decidimos si mostrar la topbar o no
    this.sesionSubscription = this.sesionService.getSubject().subscribe((loggedValue: boolean) => {
      this.logged = loggedValue;
    });
    
    //nos subscribimos a un subject que dirá si se está consultado, o no, algo a la API,
    //mostramos la pantalla de carga en caso afirmativo
    this.cargaSubscription = this.cargaService.getCargandoSubject().subscribe((cargando: boolean) => {
      this.cargando = cargando;
    });

    this.verficarSiEstaLoggeado();
    
  }

  /*
  Si la variable de sesión user_id está definida, ha de ser porque el usuario se ha registrado. En ese caso
  lo mandamos al inicio, si no, al login.
  */ 
  verficarSiEstaLoggeado() {
    if (sessionStorage.getItem('user_id')! == null || sessionStorage.getItem('user_id') == undefined) {
      this.sesionService.getSubject().next(false);
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
