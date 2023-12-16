import { Component } from '@angular/core';
import { SesionService } from '../../../../services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  constructor(private sesionService: SesionService, private router: Router) {}

  cerrarSesion() {
    this.sesionService.setSubject(false);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
