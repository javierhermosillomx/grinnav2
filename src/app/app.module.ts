import { AuthGuard } from './models/aut-guard';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LineaTerrestreComponent } from './components/linea-terrestre/linea-terrestre.component';
import { LineaMarinaComponent } from './components/linea-marina/linea-marina.component';
import { HomeComponent } from './components/home/home.component';
import { EstacionMedicionComponent } from './components/estacion-medicion/estacion-medicion.component';
import { EstacionCompresionComponent } from './components/estacion-compresion/estacion-compresion.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/shared/content/content.component';
import { ModuloImagenesComponent } from './components/shared/modulo-imagenes/modulo-imagenes.component';
import { ModuloReportesMensualesComponent } from './components/shared/modulo-reportes-mensuales/modulo-reportes-mensuales.component';
import { ModuloAvancesObraComponent } from './components/shared/modulo-avances-obra/modulo-avances-obra.component';
import { ModuloIngenieriaComponent } from './components/shared/modulo-ingenieria/modulo-ingenieria.component';
import { ModuloGraficasComponent } from './components/shared/modulo-graficas/modulo-graficas.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { DataTableModule } from 'angular-6-datatable';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    ContentComponent,
    ModuloImagenesComponent,
    ModuloReportesMensualesComponent,
    ModuloAvancesObraComponent,
    ModuloIngenieriaComponent,
    ModuloGraficasComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    DataTableModule,
    NgxSpinnerModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
