import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LineaTerrestreComponent } from './components/linea-terrestre/linea-terrestre.component';
import { LineaMarinaComponent } from './components/linea-marina/linea-marina.component';
import { HomeComponent } from './components/home/home.component';
import { EstacionMedicionComponent } from './components/estacion-medicion/estacion-medicion.component';
import { EstacionCompresionComponent } from './components/estacion-compresion/estacion-compresion.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/shared/content/content.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'estacion-compresion', component: EstacionCompresionComponent },
  { path: 'estacion-medicion', component: EstacionMedicionComponent},
  { path: 'linea-marina', component: LineaMarinaComponent },
  { path: 'linea-terrestre', component: LineaTerrestreComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LineaTerrestreComponent,
    LineaMarinaComponent,
    HomeComponent,
    EstacionMedicionComponent,
    EstacionCompresionComponent,
    MainNavComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
