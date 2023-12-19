import { Component } from '@angular/core';
import {  ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import {} from 'ng2-charts';
import { DataService } from '../../../services/data.service';
import { CargaService } from '../../../services/carga.service';

@Component({
  selector: 'app-datos-historicos',
  templateUrl: './datos-historicos.component.html',
  styleUrl: './datos-historicos.component.css'
})
export class DatosHistoricosComponent {

  private persona_id: number = -1;
  
  //cada que actualizamos el gráfico, lo hago desaparecer y volver con un ngIf,
  //de tal manera que recargue sus datos
  public showData = false;

  listaEjercicios: any[] = []; 
  ejercicioSeleccionado: number = -1;

  public barChartLegend = true;

  public barChartPlugins = [];

  //configuración del gráfico
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
         title: {
          text: "Fecha",
          display: true
         }
      },
      y: {
        title: {
          text: "Peso en Kilogramos",
          display: true
        }
      }
    }
  };

  //tipo de gráfico
  barChartType: ChartType = 'line';

  //datos del gráfico
  barChartData: ChartConfiguration<'line'>['data'] = {
    labels: [ '2010-12-12' ],
    datasets: [
      { data: [ 100 ], label: 'Peso Muerto' }
    ]
  };

  constructor(private dataService: DataService,
    private cargaService: CargaService) {}

  ngOnInit(): void {

    this.cargaService.setCargandoSubject(true);

    this.persona_id = parseInt(sessionStorage.getItem('user_id')!);

    this.dataService.getEjercicios().subscribe((data) => {
      
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


      this.cargaService.setCargandoSubject(false);

    });

  }

  actualizarGrafico(): void {

    const ejercicio_id = this.ejercicioSeleccionado;

    this.cargaService.setCargandoSubject(true);

    this.showData = false;

    setTimeout(() =>{

      this.dataService.obtenerDatosHistoricos(this.persona_id, ejercicio_id).subscribe((data) => {
        
        //obtenemos la lista de entrenamientos en los que se realizó el ejercicio pedido
        let dataset: any[] = data.datosHistoricos;
  
        console.log("cargué los datos:", data);
        
        //ordenamos por fecha
        dataset.sort((a: any, b: any) => {
          const fechaA = new Date(a.fecha).getTime();
          const fechaB = new Date(b.fecha).getTime();
  
          return fechaA - fechaB;
        });
  
        console.log("ordené los datos:", dataset);
  
        this.barChartData.labels = [];
        this.barChartData.datasets = [];
  
        let dataSetFinal: any = {
          data: [],
          label: data.ejercicio_nombre
        }
        
        //vamos agregando los pesos y las fecha de a pares
        for (let i = 0; i < dataset.length; i++) {
          
          let datoHistorico: any = dataset.at(i);
          
          //las fechas directamente al atributo que tenemos
          this.barChartData.labels.push(datoHistorico.fecha);
          //los pesos a la variable auxiliar
          dataSetFinal.data.push(datoHistorico.peso);
  
        }
        
        this.barChartData.datasets.push(Object.assign({}, dataSetFinal));
  
        //this.barChartData.datasets.push(dataSetFinal);
  
        console.log("actualicé los datos:", this.barChartData);

        this.showData = true; //mostramos el gráfico

        this.cargaService.setCargandoSubject(false);
        
      });


    },
    1000);
    
    
    //el timeout es para que el ngIf haga que el container del canvas desaparezca
    //y vuelva a cargar. Es la manera que encontré de hacer que se actualice el chart

  }

}
