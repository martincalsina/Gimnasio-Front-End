import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-lista-rutinas',
  templateUrl: './lista-rutinas.component.html',
  styleUrl: './lista-rutinas.component.css'
})
export class ListaRutinasComponent {
  
  public persona_id: number = -1;
  public rutinas: any[] = [];

  public rutinaSeleccionada: number = -1;
  public rutinaAEditar: any = {
    rutina_id: -1,
    nombre: ""
  };
  
  //variable para actualizar dinámicamente la lista de rutinas de una persona
  private subscription = new Subscription();

  constructor(private dataService: DataService,
    private cargaService: CargaService) {

  }

  ngOnInit() {
    
    this.subscription = this.dataService.getRutinasSubject().subscribe((r:any) => {

      this.actualizarRutinas();

    });
    this.dataService.getRutinasSubject().next();
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  actualizarRutinas(): void {
    
    //cada que se actualizan las rutinas, se inicia la pantalla de carga
    this.cargaService.setCargandoSubject(true);

    this.persona_id = parseInt(sessionStorage.getItem('user_id')!);
    console.log("id del usuario:", this.persona_id)
    this.dataService.rutinasDe(this.persona_id).subscribe((rutinas: any) => {

      this.rutinas = rutinas;
      console.log("rutinas cargadas:", rutinas);
      
      //al terminar la request, la pantalla de carga desaparece
      this.cargaService.setCargandoSubject(false);
      
    })
  }

  eliminarRutinaSeleccionada(rutina_id: number): void {
    this.rutinaSeleccionada = rutina_id;
  }

  editarRutinaSeleccionada(rutina_id: number): void {
    this.rutinaAEditar = this.rutinas.find(rutina => rutina.rutina_id == rutina_id);
  }

}
