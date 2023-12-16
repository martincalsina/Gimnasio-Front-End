import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  public nombre: String = 'nombre';
  public apellido: String = 'apellido';

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

    const persona_id: number = parseInt(sessionStorage.getItem('user_id')!);

    this.dataService.verPersona(persona_id).subscribe((persona: any) => {
      this.nombre = persona.nombre;
      this.apellido = persona.apellido;
    });
    
  }

}
