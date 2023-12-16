import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-borrar-rutina',
  templateUrl: './borrar-rutina.component.html',
  styleUrl: './borrar-rutina.component.css'
})
export class BorrarRutinaComponent {

  @Input() rutina_id: number = -1;
  @ViewChild('cerrarAlTerminar') cerrarAlTerminar!: ElementRef;

  constructor(private dataService: DataService) {
    
  }

  eliminarRutina() {
    this.dataService.borrarRutina(this.rutina_id).subscribe(response => {
      console.log('Rutina eliminada con éxito', response);
      this.dataService.getRutinasSubject().next();
      this.cerrarAlTerminar.nativeElement.click(); //se aprieta el botón de cerrar solito
    }, error => {
      console.error('Error al eliminar rutina', error);
    });
  }

}
