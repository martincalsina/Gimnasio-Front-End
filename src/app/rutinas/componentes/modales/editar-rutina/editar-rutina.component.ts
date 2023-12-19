import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CargaService } from '../../../../services/carga.service';

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './editar-rutina.component.html',
  styleUrl: './editar-rutina.component.css'
})
export class EditarRutinaComponent {

  @Input() rutina: any = {};
  //botón de cerrar el modal
  @ViewChild('cerrarAlTerminar') cerrarAlTerminar!: ElementRef;
  
  public rutina_id: number = -1;
  public rutina_nombre :string = "";

  constructor(private dataService: DataService,
    private cargaService: CargaService)  {}

  ngOnChanges() {
    this.rutina_id = this.rutina.rutina_id;
    this.rutina_nombre = this.rutina.nombre;
  }

  editarRutina() {
    
    //pantalla de carga sí
    this.cargaService.setCargandoSubject(true); 

    this.dataService.editarRutina(this.rutina_id, this.rutina_nombre).subscribe((data) => {
      console.log("Rutina editada: ", data);
      this.dataService.getRutinasSubject().next(); //actualizar lista de rutinas
      this.cerrarAlTerminar.nativeElement.click(); //se aprieta el botón de cerrar solito
      
      //pantalla de carga no
      this.cargaService.setCargandoSubject(false);
    });
  }

}
