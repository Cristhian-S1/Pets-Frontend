import { Routes } from "@angular/router";
import { UserLayout } from "./layout/user-layout/user-layout";
import { Home } from "./pages/home/home";
import { CrearPublicacionComponent } from "./components/crear-publicacion/crear-publicacion.component";
import { RegisterComponent } from "./components/auth/register/register";
import { LoginComponent } from "./components/auth/login/login";
import { VerDetallesPublicacionComponent } from "./components/ver-detalles-publicacion/ver-detalles-publicacion.component";
import { VerPerfilComponent } from "./components/ver-perfil/ver-perfil.component";
export const routes: Routes = [
  {
    path: "",
    component: UserLayout,
    children: [
      { path: "home", component: Home },
      { path: "", redirectTo: "home", pathMatch: "full" },
    ],
  },
  { path: "publicaciones/crear", component: CrearPublicacionComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "usuario/perfil", component: VerPerfilComponent },
  {
    path: "detalle/:id/:nombre/:contacto",component: VerDetallesPublicacionComponent,
  },
];
