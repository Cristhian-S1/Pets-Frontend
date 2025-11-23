import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../models/publicacion.interface';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-publicaciones',
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css',
})
export class PublicacionesComponent implements OnInit {
  private publicacionService = inject(PublicacionService);
  private router = inject(Router);

  publicaciones: Publicacion[] = [];
  activeSection: string = 'publicaciones';
  searchTerm: string = '';
  filterEstado: string = 'todos';

  ngOnInit(): void {
    this.obtenerPublicaciones();
  }

  obtenerPublicaciones(): void {
    this.publicacionService.obtenerPublicaciones().subscribe({
      next: (response) => {
        if (response.cod === 200) {
          this.publicaciones = response.datos;
        } else {
          console.warn('Respuesta inesperada: ', response);
        }
      },
      error: (error) => {
        console.error('Error al cargar publicaciones: ', error);
      },
    });
  }

  //Borrar
  navegacionCrear() {
    this.router.navigate(['/publicaciones/crear']);
  }
  setActiveSection(section: string): void {
    this.activeSection = section;
    // Aquí puedes agregar lógica de navegación o cambiar vistas
    console.log('Sección activa:', section);
  }
  //Borrar fin

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  onFilterChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filterEstado = select.value;
  }

  buscarPublicaciones(): void {
    console.log('Buscando:', this.searchTerm, 'Filtro:', this.filterEstado);
    // Aquí puedes implementar la lógica de búsqueda y filtrado
  }

  contactar(publicacion: Publicacion): void {
    // Abre WhatsApp con el número de contacto
    const mensaje = encodeURIComponent(
      `Hola, vi tu publicación sobre: ${publicacion.pu_titulo}`
    );
    window.open(
      `https://wa.me/${publicacion.us_contacto}?text=${mensaje}`,
      '_blank'
    );
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
