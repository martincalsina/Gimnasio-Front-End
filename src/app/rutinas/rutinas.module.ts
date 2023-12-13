import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutinasRoutingModule } from './rutinas-routing.module';
import { ListaRutinasComponent } from './componentes/lista-rutinas/lista-rutinas.component';
import { AgregarRutinaComponent } from './componentes/modales/agregar-rutina/agregar-rutina.component';
import { FormsModule } from '@angular/forms';
import { BorrarRutinaComponent } from './componentes/modales/borrar-rutina/borrar-rutina.component';
import { EditarRutinaComponent } from './componentes/modales/editar-rutina/editar-rutina.component';


@NgModule({
  declarations: [
    ListaRutinasComponent,
    AgregarRutinaComponent,
    BorrarRutinaComponent,
    EditarRutinaComponent
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
