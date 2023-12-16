import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { SesionService } from './services/sesion.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  logged: boolean = false;
  private subscription: Subscription = new Subscription();
  title = 'Gimnasio-Front-End';

  constructor(private sesionService: SesionService, private router: Router) {
  }

  ngOnInit() {

    this.subscription = this.sesionService.getSubject().subscribe((loggedValue: boolean) => {
      this.logged = loggedValue;
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
    this.subscription.unsubscribe();
  }

}
