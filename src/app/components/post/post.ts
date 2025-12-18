import { Component, Input } from "@angular/core";
import { Publicacion } from "../../interfaces/publicacion.interface";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-post",
  imports: [CommonModule],
  templateUrl: "./post.html",
  styleUrl: "./post.css",
})
export class Post {
  constructor(private router: Router) { }

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
}