import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditarEntrenamientoService } from '../../../services/editar-entrenamiento.service';
import { DataService } from '../../../services/data.service';
import { Entrenamiento } from '../../../shared/models/shared.models.entrenamiento';
import { Repeticion } from '../../../shared/models/shared.model.repeticion';
import { Set } from '../../../shared/models/shared.model.set';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-entrenamientos',
  templateUrl: './editar-entrenamientos.component.html',
  styleUrl: './editar-entrenamientos.component.css'
})
export class EditarEntrenamientosComponent implements OnInit, OnDestroy {

  public entrenamiento_id: number = -1;

  private persona_id: number = -1;

  public listaRutinas: any[] = [];
  public listaEjercicios: any[] = [];
  
  public rutinaElegida: number = -1;

  public fecha: Date = new Date();

  public sets: any[] = [
    {
      ejercicio: 1, cantSeries: 1, ejercicio_id: 1, peso: 1,
      repeticiones: [
        {
          cantidad: 1,
          numero_serie: 1
        }
      ]
    }
  ];

  private subcription: Subscription = new Subscription();

  constructor(private dataService: DataService, 
    private router: Router) {

    }

  ngOnInit(): void {

    this.persona_id = parseInt(sessionStorage.getItem("user_id")!);
    this.cargarRutinas();
    this.cargarEjercicios();

    this.entrenamiento_id = parseInt(sessionStorage.getItem('entrenamientoSeleccionado_id')!);
    console.log("Se quiere editar al entrenamiento:", this.entrenamiento_id);

    this.dataService.getEntrenamiento(this.entrenamiento_id).subscribe((data: any) => {
      this.cargarEntrenamientoAEditar(data);
    });

  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  //--------------------------------

  //CARGA DE DATOS A EDITAR

  cargarEntrenamientoAEditar(data: any): void {
    this.rutinaElegida = data.rutina_id;
    this.fecha = data.fecha;
    this.sets = this.cargarSetsAEditar(data.sets);
  }

  cargarSetsAEditar(sets: any): any[] {

    let cantidadSets: number = sets.length;
    let setsAEditar: any[] = [];

    for (let i=0; i < cantidadSets; i++) {
      let setParticular: any = this.obtenerSetAEditar(i+1, sets[i]);
      setsAEditar.push(setParticular)
    }

    return setsAEditar;
  }

  obtenerSetAEditar(num_set: number, setParticular: any): any {

    let set: any = {
      ejercicio: num_set,
      cantSeries: setParticular.series,
      ejercicio_id: setParticular.ejercicio.id,
      peso: setParticular.peso,
      repeticiones: this.cargarRepeticionesAEditar(setParticular.repeticiones)
    };

    return set;
    
  }

  cargarRepeticionesAEditar(repeticiones: any) {
    
    let cantRepeticiones: number = repeticiones.length;
    let repeticionesAEditar: any[] = [] 

    for (let i = 0; i < cantRepeticiones; i++) {
      let repeticionParticular: any = this.obtenerRepeticionAEditar(repeticiones[i]);
      repeticionesAEditar.push(repeticionParticular);
    }

    return repeticionesAEditar;
  }

  obtenerRepeticionAEditar(repeticionParticular: any): any {
    
    let repeticion: any = {
      cantidad: repeticionParticular.cantidad,
      numero_serie: repeticionParticular.numero_serie
    }

    return repeticion
  }

  //CARGA DE DATOS A EDITAR

  //----------------------------------


  editarEntrenamiento() {
    let entrenamiento: Entrenamiento = this.obtenerEntrenamiento();

    this.dataService.editarEntrenamiento(this.entrenamiento_id, entrenamiento).subscribe(data => {
      console.log("entrenamiento editado:", data);
      this.dataService.getEntrenamientosSubject().next();
    });

    sessionStorage.removeItem('entrenamientoSeleccionado_id');

    this.router.navigate(['/entrenamientos']);
  }

  cargarRutinas() {
    this.dataService.rutinasDe(this.persona_id).subscribe((data:any) => {
      this.listaRutinas = data;
      console.log("rutinas cargadas:", this.listaRutinas);
    });
  }

  cargarEjercicios() {
    this.dataService.getEjercicios().subscribe((data:any) => {
      
      // Ordenar la lista de ejercicios por nombre
      this.listaEjercicios = data.content.sort((a: any, b: any) => {
        const nombreA = a.nombre.toUpperCase(); // convertir a mayúsculas para asegurar un ordenamiento insensible a mayúsculas/minúsculas
        const nombreB = b.nombre.toUpperCase();
        if (nombreA < nombreB) {
          return -1;
        }
        if (nombreA > nombreB) {
          return 1;
        }
        return 0; // nombres iguales
      });

      console.log("ejercicios cargados:", this.listaEjercicios);
    });
  }

  obtenerEntrenamiento(): Entrenamiento {
    let sets: Set[] = this.obtenerSets();
    let entrenamiento: Entrenamiento = new Entrenamiento(this.rutinaElegida, this.fecha, sets);
    return entrenamiento;
  }

  obtenerSets(): Set[] {

    let cantidadSets = this.sets.length;
    let setsProcesados: Set[] = [];

    for (let i = 0; i < cantidadSets; i++) {

      let datosSetParticular = this.sets.at(i);
      let repeticionesDelSet: Repeticion[] = this.obtenerRepeticiones(datosSetParticular);
      let setParticular = new Set(
        datosSetParticular.peso,
        datosSetParticular.cantSeries,
        datosSetParticular.ejercicio_id,
        repeticionesDelSet
      );

      setsProcesados.push(setParticular);
    
    }

    return setsProcesados;

  }

  obtenerRepeticiones(datosSetParticular: any): Repeticion[] {

    let cantidadSeries = datosSetParticular.cantSeries;
    let repeticionesProcesadas: Repeticion[] = [];

    for (let i = 0; i < cantidadSeries; i++) {

      let datosRepeticionParticular = datosSetParticular.repeticiones.at(i);
      let repeticionParticular = new Repeticion(
        datosRepeticionParticular.cantidad,
        datosRepeticionParticular.numero_serie
      );

      repeticionesProcesadas.push(repeticionParticular);

    }

    return repeticionesProcesadas;

  }

  agregarEjercicio() {
    let cantEjercicios: number = this.sets.length;
    if (cantEjercicios == 0) {
      this.sets = [{
        ejercicio: 1, cantSeries: 1, ejercicio_id: 1, peso: 1,
        repeticiones: [
          {
            cantidad: 0,
            numero_serie: 1
          }
        ]
      }];
    } else {
      let ultimoEjercicio: number = this.sets.at(cantEjercicios - 1)!.ejercicio;
      let nuevoEjercicio = {
        ejercicio: ultimoEjercicio, cantSeries: 1, ejercicio_id: 1, peso: 1,
        repeticiones: [
          {
            cantidad: 0,
            numero_serie: 1
          }
        ]
      };
      this.sets.push(nuevoEjercicio);
    }
  }

  eliminarEjercicio(posicionEjercicio: number) {
    // Verificar si la posición está dentro de los límites del array
    if (posicionEjercicio >= 0 && posicionEjercicio < this.sets.length) {
      // Utilizar splice para eliminar el elemento en la posición especificada
      this.sets.splice(posicionEjercicio, 1);
    } else {
      console.error('Posición de ejercicio no válida');
    }
  }

  actualizarRepeticiones(indice: number) {

    let setParticular = this.sets.at(indice);
    setParticular.repeticiones = [];
    for (let serie = 1; serie <= setParticular.cantSeries; serie++) {
      setParticular.repeticiones.push({
        cantidad: 0,  
        numero_serie: serie
      });
    this.sets[indice] = setParticular;
    }

    console.log("Repeticiones actualizadas en el Set:", indice+1,this.sets);
  }

}
