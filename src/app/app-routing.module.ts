import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { EstacionCompresionComponent } from './components/estacion-compresion/estacion-compresion.component';
import { EstacionMedicionComponent } from './components/estacion-medicion/estacion-medicion.component';
import { LineaMarinaComponent } from './components/linea-marina/linea-marina.component';
import { LineaTerrestreComponent } from './components/linea-terrestre/linea-terrestre.component';
import { ModuloAvancesObraComponent } from './components/shared/modulo-avances-obra/modulo-avances-obra.component';
import { ModuloGraficasComponent } from './components/shared/modulo-graficas/modulo-graficas.component';
import { ModuloImagenesComponent } from './components/shared/modulo-imagenes/modulo-imagenes.component';
import { ModuloIngenieriaComponent } from './components/shared/modulo-ingenieria/modulo-ingenieria.component';
import { ModuloReportesMensualesComponent } from './components/shared/modulo-reportes-mensuales/modulo-reportes-mensuales.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './models/aut-guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'estacion-compresion', component: EstacionCompresionComponent, canActivate: [AuthGuard] },
  { path: 'estacion-medicion', component: EstacionMedicionComponent, canActivate: [AuthGuard]},
  { path: 'linea-marina', component: LineaMarinaComponent, canActivate: [AuthGuard] },
  { path: 'linea-terrestre', component: LineaTerrestreComponent, canActivate: [AuthGuard]},
  { path: 'avances-obra/:view', component: ModuloAvancesObraComponent, canActivate: [AuthGuard]},
  { path: 'graficas/:view', component: ModuloGraficasComponent, canActivate: [AuthGuard]},
  { path: 'imagenes/:view', component: ModuloImagenesComponent, canActivate: [AuthGuard]},
  { path: 'ingenieria/:view', component: ModuloIngenieriaComponent, canActivate: [AuthGuard]},
  { path: 'reportes-mensuales/:view', component: ModuloReportesMensualesComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
