import { Component, inject, OnInit } from "@angular/core";
import { Foro } from "../../interfaces/foro.interface";
import { foroService } from "../../services/foro.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-ver-foros",
  imports: [CommonModule],
  templateUrl: "./ver-foros.component.html",
  styleUrl: "./ver-foros.component.css",
})
export class VerForosComponent implements OnInit {
  private foroService = inject(foroService);
  private router = inject(Router);

  listaForos: Foro[] = [];

  ngOnInit(): void {
    this.cargarForos();
  }

  cargarForos(): void {
    this.foroService.obtenerForos().subscribe({
      next: (respuesta) => {
        this.listaForos = respuesta.foros;
        console.log("Foros cargados:", this.listaForos);
      },
      error: (err) => {
        console.error("Error al cargar foros:", err);
      },
    });
  }

  verForo(idForo: number): void {
    this.router.navigate([`/foro/${idForo}`]);
  }

  crearForo(): void {
    this.router.navigate(["/crear-foro"]);
  }

  /**
   * Obtiene las iniciales del título del foro para mostrar como placeholder
   * cuando no hay icono disponible
   */
  getInitials(titulo: string): string {
    if (!titulo) return "?";

    const words = titulo.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  /**
   * Maneja errores cuando la imagen del icono no se puede cargar
   */
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = "none";

    // Opcionalmente, puedes mostrar el div con iniciales
    const parentDiv = imgElement.parentElement;
    if (parentDiv) {
      parentDiv.innerHTML = `
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white font-bold text-2xl">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
        </div>
      `;
    }
  }
}
