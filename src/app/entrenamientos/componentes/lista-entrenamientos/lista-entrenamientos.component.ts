import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-entrenamientos',
  templateUrl: './lista-entrenamientos.component.html',
  styleUrl: './lista-entrenamientos.component.css'
})
export class ListaEntrenamientosComponent implements OnInit, OnChanges, OnDestroy{

  private persona_id: number = -1;
  public entrenamientos: any[] = [];
  public entrenamientoSeleccionado: number = -1;

  private subscription = new Subscription();

  constructor(private dataService: DataService, private router: Router) {}
  

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
    this.persona_id = parseInt(sessionStorage.getItem('user_id')!);
    console.log("id del usuario:", this.persona_id);
    this.dataService.entrenamientosDe(this.persona_id).subscribe((entrenamientos:any) => {
      console.log("entrenamientos cargados:", entrenamientos);      
      this.entrenamientos = this.ordernarPorFecha(entrenamientos);
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

  setEntrenamientoSeleccionado(entrenamiento_id: number): void {
    this.entrenamientoSeleccionado = entrenamiento_id;
  } 

}
