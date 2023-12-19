import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-info-entrenamientos',
  templateUrl: './info-entrenamientos.component.html',
  styleUrl: './info-entrenamientos.component.css'
})
export class InfoEntrenamientosComponent {
  
  //dado un entrenamiento, vamos a obtener todos sus sets de ejercicios
  @Input() entrenamiento_id: number = -1;
  public sets: any[] = [];

  constructor(private dataService: DataService,
    private cargaService: CargaService) {}

  ngOnInit(): void {
    console.log("entrenamiento_id:", this.entrenamiento_id);
    this.actualizarInfoEntrenamiento();
  }

  actualizarInfoEntrenamiento(): void {

    //pantalla de carga sí
    this.cargaService.setCargandoSubject(true);

    this.dataService.getSetsDe(this.entrenamiento_id).subscribe((sets:any) => {
      this.sets = sets;
      console.log("sets de entrenamiento", this.entrenamiento_id, this.sets);
      //pantalla de carga no
      this.cargaService.setCargandoSubject(false);
    });
  }
  
  //ponemos de una forma más bonita la cantidad de repeticiones por serie
  obtenerRepeticiones(set: any): string {

    let texto_repes = "";

    for (let repeticion of set.repeticiones) {
      texto_repes += repeticion.cantidad + " - ";
    }

    //eliminar el guion extra al final
    texto_repes = texto_repes.slice(0, -2);

    return texto_repes;
  }

  

}
