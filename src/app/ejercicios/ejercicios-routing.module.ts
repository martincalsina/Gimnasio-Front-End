import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosHistoricosComponent } from './componentes/datos-historicos/datos-historicos.component';

const routes: Routes = [
  { path: '', component: DatosHistoricosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjerciciosRoutingModule { }
