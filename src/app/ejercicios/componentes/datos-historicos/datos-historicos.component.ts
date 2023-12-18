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

  public showData = false;

  listaEjercicios: any[] = []; 
  ejercicioSeleccionado: number = -1;

  public barChartLegend = true;

  public barChartPlugins = [];

  // Configuración del gráfico
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

  // Tipo de gráfico
  barChartType: ChartType = 'line';

  // Datos del gráfico
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
      
        let dataset: any[] = data.datosHistoricos;
  
        console.log("cargué los datos:", data);
  
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
  
        for (let i = 0; i < dataset.length; i++) {
          
          let datoHistorico: any = dataset.at(i);
  
          this.barChartData.labels.push(datoHistorico.fecha);
          dataSetFinal.data.push(datoHistorico.peso);
  
        }
  
        this.barChartData.datasets.push(Object.assign({}, dataSetFinal)); // Crear copia
  
        //this.barChartData.datasets.push(dataSetFinal);
  
        console.log("actualicé los datos:", this.barChartData);

        this.showData = true;

        this.cargaService.setCargandoSubject(false);
        
      });


    },
    1000);
    
    
    //el timeout es para que el ngIf haga que el container del canvas desaparezca
    //y vuelva a cargar. Es la manera que encontré de hacer que se actualice el chart

  }

}
