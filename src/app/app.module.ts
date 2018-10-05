import * as Jquery from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SharedComponent } from './components/shared/shared.component';
import { LineaTerrestreComponent } from './components/linea-terrestre/linea-terrestre.component';
import { LineaMarinaComponent } from './components/linea-marina/linea-marina.component';
import { HomeComponent } from './components/home/home.component';
import { EstacionMedicionComponent } from './components/estacion-medicion/estacion-medicion.component';
import { EstacionCompresionComponent } from './components/estacion-compresion/estacion-compresion.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SharedComponent,
    LineaTerrestreComponent,
    LineaMarinaComponent,
    HomeComponent,
    EstacionMedicionComponent,
    EstacionCompresionComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
