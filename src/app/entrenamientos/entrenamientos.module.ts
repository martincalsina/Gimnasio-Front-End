import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenamientosRoutingModule } from './entrenamientos-routing.module';
import { ListaEntrenamientosComponent } from './componentes/lista-entrenamientos/lista-entrenamientos.component';
import { InfoEntrenamientosComponent } from './componentes/info-entrenamientos/info-entrenamientos.component';
import { AgregarEntrenamientosComponent } from './componentes/agregar-entrenamientos/agregar-entrenamientos.component';
import { FormsModule } from '@angular/forms';
import { EliminarEntrenamientoComponent } from './componentes/modales/eliminar-entrenamiento/eliminar-entrenamiento.component';
import { EditarEntrenamientosComponent } from './componentes/editar-entrenamientos/editar-entrenamientos.component';

@NgModule({
  declarations: [
    ListaEntrenamientosComponent,
    InfoEntrenamientosComponent,
    AgregarEntrenamientosComponent,
    EliminarEntrenamientoComponent,
    EditarEntrenamientosComponent,
    EliminarEntrenamientoComponent
  ],
  imports: [
    CommonModule,
    EntrenamientosRoutingModule,
    FormsModule
  ],
  exports: [
    InfoEntrenamientosComponent
  ]
})
export class EntrenamientosModule { }
