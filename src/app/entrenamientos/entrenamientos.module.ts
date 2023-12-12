import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenamientosRoutingModule } from './entrenamientos-routing.module';
import { ListaEntrenamientosComponent } from './componentes/lista-entrenamientos/lista-entrenamientos.component';
import { InfoEntrenamientosComponent } from './componentes/info-entrenamientos/info-entrenamientos.component';
import { AgregarEntrenamientosComponent } from './componentes/agregar-entrenamientos/agregar-entrenamientos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaEntrenamientosComponent,
    InfoEntrenamientosComponent,
    AgregarEntrenamientosComponent
  ],
  imports: [
    CommonModule,
    EntrenamientosRoutingModule,
    FormsModule
  ]
})
export class EntrenamientosModule { }
