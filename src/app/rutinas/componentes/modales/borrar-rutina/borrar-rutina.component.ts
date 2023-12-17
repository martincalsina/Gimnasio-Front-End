import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CargaService } from '../../../../services/carga.service';

@Component({
  selector: 'app-borrar-rutina',
  templateUrl: './borrar-rutina.component.html',
  styleUrl: './borrar-rutina.component.css'
})
export class BorrarRutinaComponent {

  @Input() rutina_id: number = -1;
  @ViewChild('cerrarAlTerminar') cerrarAlTerminar!: ElementRef;

  constructor(private dataService: DataService,
    private cargaService: CargaService) {
    
  }

  eliminarRutina() {

    this.cargaService.setCargandoSubject(true);

    this.dataService.borrarRutina(this.rutina_id).subscribe(response => {
      console.log('Rutina eliminada con éxito', response);
      this.dataService.getRutinasSubject().next();
      this.cerrarAlTerminar.nativeElement.click(); //se aprieta el botón de cerrar solito

      this.cargaService.setCargandoSubject(false);
    }, error => {
      console.error('Error al eliminar rutina', error);

      this.cargaService.setCargandoSubject(false);
    });
  }

}
