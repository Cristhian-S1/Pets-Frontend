import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

/* Angular Material */
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { PostsService } from "../../services/posts.service";
import { Publicacion } from "../../interfaces/publicacion.interface";
import { Header } from "../header/header";
@Component({
  selector: "app-ver-detalles-publicacion",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    Header
  ],
  templateUrl: "./ver-detalles-publicacion.component.html",
  styleUrls: ["./ver-detalles-publicacion.component.css"],
})
export class VerDetallesPublicacionComponent implements OnInit {
  detalles: any = null;
  contacto = "";
  nombre = "";
  nuevoComentario = "";
  currentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PostsService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.nombre = String(this.route.snapshot.paramMap.get("nombre"));
    this.contacto = String(this.route.snapshot.paramMap.get("contacto"));

    this.publicacionesService.obtenerDetalles(id).subscribe({
      next: (res: any) => {
        this.detalles = res.datos;
      },
      error: (err) => {
        console.error("Error obteniendo detalles:", err);
      },
    });
  }


  volverAtras(): void {
    window.history.back();
  }

  next(): void {
    this.currentIndex =
      this.currentIndex < this.detalles.imagenes.length - 1
        ? this.currentIndex + 1
        : 0;
  }

  prev(): void {
    this.currentIndex =
      this.currentIndex > 0
        ? this.currentIndex - 1
        : this.detalles.imagenes.length - 1;
  }

  goTo(i: number): void {
    this.currentIndex = i;
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return "";
    return new Date(fecha).toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  contactar(publicacion: Publicacion): void {
    const mensaje = encodeURIComponent(
      `Hola, vi tu publicación sobre: ${publicacion.pu_titulo}`
    );
    window.open(
      `https://wa.me/${publicacion.us_contacto}?text=${mensaje}`,
      "_blank"
    );
  }

  enviarComentario(): void {
    if (!this.nuevoComentario.trim()) return;

    this.publicacionesService
      .crearComentario(this.detalles.pu_id, this.nuevoComentario)
      .subscribe({
        next: () => {
          this.nuevoComentario = "";

          // ✅ recargar TODO desde backend (orden correcto)
          this.cargarDetalles();
        },
        error: (err) => {
          console.error("Error creando comentario:", err);
        },
      });
  }




  cargarDetalles(): void {
    this.publicacionesService
      .obtenerDetalles(this.detalles.pu_id)
      .subscribe({
        next: (res: any) => {
          this.detalles = res.datos;
        },
        error: (err) => {
          console.error("Error recargando detalles:", err);
        },
      });
  }


}
