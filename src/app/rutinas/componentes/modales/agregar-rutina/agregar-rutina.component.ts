import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CargaService } from '../../../../services/carga.service';

@Component({
  selector: 'app-agregar-rutina',
  templateUrl: './agregar-rutina.component.html',
  styleUrl: './agregar-rutina.component.css'
})
export class AgregarRutinaComponent implements OnInit, OnChanges{
  
  @Input() persona_id_input: any;
  //obtenemos el botón de cerrar del modal de Bootstrap
  @ViewChild('cerrarAlTerminar') cerrarAlTerminar!: ElementRef;

  private persona_id: number = -1;
  public nombreNuevaRutina: string = "";

  constructor(private dataService: DataService,
    private cargaService: CargaService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.persona_id = this.persona_id_input;
  }

  agregarRutina() {
    
    //comienza la pantalla de carga
    this.cargaService.setCargandoSubject(true);

    console.log("usuario que agrega rutina:", this.persona_id);
    console.log("nombre de nueva rutina:", this.nombreNuevaRutina);
    this.dataService.agregarRutina(this.persona_id, this.nombreNuevaRutina).subscribe((response: any) => {
      
      console.log(response);
      this.dataService.getRutinasSubject().next(); //actualizamos la lista de rutinas
      this.cerrarAlTerminar.nativeElement.click(); //clickeamos el botón de cerrar del modal
      this.cargaService.setCargandoSubject(false); //quitamos la pantalla de carga
    });
  }

}
