import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  activeSection: string = 'publicaciones';

  setActiveSection(section: string): void {
    this.activeSection = section;
    // Aquí puedes agregar lógica de navegación o cambiar vistas
    console.log('Sección activa:', section);
  }

  navegacionCrear() {
    this.router.navigate(['/publicaciones/crear']);
  }
}
