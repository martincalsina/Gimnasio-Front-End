import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EditarEntrenamientoService } from '../../../services/editar-entrenamiento.service';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-lista-entrenamientos',
  templateUrl: './lista-entrenamientos.component.html',
  styleUrl: './lista-entrenamientos.component.css'
})
export class ListaEntrenamientosComponent implements OnInit, OnChanges, OnDestroy{

  private persona_id: number = -1;

  //lista con todos los entrenamientos de una persona
  public entrenamientos: any[] = [];
  public entrenamientoSeleccionado: number = -1;
  
  //variables para decidir si actualizar la lista de entrenamientos del usuario
  private subscription = new Subscription();

  constructor(private dataService: DataService, 
    private cargaService: CargaService, private router: Router) {}
  

  ngOnInit() {
    this.subscription = this.dataService.getEntrenamientosSubject().subscribe((r:any) => {
      this.actualizarEntrenamientos();
    });
    this.dataService.getEntrenamientosSubject().next();
  }

  ngOnChanges(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizarEntrenamientos(): void {
    
    //pantalla de carga
    this.cargaService.setCargandoSubject(true);

    this.persona_id = parseInt(sessionStorage.getItem('user_id')!);
    //console.log("id del usuario:", this.persona_id);
    this.dataService.entrenamientosDe(this.persona_id).subscribe((entrenamientos:any) => {
      
      console.log("entrenamientos cargados:", entrenamientos);      
      this.entrenamientos = this.ordernarPorFecha(entrenamientos);

      this.cargaService.setCargandoSubject(false);
    });

  }

  ordernarPorFecha(entrenamientos: any[]): any[] {
    return entrenamientos.sort((a, b) => {
      // Convertir las fechas a objetos Date
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);

      // Comparar las fechas
      return fechaB.getTime() - fechaA.getTime();
    });
  }

  irAgregarRutina() {
    this.router.navigate(['/entrenamientos/agregar']);
  }
  
  //actualizamos el id del entrenamiento seleccionado para pasárselo al modal que corresponde
  eliminarEntrenamientoSeleccionado(entrenamiento_id: number): void {
    this.entrenamientoSeleccionado = entrenamiento_id;
  }
  
  //nos guardamos el id del entrenamiento seleccionado para ir a la ruta del componente de edición
  editarEntrenamientoSeleccionado(entrenamiento_id: number): void {
    sessionStorage.setItem('entrenamientoSeleccionado_id', entrenamiento_id.toString()); 
    this.router.navigate(['/entrenamientos/editar']);
  }

}
