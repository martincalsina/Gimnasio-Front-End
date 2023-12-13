import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-rutinas',
  templateUrl: './lista-rutinas.component.html',
  styleUrl: './lista-rutinas.component.css'
})
export class ListaRutinasComponent {
  
  public persona_id: number = -1;
  public rutinas: any[] = [];

  public rutinaSeleccionada: number = -1;
  
  private subscription = new Subscription();

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    /*
    hacemos que este componente esté subscripto a un Subject para poder actualizar la lista de rutinas
    de manera dinámica. Así, no hace falta enviar eventos desde componentes hijos hacia éste,
    basta que, al actualizar/borrar una rutina, el método que se conecta con el back
    haga que el Subject emita un evento para que este componente use su método para actualizarRutinas
    */
    this.subscription = this.dataService.getRutinasSubject().subscribe((r:any) => {
      this.actualizarRutinas();
    });
    this.dataService.getRutinasSubject().next();
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); //pa no quedarme sin memoria, qlklk
  }

  actualizarRutinas(): void {
    this.persona_id = parseInt(sessionStorage.getItem('user_id')!);
    console.log("id del usuario:", this.persona_id)
    this.dataService.rutinasDe(this.persona_id).subscribe((rutinas: any) => {
      this.rutinas = rutinas;
      console.log("rutinas cargadas:", rutinas);
    })
  }

  eliminarRutinaSeleccionada(rutina_id: number): void {
    this.rutinaSeleccionada = rutina_id;
  }

}
