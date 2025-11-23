import { Routes } from '@angular/router';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './components/crear-publicacion/crear-publicacion.component';

export const routes: Routes = [
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: 'publicaciones/crear', component: CrearPublicacionComponent },
  { path: '', redirectTo: '/publicaciones', pathMatch: 'full' },
];
