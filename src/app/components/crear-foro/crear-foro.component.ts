import { Component, inject } from "@angular/core";
import { foroService } from "../../services/foro.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CrearForo } from "../../interfaces/foro.interface";

@Component({
  selector: "app-crear-foro",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./crear-foro.component.html",
  styleUrl: "./crear-foro.component.css",
})
export class CrearForoComponent {
  private fb = inject(FormBuilder);
  private foroService = inject(foroService);
  private router = inject(Router);

  public foroForm!: FormGroup;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.foroForm = this.fb.group({
      titulo: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(126),
        ],
      ],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(254),
        ],
      ],
      icono: [
        "",
        [Validators.maxLength(512), Validators.pattern(/^https?:\/\/.+/)],
      ],
      visible: [true, [Validators.required]],
    });
  }

  get titulo() {
    return this.foroForm.get("titulo");
  }

  get descripcion() {
    return this.foroForm.get("descripcion");
  }

  get icono() {
    return this.foroForm.get("icono");
  }

  get visible() {
    return this.foroForm.get("visible");
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = "none";
    this.errorMessage =
      "No se pudo cargar la imagen del icono. Verifica la URL.";
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.foroForm.invalid) {
      this.foroForm.markAllAsTouched();
      this.errorMessage =
        "Por favor, completa correctamente todos los campos requeridos.";
      return;
    }

    const nuevoForo: CrearForo = {
      fo_titulo: this.foroForm.value.titulo,
      fo_descripcion: this.foroForm.value.descripcion,
      fo_visible: this.foroForm.value.visible,
      fo_icono: this.foroForm.value.icono || null,
    };

    this.foroService.crearForo(nuevoForo).subscribe({
      next: (response) => {
        this.successMessage = "¡Foro creado exitosamente!";
        console.log("Foro creado:", response);

        setTimeout(() => {
          this.router.navigate(["/foros"]);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage =
          "Hubo un error al crear el foro. Inténtalo de nuevo.";
        console.error("Error del servidor:", err);
      },
    });
  }

  volver(): void {
    this.router.navigate(["/foros"]);
  }
}
