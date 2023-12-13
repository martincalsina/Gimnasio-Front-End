import { Component, Input } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-eliminar-entrenamiento',
  templateUrl: './eliminar-entrenamiento.component.html',
  styleUrl: './eliminar-entrenamiento.component.css'
})
export class EliminarEntrenamientoComponent {

  @Input() entrenamiento_id: number = -1;

  constructor(private dataService: DataService) {
    
  }

  eliminarEntrenamiento() {
    this.dataService.borrarEntrenamiento(this.entrenamiento_id).subscribe(response => {
      console.log('Entrenamiento eliminado con éxito', response);
      this.dataService.getEntrenamientosSubject().next();
    }, error => {
      console.error('Error al eliminar entrenamiento', error);
    });
  }

}
