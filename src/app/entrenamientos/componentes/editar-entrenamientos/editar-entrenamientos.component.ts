import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditarEntrenamientoService } from '../../../services/editar-entrenamiento.service';
import { DataService } from '../../../services/data.service';
import { Entrenamiento } from '../../../shared/models/shared.models.entrenamiento';
import { Repeticion } from '../../../shared/models/shared.model.repeticion';
import { Set } from '../../../shared/models/shared.model.set';
import { Router } from '@angular/router';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-editar-entrenamientos',
  templateUrl: './editar-entrenamientos.component.html',
  styleUrl: './editar-entrenamientos.component.css'
})
export class EditarEntrenamientosComponent implements OnInit, OnDestroy {

  public entrenamiento_id: number = -1;

  private persona_id: number = -1;
  
  //variable para traer todas las rutinas del usuario
  public listaRutinas: any[] = [];
  //variable para traer todos los ejericios registrados
  public listaEjercicios: any[] = [];

  public rutinaValida: boolean = true;
  public cantSetsValidos: boolean = true;
  
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


  constructor(private dataService: DataService, 
    private cargaService: CargaService,
    private router: Router) {

    }
  
  //es todo muy similar al crear, sólo que inicialmente tenemos que traer toda la data del entrenamiento
  //a editar y rellenar nuestras variables con ella
  ngOnInit(): void {
    
    this.cargaService.setCargandoSubject(true);

    this.persona_id = parseInt(sessionStorage.getItem("user_id")!);
    this.cargarRutinas();
    this.cargarEjercicios();

    this.entrenamiento_id = parseInt(sessionStorage.getItem('entrenamientoSeleccionado_id')!);
    console.log("Se quiere editar al entrenamiento:", this.entrenamiento_id);
    
    //lo distinto del crear
    this.dataService.getEntrenamiento(this.entrenamiento_id).subscribe((data: any) => {
      this.cargarEntrenamientoAEditar(data);
    });

  }

  ngOnDestroy(): void {
  }

  //--------------------------------

  //CARGA DE DATOS A EDITAR

  cargarEntrenamientoAEditar(data: any): void {

    this.rutinaElegida = data.rutina_id;
    this.fecha = data.fecha;
    this.sets = this.cargarSetsAEditar(data.sets);

    this.cargaService.setCargandoSubject(false);
    
  }
  
  //tenemos que rellenar la variable this.sets con toda la data que nos dieron
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

  //----------------------------------
  
  //es como el agregarEntrenamiento pero pasándole el id del entrenamiento existente
  editarEntrenamiento() {

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

    this.cargaService.setCargandoSubject(true); //ponemos la pantalla de carga

    let entrenamiento: Entrenamiento = this.obtenerEntrenamiento();

    this.dataService.editarEntrenamiento(this.entrenamiento_id, entrenamiento).subscribe(data => {
      console.log("entrenamiento editado:", data);
      this.dataService.getEntrenamientosSubject().next(); //actualizamos la lista de entrenamientos
      this.cargaService.setCargandoSubject(false); //quitamos la pantalla de carga

      this.router.navigate(['/entrenamientos']);
    }, error => {
      this.cargaService.setCargandoSubject(false); //quitamos la pantalla de carga
    });

    sessionStorage.removeItem('entrenamientoSeleccionado_id');

    this.router.navigate(['/entrenamientos']);

    }
  }

  //---------------------------

  //los métodos que vienen son exactamente iguales que los de agregar-entrenamientos

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
