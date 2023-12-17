import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CargaService } from '../../../../services/carga.service';

@Component({
  selector: 'app-eliminar-entrenamiento',
  templateUrl: './eliminar-entrenamiento.component.html',
  styleUrl: './eliminar-entrenamiento.component.css'
})
export class EliminarEntrenamientoComponent {

  @Input() entrenamiento_id: number = -1;
  @ViewChild('cerrarAlTerminar') cerrarAlTerminar!: ElementRef;

  constructor(private dataService: DataService,
    private cargaService: CargaService) {
    
  }

  eliminarEntrenamiento() {

    this.cargaService.setCargandoSubject(true);

    this.dataService.borrarEntrenamiento(this.entrenamiento_id).subscribe(response => {
      console.log('Entrenamiento eliminado con éxito', response);
      this.dataService.getEntrenamientosSubject().next();
      this.cerrarAlTerminar.nativeElement.click(); //se apreta el botón de cerrar solito

      this.cargaService.setCargandoSubject(false);
    }, error => {
      console.error('Error al eliminar entrenamiento', error);

      this.cargaService.setCargandoSubject(false);
    });
  }

}
