import { Routes } from '@angular/router';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './components/crear-publicacion/crear-publicacion.component';
import { VerDetallesPublicacionComponent } from './components/ver-detalles-publicacion/ver-detalles-publicacion.component';

export const routes: Routes = [
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: 'publicaciones/crear', component: CrearPublicacionComponent },
  { path: 'publicaciones/:id', component: VerDetallesPublicacionComponent },

  { path: '', redirectTo: '/publicaciones', pathMatch: 'full' },
];
