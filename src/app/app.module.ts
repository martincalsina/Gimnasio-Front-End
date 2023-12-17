import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RutinasModule } from './rutinas/rutinas.module';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { PerfilComponent } from './perfil/componentes/perfil/perfil.component';
import { PantallaCargaComponent } from './pantalla-carga/componentes/pantalla-carga/pantalla-carga.component';
import { PantallaCargaModule } from './pantalla-carga/pantalla-carga.module';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RutinasModule,
    PantallaCargaModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
