import { Component, Input } from "@angular/core";
import { Publicacion } from "../../interfaces/publicacion.interface";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PostsService } from "../../services/posts.service";

@Component({
  selector: "app-post",
  imports: [CommonModule],
  templateUrl: "./post.html",
  styleUrl: "./post.css",
})
export class Post {
  constructor(private router: Router, private postService: PostsService) {}

  @Input() post: Publicacion | undefined;

  verDetalle(id: number, nombre: string, contacto: string) {
    this.router.navigate(["/detalle", id, nombre, contacto]);
  }

  contactarWhatsApp(pub: Publicacion) {
    if (!pub.us_contacto) {
      alert("El usuario no ha proporcionado un teléfono");
      return;
    }

    const phone = pub.us_contacto.replace(/[^0-9]/g, "");
    const message = `Hola ${pub.us_nombre_completo}, vi tu publicación sobre "${pub.pu_titulo}" y tengo información.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  onLikeClick(pub: Publicacion) {
    if (!pub) return;

    if (pub.procesando) return;
    pub.procesando = true;
    // 1. Inicialización defensiva
    if (pub.dio_like === undefined) pub.dio_like = false;
    if (pub.total_likes === undefined || pub.total_likes === null)
      pub.total_likes = 0;

    const estadoAnterior = pub.dio_like;
    const conteoAnterior = pub.total_likes;

    // 3. UI Optimista (Actualizamos visualmente antes de que responda el servidor)

    pub.dio_like = !pub.dio_like;
    pub.total_likes += pub.dio_like ? 1 : -1;

    // 4. Llamada al Servicio
    this.postService.darLike(pub.pu_id).subscribe({
      next: (response: any) => {
        // El servidor nos devuelve el estado REAL y confirmadísimo
        // response.datos = { liked: boolean, total_likes: number }
        console.log("Like procesado:", response);

        if (response.datos) {
          pub.dio_like = response.datos.liked;
          pub.total_likes = response.datos.total_likes;
        }
        pub.procesando = false;
      },
      error: (error: any) => {
        console.error("Error en like:", error);

        // ROLLBACK: Si falla (ej: token vencido), volvemos al estado anterior
        pub.dio_like = estadoAnterior;
        pub.total_likes = conteoAnterior;
        pub.procesando = false;
        // Opcional: Mostrar alerta si es 401/403
        if (error.status === 401 || error.status === 403) {
          alert("Debes iniciar sesión para dar like");
        }
      },
    });
  }
}
