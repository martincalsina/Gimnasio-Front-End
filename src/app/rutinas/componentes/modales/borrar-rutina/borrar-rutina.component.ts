import { Component, Input } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-borrar-rutina',
  templateUrl: './borrar-rutina.component.html',
  styleUrl: './borrar-rutina.component.css'
})
export class BorrarRutinaComponent {

  @Input() rutina_id: number = -1;

  constructor(private dataService: DataService) {
    
  }

  eliminarRutina() {
    this.dataService.borrarRutina(this.rutina_id).subscribe(response => {
      console.log('Rutina eliminada con éxito', response);
      this.dataService.getRutinasSubject().next();
    }, error => {
      console.error('Error al eliminar rutina', error);
    });
  }

}
