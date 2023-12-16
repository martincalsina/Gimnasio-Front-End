import { Component } from '@angular/core';
import { SesionService } from '../../../../services/sesion.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  public nombre: String = 'Nombre de Usuario';

  constructor(private sesionService: SesionService, 
    private dataService: DataService, private router: Router) {}

  ngOnInit() {

    const persona_id: number = parseInt(sessionStorage.getItem('user_id')!);

    this.dataService.verPersona(persona_id).subscribe((persona: any) => {
      this.nombre = persona.nombre;
    });

  }

  cerrarSesion() {
    this.sesionService.setSubject(false);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
