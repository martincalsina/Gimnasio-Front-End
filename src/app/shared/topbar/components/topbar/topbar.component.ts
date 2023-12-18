import { Component } from '@angular/core';
import { SesionService } from '../../../../services/sesion.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  public nombre: String = 'Nombre de Usuario';
  public subscription: Subscription = new Subscription();

  constructor(private sesionService: SesionService, 
    private dataService: DataService, private router: Router) {}

  ngOnInit() {

    const persona_id: number = parseInt(sessionStorage.getItem('user_id')!);

    this.subscription = this.dataService.getPersonaSubject().subscribe((r:any) => {

      this.dataService.verPersona(persona_id).subscribe((persona: any) => {
        this.nombre = persona.nombre;
      });

    });

    this.dataService.getPersonaSubject().next();

  }

  cerrarSesion() {
    this.sesionService.setSubject(false);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
