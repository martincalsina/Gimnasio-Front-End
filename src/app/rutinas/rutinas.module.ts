import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutinasRoutingModule } from './rutinas-routing.module';
import { ListaRutinasComponent } from './componentes/lista-rutinas/lista-rutinas.component';
import { AgregarRutinaComponent } from './componentes/modales/agregar-rutina/agregar-rutina.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaRutinasComponent,
    AgregarRutinaComponent
  ],
  imports: [
    CommonModule,
    RutinasRoutingModule,
    FormsModule
  ],
  exports: [
  ]
})
export class RutinasModule { }
