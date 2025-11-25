import { Routes } from '@angular/router';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './components/crear-publicacion/crear-publicacion.component';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';


export const routes: Routes = [
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: 'publicaciones/crear', component: CrearPublicacionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
