import { Routes } from '@angular/router';
import { UserLayout } from './layout/user-layout/user-layout';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      { path: 'home', component: Home },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
];
