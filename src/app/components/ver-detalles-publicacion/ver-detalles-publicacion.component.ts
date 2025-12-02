import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Publicacion } from "../../interfaces/publicacion.interface";
import { PostsService } from "../../services/posts.service";

@Component({
  selector: "app-ver-detalles-publicacion",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ver-detalles-publicacion.component.html",
  styleUrls: ["./ver-detalles-publicacion.component.css"],
})
export class VerDetallesPublicacionComponent implements OnInit {
  detalles: any = null;
  contacto: string = "";
  nombre: string = "";

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PostsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.nombre = String(this.route.snapshot.paramMap.get("nombre"));
    this.contacto = String(this.route.snapshot.paramMap.get("contacto"));

    console.log("ID recibido:", id);

    this.publicacionesService.obtenerDetalles(id).subscribe({
      next: (res: any) => {
        console.log("Detalles:", res);
        this.detalles = res.datos;
      },
      error: (err) => {
        console.error("Error obteniendo detalles:", err);
      },
    });
  }
  currentIndex = 0;

  next() {
    if (this.currentIndex < this.detalles.imagenes.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.detalles.imagenes.length - 1;
    }
  }

  goTo(i: number) {
    this.currentIndex = i;
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return "";

    const d = new Date(fecha);
    return d.toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  contactar(publicacion: Publicacion): void {
    // Abre WhatsApp con el número de contacto
    const mensaje = encodeURIComponent(
      `Hola, vi tu publicación sobre: ${publicacion.pu_titulo}`
    );
    window.open(
      `https://wa.me/${publicacion.us_contacto}?text=${mensaje}`,
      "_blank"
    );
  }
}
