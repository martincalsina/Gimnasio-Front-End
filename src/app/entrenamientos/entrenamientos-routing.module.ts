import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEntrenamientosComponent } from './componentes/lista-entrenamientos/lista-entrenamientos.component';

const routes: Routes = [
  {path:'', component: ListaEntrenamientosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrenamientosRoutingModule { }
