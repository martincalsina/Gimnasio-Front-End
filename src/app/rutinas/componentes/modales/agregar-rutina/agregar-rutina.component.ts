import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-agregar-rutina',
  templateUrl: './agregar-rutina.component.html',
  styleUrl: './agregar-rutina.component.css'
})
export class AgregarRutinaComponent implements OnInit, OnChanges{

  @Input() persona_id_input: any;
  private persona_id: number = -1;
  public nombreNuevaRutina: string = "";

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    parseInt(sessionStorage.getItem('user_id')!)
  }

  ngOnChanges(): void {
    this.persona_id = this.persona_id_input;
  }

  agregarRutina() {
    console.log("usuario que agrega rutina:", this.persona_id);
    console.log("nombre de nueva rutina:", this.nombreNuevaRutina);
    this.dataService.agregarRutina(this.persona_id, this.nombreNuevaRutina).subscribe((response: any) => {
      console.log(response);
    });
  }

}
