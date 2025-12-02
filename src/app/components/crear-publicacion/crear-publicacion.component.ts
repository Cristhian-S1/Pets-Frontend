import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CrearPublicacionService } from "../../services/crear-publicacion.service";
import { CommonModule } from "@angular/common";
import { EtiquetaCrear } from "../../interfaces/publicacion.interface";

@Component({
  selector: "app-crear-publicacion",
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./crear-publicacion.component.html",
  styleUrl: "./crear-publicacion.component.css",
})
export class CrearPublicacionComponent {
  private fb = inject(FormBuilder);
  private publicacionService = inject(CrearPublicacionService);
  private router = inject(Router);

  publicacionForm: FormGroup;
  isSubmitting = false;
  errorMessage = "";
  successMessage = "";
  imagenesAdicionales: string[] = [];
  nuevaImagenUrl: string = "";

  // ← Añade estas propiedades para etiquetas
  etiquetas: EtiquetaCrear[] = [];
  etiquetasSeleccionadas: number[] = [];
  cargandoEtiquetas = false;
  errorEtiquetas = "";

  constructor() {
    this.publicacionForm = this.fb.group({
      pu_titulo: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      pu_descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      pu_ubicacion: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      pu_imagen: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.cargarEtiquetas();
  }

  cargarEtiquetas(): void {
    this.cargandoEtiquetas = true;
    this.errorEtiquetas = "";

    this.publicacionService.obtenerEtiquetas().subscribe({
      next: (etiquetas) => {
        this.etiquetas = etiquetas;
        this.cargandoEtiquetas = false;
      },
      error: (error) => {
        console.error("Error al cargar etiquetas:", error);
        this.errorEtiquetas = "No se pudieron cargar las etiquetas";
        this.cargandoEtiquetas = false;
      },
    });
  }

  // MAnejo de etiquetas
  toggleEtiqueta(etiquetaId: number): void {
    const index = this.etiquetasSeleccionadas.indexOf(etiquetaId);

    if (index > -1) {
      // Si ya está seleccionada, la removemos
      this.etiquetasSeleccionadas.splice(index, 1);
    } else {
      // Si no está seleccionada, la agregamos
      this.etiquetasSeleccionadas.push(etiquetaId);
    }
  }

  isEtiquetaSeleccionada(etiquetaId: number): boolean {
    return this.etiquetasSeleccionadas.includes(etiquetaId);
  }

  navegacionPublicacion() {
    this.router.navigate(["/home"]);
  }

  // Gets para facilitar el acceso a los controles en el template
  get titulo() {
    return this.publicacionForm.get("pu_titulo");
  }

  get descripcion() {
    return this.publicacionForm.get("pu_descripcion");
  }

  get ubicacion() {
    return this.publicacionForm.get("pu_ubicacion");
  }

  get imagen() {
    return this.publicacionForm.get("pu_imagen");
  }

  // Métodos para manejar imágenes adicionales
  agregarImagenAdicional(): void {
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;

    if (this.nuevaImagenUrl && urlPattern.test(this.nuevaImagenUrl)) {
      if (this.imagenesAdicionales.length >= 5) {
        alert("Solo puedes agregar hasta 5 imágenes adicionales");
        return;
      }
      this.imagenesAdicionales.push(this.nuevaImagenUrl);
      this.nuevaImagenUrl = "";
    } else {
      alert("Por favor ingresa una URL válida de imagen");
    }
  }

  eliminarImagenAdicional(index: number): void {
    this.imagenesAdicionales.splice(index, 1);
  }

  onNuevaImagenChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nuevaImagenUrl = input.value;
  }

  onSubmit(): void {
    // Resetear mensajes
    this.errorMessage = "";
    this.successMessage = "";

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
      pu_imagenes:
        this.imagenesAdicionales.length > 0
          ? this.imagenesAdicionales
          : undefined,
      pu_etiquetas:
        this.etiquetasSeleccionadas.length > 0
          ? this.etiquetasSeleccionadas
          : undefined,
    };

    console.log("Datos a enviar:", publicacionData);

    this.publicacionService.crearPublicacion(publicacionData).subscribe({
      next: (response) => {
        console.log("Respuesta del servidor:", response);
        this.isSubmitting = false;

        if (response.cod === 200 || response.cod === 201) {
          this.successMessage = "¡Publicación creada exitosamente!";

          // Redirigir después de 1.5 segundos
          setTimeout(() => {
            this.router.navigate(["/home"]);
          }, 1500);
        } else {
          this.errorMessage = response.msj || "Error al crear la publicación";
        }
      },
      error: (error) => {
        console.error("Error al crear publicación:", error);
        this.isSubmitting = false;

        if (error.status === 401) {
          this.errorMessage = "No autorizado. Por favor verifica tu token.";
        } else if (error.status === 400) {
          this.errorMessage = "Datos inválidos. Por favor revisa los campos.";
        } else {
          this.errorMessage =
            "Error al crear la publicación. Intenta nuevamente.";
        }
      },
    });
  }

  resetForm(): void {
    this.publicacionForm.reset();
    this.imagenesAdicionales = [];
    this.nuevaImagenUrl = "";
    this.etiquetasSeleccionadas = [];
    this.errorMessage = "";
    this.successMessage = "";
  }

  // Método para previsualizar la imagen
  previewImage(): string {
    const url = this.publicacionForm.get("pu_imagen")?.value;
    if (url && this.imagen?.valid) {
      return url;
    }
    return "https://via.placeholder.com/400x300?text=Vista+Previa";
  }

  getNombreEtiqueta(etId: number): string {
    return this.etiquetas.find((e) => e.et_id === etId)?.et_nombre ?? "";
  }
}
