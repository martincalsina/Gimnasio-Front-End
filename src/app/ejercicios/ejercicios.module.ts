import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjerciciosRoutingModule } from './ejercicios-routing.module';
import { DatosHistoricosComponent } from './componentes/datos-historicos/datos-historicos.component';
import { FormsModule } from '@angular/forms';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DatosHistoricosComponent
  ],
  imports: [
    CommonModule,
    EjerciciosRoutingModule,
    FormsModule,
    NgChartsModule
  ]
})
export class EjerciciosModule { }
