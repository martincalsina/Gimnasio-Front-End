import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RutinasModule } from './rutinas/rutinas.module';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { PantallaCargaModule } from './pantalla-carga/pantalla-carga.module';
import { Error404Module } from './error404/error404.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RutinasModule,
    PantallaCargaModule,
    Error404Module,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
