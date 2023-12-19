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
  
  //nombre del usuario en la parte superior derecha
  public nombre: String = 'Nombre de Usuario';
  //subscripción para actualizar dinámicamente el nombre del usuario
  public subscription: Subscription = new Subscription();

  constructor(private sesionService: SesionService, 
    private dataService: DataService, private router: Router) {}

  ngOnInit() {
    
    //obtenemos el id del usuario guardado en la sesión 
    const persona_id: number = parseInt(sessionStorage.getItem('user_id')!);
    
    //nos subscribimos al subject del dataService que nos dice si se ha editado al usuario
    //en algún momento (desde el componente perfil se emite el evento)
    this.subscription = this.dataService.getPersonaSubject().subscribe((r:any) => {

      this.dataService.verPersona(persona_id).subscribe((persona: any) => {
        this.nombre = persona.nombre;
      });

    });

    this.dataService.getPersonaSubject().next();

  }
  
  //se borra el id del sessionStorage y se le dice al sessionService que ya no se está loggeado,
  //hace que desaparezca la topbar al actualizar al app-component
  cerrarSesion() {
    this.sesionService.setSubject(false);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
