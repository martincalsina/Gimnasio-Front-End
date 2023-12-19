import { Component, OnChanges, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Set } from '../../../shared/models/shared.model.set';
import { Entrenamiento } from '../../../shared/models/shared.models.entrenamiento';
import { Repeticion } from '../../../shared/models/shared.model.repeticion';
import { Router } from '@angular/router';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-agregar-entrenamientos',
  templateUrl: './agregar-entrenamientos.component.html',
  styleUrl: './agregar-entrenamientos.component.css'
})
export class AgregarEntrenamientosComponent implements OnInit, OnChanges{

  private persona_id: number = -1;
  
  //rutinas del select
  public listaRutinas: any[] = [];
  //ejercicios para el select de cada uno de los sets
  public listaEjercicios: any[] = [];
  
  public rutinaElegida: number = -1;

  public rutinaValida: boolean = true;
  public cantSetsValidos: boolean = true;

  public fecha: Date = new Date();
  
  //datos de todos los sets creados
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

  constructor(private dataService: DataService, 
    private cargaService: CargaService,
    private router: Router) {
  }

  ngOnInit() {
    //ponemos la pantalla de carga y nos traemos todas las rutinas y ejercicios disponibles
    this.cargaService.setCargandoSubject(true);
    this.persona_id = parseInt(sessionStorage.getItem("user_id")!);
    this.cargarRutinas();
    this.cargarEjercicios();
  }
  
  ngOnChanges(): void {
    //console.log("rutina elegida", this.rutinaElegida);
    //console.log("fecha elegida", this.fecha);
    //console.log("sets Registrados;",this.sets);
  }

  cargarRutinas() {
    this.dataService.rutinasDe(this.persona_id).subscribe((data:any) => {
      this.listaRutinas = data;
      console.log("rutinas cargadas:", this.listaRutinas);
    });
  }

  cargarEjercicios() {
    this.dataService.getEjercicios().subscribe((data:any) => {

      //ordenar la lista de ejercicios por nombre
      this.listaEjercicios = data.content.sort((a: any, b: any) => {
        const nombreA = a.nombre.toUpperCase(); //convertir a mayúsculas para asegurar un ordenamiento insensible a mayúsculas/minúsculas
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

      this.cargaService.setCargandoSubject(false);
    });
  }
  
  //si se agrega un nuevo ejercicio debemos actualizar la lista de sets que tenemos
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
      let ultimoEjercicio: number = this.sets.at(cantEjercicios - 1)!.ejercicio; //el número de ejercicio,
      //en verdad no era necesario, pero lo dejé
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

    if (posicionEjercicio >= 0 && posicionEjercicio < this.sets.length) {
      this.sets.splice(posicionEjercicio, 1);
    } else {
      console.error('Posición de ejercicio no válida');
    }
  }
  
  /*Para cada set, hay un input con la cantidad de series realizadas,
  si este cambia, cambian la cantidad de inputs para registrar las repeticiones de ese ejercicio*/
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

  agregarEntrenamiento() {

    this.rutinaValida=true;
    this.cantSetsValidos=true;

    let cantidadSets = this.sets.length;

    if (this.rutinaElegida == -1) {
      console.log("Elija una rutina");
      this.rutinaValida = false;
    }
    else if (cantidadSets == 0) {
      console.log("No se puede cargar un entrenamiento vacío");
      this.cantSetsValidos = false;
    } else {

      this.cargaService.setCargandoSubject(true);

      let entrenamiento: Entrenamiento = this.obtenerEntrenamiento();

      console.log(entrenamiento);

      this.dataService.agregarEntrenamiento(entrenamiento).subscribe((data:any) => {
        console.log("Entrenamiento creado:", data);
        this.dataService.getEntrenamientosSubject().next(); //actualizamos la lista de entrenamientos
        this.cargaService.setCargandoSubject(false); //se va la pantalla de carga
      }, error => {
        console.log("No se pudo registar el entrenamiento ", error);
        this.cargaService.setCargandoSubject(false); //se va la pantalla de carga
      });

      this.router.navigate(['/entrenamientos']);
      
    }
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

}
