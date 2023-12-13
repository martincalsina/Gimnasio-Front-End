import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEntrenamientosComponent } from './componentes/lista-entrenamientos/lista-entrenamientos.component';
import { AgregarEntrenamientosComponent } from './componentes/agregar-entrenamientos/agregar-entrenamientos.component';
import { EditarEntrenamientosComponent } from './componentes/editar-entrenamientos/editar-entrenamientos.component';

const routes: Routes = [
  {path:'', component: ListaEntrenamientosComponent},
  {path: 'agregar', component: AgregarEntrenamientosComponent},
  {path: 'editar', component:EditarEntrenamientosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrenamientosRoutingModule { }
