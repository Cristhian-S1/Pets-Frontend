import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
// Importa tu servicio de autenticación
import { AuthService } from "../../../services/auth.service";
// No necesitas importar 'response' de express si no estás en un entorno Node/Express en el frontend

@Component({
  selector: "app-register",
  // Asegúrate de que ReactiveFormsModule esté en imports si no usas Standalone Components
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
})
export class RegisterComponent {
  // Nota: Eliminé 'loginForm: FormGroup;' duplicado si solo usas 'registerForm'
  registerForm!: FormGroup; // Usamos '!' para asegurar que se inicializa en el constructor
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = "";
  isLoading = false;

  // Inyección de dependencias
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService); // El servicio de registro

  constructor() {
    this.registerForm = this.fb.group(
      {
        name: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", [Validators.required, Validators.pattern(/^[0-9]{9,}$/)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Función principal para el envío del formulario
  onSubmit(): void {
    // 1. Verificar si el formulario es válido (todas las validaciones pasaron)
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = "";

      // Extraer los valores que se enviarán al backend (excluyendo confirmPassword)
      const { name, email, phone, password } = this.registerForm.value;
      console.log(name);
      console.log(email);
      console.log(phone);
      console.log(password);
      // 2. Llamar al servicio y manejar la suscripción
      this.authService
        .registrarUsuario(name, email, phone, password)
        .subscribe({
          next: (response) => {
            //Éxito:
            console.log("Registro exitoso", response);
            // Redirigir al usuario al login
            this.router.navigate(["/login"]);
          },
          error: (error) => {
            //Manejo de errores de la API
            console.error("Error de Registro", error);
            // Mostrar mensaje de error del backend (si existe) o un mensaje genérico
            this.errorMessage =
              error.error?.message ||
              "Error al registrarse. Por favor intenta de nuevo.";
            this.isLoading = false; // Detener el spinner
          },
          complete: () => {
            // Se ejecuta siempre después de 'next' o 'error'
            this.isLoading = false;
          },
        });
    } else {
      // 3. Marcar todos los campos como 'tocados' para mostrar los mensajes de error
      this.formGroupVal(this.registerForm);
      this.errorMessage =
        "Por favor, completa y corrige todos los campos requeridos.";
    }
  }

  // Validador personalizado para la coincidencia de contraseñas
  passwordMatchValidator(form: FormGroup) {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    // Asegurar que solo se setee el error si ambos campos existen y tienen valores diferentes
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value &&
      confirmPassword.value !== ""
    ) {
      // Setear el error en el campo 'confirmPassword'
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }; // Error a nivel de formulario
    }

    // Si coinciden o uno está vacío, eliminar el error
    if (confirmPassword && confirmPassword.hasError("passwordMismatch")) {
      confirmPassword.setErrors(null);
    }
    return null; // No hay error de coincidencia
  }

  // Función de utilidad para marcar todos los campos como tocados
  private formGroupVal(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Funciones para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Navegación
  navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }

  // Getters para fácil acceso a los controles en el template
  get name() {
    return this.registerForm.get("name") as FormControl;
  }

  get email() {
    return this.registerForm.get("email") as FormControl;
  }

  get phone() {
    return this.registerForm.get("phone") as FormControl;
  }

  get password() {
    return this.registerForm.get("password") as FormControl;
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword") as FormControl;
  }
}
