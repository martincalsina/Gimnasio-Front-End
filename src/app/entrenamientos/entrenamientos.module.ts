import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenamientosRoutingModule } from './entrenamientos-routing.module';
import { ListaEntrenamientosComponent } from './componentes/lista-entrenamientos/lista-entrenamientos.component';
import { InfoEntrenamientosComponent } from './componentes/info-entrenamientos/info-entrenamientos.component';


@NgModule({
  declarations: [
    ListaEntrenamientosComponent,
    InfoEntrenamientosComponent
  ],
  imports: [
    CommonModule,
    EntrenamientosRoutingModule
  ]
})
export class EntrenamientosModule { }
