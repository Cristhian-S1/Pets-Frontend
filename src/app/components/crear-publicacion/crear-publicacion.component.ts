import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionService } from '../../services/publicacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-publicacion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-publicacion.component.html',
  styleUrl: './crear-publicacion.component.css',
})
export class CrearPublicacionComponent {
  private fb = inject(FormBuilder);
  private publicacionService = inject(PublicacionService);
  private router = inject(Router);

  publicacionForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.publicacionForm = this.fb.group({
      pu_titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      pu_descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      pu_ubicacion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      pu_imagen: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i
          ),
        ],
      ],
    });
  }

  navegacionPublicacion() {
    this.router.navigate(['/publicaciones']);
  }

  // Getters para facilitar el acceso a los controles en el template
  get titulo() {
    return this.publicacionForm.get('pu_titulo');
  }

  get descripcion() {
    return this.publicacionForm.get('pu_descripcion');
  }

  get ubicacion() {
    return this.publicacionForm.get('pu_ubicacion');
  }

  get imagen() {
    return this.publicacionForm.get('pu_imagen');
  }

  onSubmit(): void {
    // Resetear mensajes
    this.errorMessage = '';
    this.successMessage = '';

    // Validar formulario
    if (this.publicacionForm.invalid) {
      Object.keys(this.publicacionForm.controls).forEach((key) => {
        this.publicacionForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    const publicacionData = {
      pu_titulo: this.publicacionForm.value.pu_titulo,
      pu_descripcion: this.publicacionForm.value.pu_descripcion,
      pu_ubicacion: this.publicacionForm.value.pu_ubicacion,
      pu_imagen: this.publicacionForm.value.pu_imagen,
    };

    this.publicacionService.crearPublicacion(publicacionData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.isSubmitting = false;

        if (response.cod === 200 || response.cod === 201) {
          this.successMessage = '¡Publicación creada exitosamente!';

          // Redirigir después de 1.5 segundos
          setTimeout(() => {
            this.router.navigate(['/publicaciones']);
          }, 1500);
        } else {
          this.errorMessage = response.msj || 'Error al crear la publicación';
        }
      },
      error: (error) => {
        console.error('Error al crear publicación:', error);
        this.isSubmitting = false;

        if (error.status === 401) {
          this.errorMessage = 'No autorizado. Por favor verifica tu token.';
        } else if (error.status === 400) {
          this.errorMessage = 'Datos inválidos. Por favor revisa los campos.';
        } else {
          this.errorMessage =
            'Error al crear la publicación. Intenta nuevamente.';
        }
      },
    });
  }

  resetForm(): void {
    this.publicacionForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Método para previsualizar la imagen
  previewImage(): string {
    const url = this.publicacionForm.get('pu_imagen')?.value;
    if (url && this.imagen?.valid) {
      return url;
    }
    return 'https://via.placeholder.com/400x300?text=Vista+Previa';
  }
}
