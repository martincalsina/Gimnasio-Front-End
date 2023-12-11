import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRutinasComponent } from './componentes/lista-rutinas/lista-rutinas.component';

const routes: Routes = [
  {path: '', component: ListaRutinasComponent}	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutinasRoutingModule { }
