import { Routes } from "@angular/router";
import { UserLayout } from "./layout/user-layout/user-layout";
import { Home } from "./pages/home/home";
import { CrearPublicacionComponent } from "./components/crear-publicacion/crear-publicacion.component";
import { RegisterComponent } from "./components/auth/register/register";
import { LoginComponent } from "./components/auth/login/login";
import { VerDetallesPublicacionComponent } from "./components/ver-detalles-publicacion/ver-detalles-publicacion.component";
import { VerPerfilComponent } from "./components/ver-perfil/ver-perfil.component";
import { MyPostsPageComponent } from "./pages/my-posts-page/my-posts-page.component";
import { ForoComponent } from "./components/foro/foro.component";
import { VerForosComponent } from "./components/ver-foros/ver-foros.component";
import { CrearForoComponent } from "./components/crear-foro/crear-foro.component";
export const routes: Routes = [
  {
    path: "",
    component: UserLayout,
    children: [
      { path: "home", component: Home },
      { path: "usuario/perfil", component: VerPerfilComponent },
      { path: "usuario/mis-publicaciones", component: MyPostsPageComponent },
      { path: "foros", component: VerForosComponent },
      { path: "crear-foro", component: CrearForoComponent},
      { path: "foro/:id", component: ForoComponent },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ],
  },
  { path: "publicaciones/crear", component: CrearPublicacionComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "detalle/:id/:nombre/:contacto", component: VerDetallesPublicacionComponent},

];
