import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallaCargaRoutingModule } from './pantalla-carga-routing.module';
import { PantallaCargaComponent } from './componentes/pantalla-carga/pantalla-carga.component';


@NgModule({
  declarations: [
    PantallaCargaComponent
  ],
  imports: [
    CommonModule,
    PantallaCargaRoutingModule
  ],
  exports: [
    PantallaCargaComponent
  ]
})
export class PantallaCargaModule { }
